import uuid

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.data_source import DataSource
from app.models.dataset import Dataset
from app.models.user import User
from app.schemas.data_source import DataSourceCreate, DataSourceResponse, DataSourceUpdate
from app.schemas.dataset import DatasetResponse
from app.services.data_service import parse_csv
from app.utils.auth import get_current_user

router = APIRouter(prefix="/data-sources", tags=["data_sources"])


@router.post("/", response_model=DataSourceResponse, status_code=201)
async def create_data_source(
    data: DataSourceCreate,
    business_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    source = DataSource(**data.model_dump(), business_id=business_id)
    db.add(source)
    await db.commit()
    await db.refresh(source)
    return source


@router.get("/", response_model=list[DataSourceResponse])
async def list_data_sources(
    business_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(DataSource).where(DataSource.business_id == business_id))
    return result.scalars().all()


@router.get("/{source_id}", response_model=DataSourceResponse)
async def get_data_source(
    source_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(DataSource).where(DataSource.id == source_id))
    source = result.scalar_one_or_none()
    if not source:
        raise HTTPException(status_code=404, detail="Data source not found")
    return source


@router.patch("/{source_id}", response_model=DataSourceResponse)
async def update_data_source(
    source_id: uuid.UUID,
    data: DataSourceUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(DataSource).where(DataSource.id == source_id))
    source = result.scalar_one_or_none()
    if not source:
        raise HTTPException(status_code=404, detail="Data source not found")

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(source, key, value)

    await db.commit()
    await db.refresh(source)
    return source


@router.delete("/{source_id}", status_code=204)
async def delete_data_source(
    source_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(DataSource).where(DataSource.id == source_id))
    source = result.scalar_one_or_none()
    if not source:
        raise HTTPException(status_code=404, detail="Data source not found")
    await db.delete(source)
    await db.commit()


@router.post("/{source_id}/upload", response_model=DatasetResponse, status_code=201)
async def upload_csv(
    source_id: uuid.UUID,
    file: UploadFile,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(DataSource).where(DataSource.id == source_id))
    source = result.scalar_one_or_none()
    if not source:
        raise HTTPException(status_code=404, detail="Data source not found")

    content = await file.read()
    parsed = parse_csv(content)

    dataset = Dataset(
        data_source_id=source_id,
        name=file.filename or "Uploaded CSV",
        columns=parsed["columns"],
        row_count=parsed["row_count"],
        data=parsed["data"],
    )
    db.add(dataset)
    await db.commit()
    await db.refresh(dataset)
    return dataset
