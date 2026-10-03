import uuid
from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict


class DashboardCreate(BaseModel):
    name: str
    description: str | None = None
    business_id: uuid.UUID


class DashboardUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    layout: dict[str, Any] | None = None
    is_shared: bool | None = None


class DashboardResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    business_id: uuid.UUID
    name: str
    description: str | None = None
    layout: dict[str, Any] | None = None
    is_shared: bool
    created_at: datetime
    updated_at: datetime


class WidgetCreate(BaseModel):
    dashboard_id: uuid.UUID
    widget_type: str
    title: str
    config: dict[str, Any] | None = None
    position: dict[str, Any] | None = None
    dataset_id: uuid.UUID | None = None


class WidgetUpdate(BaseModel):
    title: str | None = None
    config: dict[str, Any] | None = None
    position: dict[str, Any] | None = None
    widget_type: str | None = None


class WidgetResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    dashboard_id: uuid.UUID
    widget_type: str
    title: str
    config: dict[str, Any] | None = None
    position: dict[str, Any] | None = None
    dataset_id: uuid.UUID | None = None
    created_at: datetime
