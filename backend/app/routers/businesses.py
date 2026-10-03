import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.business import Business
from app.models.user import User
from app.schemas.business import BusinessCreate, BusinessResponse, BusinessUpdate
from app.utils.auth import get_current_user

router = APIRouter(prefix="/businesses", tags=["businesses"])


@router.post("/", response_model=BusinessResponse, status_code=201)
async def create_business(
    data: BusinessCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    business = Business(**data.model_dump(), owner_id=current_user.id)
    db.add(business)
    await db.commit()
    await db.refresh(business)
    return business


@router.get("/", response_model=list[BusinessResponse])
async def list_businesses(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Business).where(Business.owner_id == current_user.id))
    return result.scalars().all()


@router.get("/{business_id}", response_model=BusinessResponse)
async def get_business(
    business_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Business).where(Business.id == business_id, Business.owner_id == current_user.id)
    )
    business = result.scalar_one_or_none()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
    return business


@router.patch("/{business_id}", response_model=BusinessResponse)
async def update_business(
    business_id: uuid.UUID,
    data: BusinessUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Business).where(Business.id == business_id, Business.owner_id == current_user.id)
    )
    business = result.scalar_one_or_none()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(business, key, value)

    await db.commit()
    await db.refresh(business)
    return business


@router.delete("/{business_id}", status_code=204)
async def delete_business(
    business_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Business).where(Business.id == business_id, Business.owner_id == current_user.id)
    )
    business = result.scalar_one_or_none()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    await db.delete(business)
    await db.commit()
