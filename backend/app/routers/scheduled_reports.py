import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.report import ScheduledReport
from app.models.user import User
from app.schemas.report import ScheduledReportCreate, ScheduledReportResponse, ScheduledReportUpdate
from app.utils.auth import get_current_user

router = APIRouter(prefix="/scheduled-reports", tags=["scheduled_reports"])


@router.post("/", response_model=ScheduledReportResponse, status_code=201)
async def create_scheduled_report(
    data: ScheduledReportCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    scheduled = ScheduledReport(**data.model_dump())
    db.add(scheduled)
    await db.commit()
    await db.refresh(scheduled)
    return scheduled


@router.get("/", response_model=list[ScheduledReportResponse])
async def list_scheduled_reports(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(ScheduledReport))
    return result.scalars().all()


@router.get("/{scheduled_id}", response_model=ScheduledReportResponse)
async def get_scheduled_report(
    scheduled_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(ScheduledReport).where(ScheduledReport.id == scheduled_id))
    scheduled = result.scalar_one_or_none()
    if not scheduled:
        raise HTTPException(status_code=404, detail="Scheduled report not found")
    return scheduled


@router.patch("/{scheduled_id}", response_model=ScheduledReportResponse)
async def update_scheduled_report(
    scheduled_id: uuid.UUID,
    data: ScheduledReportUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(ScheduledReport).where(ScheduledReport.id == scheduled_id))
    scheduled = result.scalar_one_or_none()
    if not scheduled:
        raise HTTPException(status_code=404, detail="Scheduled report not found")

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(scheduled, key, value)

    await db.commit()
    await db.refresh(scheduled)
    return scheduled


@router.delete("/{scheduled_id}", status_code=204)
async def delete_scheduled_report(
    scheduled_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(ScheduledReport).where(ScheduledReport.id == scheduled_id))
    scheduled = result.scalar_one_or_none()
    if not scheduled:
        raise HTTPException(status_code=404, detail="Scheduled report not found")
    await db.delete(scheduled)
    await db.commit()
