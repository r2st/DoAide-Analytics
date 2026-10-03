import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.dashboard import Dashboard, Widget
from app.models.user import User
from app.schemas.dashboard import (
    DashboardCreate,
    DashboardResponse,
    DashboardUpdate,
    WidgetCreate,
    WidgetResponse,
    WidgetUpdate,
)
from app.utils.auth import get_current_user

router = APIRouter(prefix="/dashboards", tags=["dashboards"])


@router.post("/", response_model=DashboardResponse, status_code=201)
async def create_dashboard(
    data: DashboardCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    dashboard = Dashboard(**data.model_dump())
    db.add(dashboard)
    await db.commit()
    await db.refresh(dashboard)
    return dashboard


@router.get("/", response_model=list[DashboardResponse])
async def list_dashboards(
    business_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Dashboard).where(Dashboard.business_id == business_id))
    return result.scalars().all()


@router.get("/{dashboard_id}", response_model=DashboardResponse)
async def get_dashboard(
    dashboard_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Dashboard).where(Dashboard.id == dashboard_id))
    dashboard = result.scalar_one_or_none()
    if not dashboard:
        raise HTTPException(status_code=404, detail="Dashboard not found")
    return dashboard


@router.patch("/{dashboard_id}", response_model=DashboardResponse)
async def update_dashboard(
    dashboard_id: uuid.UUID,
    data: DashboardUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Dashboard).where(Dashboard.id == dashboard_id))
    dashboard = result.scalar_one_or_none()
    if not dashboard:
        raise HTTPException(status_code=404, detail="Dashboard not found")

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(dashboard, key, value)

    await db.commit()
    await db.refresh(dashboard)
    return dashboard


@router.delete("/{dashboard_id}", status_code=204)
async def delete_dashboard(
    dashboard_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Dashboard).where(Dashboard.id == dashboard_id))
    dashboard = result.scalar_one_or_none()
    if not dashboard:
        raise HTTPException(status_code=404, detail="Dashboard not found")
    await db.delete(dashboard)
    await db.commit()


# Widget endpoints

@router.post("/{dashboard_id}/widgets", response_model=WidgetResponse, status_code=201)
async def create_widget(
    dashboard_id: uuid.UUID,
    data: WidgetCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    widget = Widget(**data.model_dump(), dashboard_id=dashboard_id)
    db.add(widget)
    await db.commit()
    await db.refresh(widget)
    return widget


@router.get("/{dashboard_id}/widgets", response_model=list[WidgetResponse])
async def list_widgets(
    dashboard_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Widget).where(Widget.dashboard_id == dashboard_id))
    return result.scalars().all()


@router.patch("/{dashboard_id}/widgets/{widget_id}", response_model=WidgetResponse)
async def update_widget(
    dashboard_id: uuid.UUID,
    widget_id: uuid.UUID,
    data: WidgetUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Widget).where(Widget.id == widget_id, Widget.dashboard_id == dashboard_id)
    )
    widget = result.scalar_one_or_none()
    if not widget:
        raise HTTPException(status_code=404, detail="Widget not found")

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(widget, key, value)

    await db.commit()
    await db.refresh(widget)
    return widget


@router.delete("/{dashboard_id}/widgets/{widget_id}", status_code=204)
async def delete_widget(
    dashboard_id: uuid.UUID,
    widget_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Widget).where(Widget.id == widget_id, Widget.dashboard_id == dashboard_id)
    )
    widget = result.scalar_one_or_none()
    if not widget:
        raise HTTPException(status_code=404, detail="Widget not found")
    await db.delete(widget)
    await db.commit()
