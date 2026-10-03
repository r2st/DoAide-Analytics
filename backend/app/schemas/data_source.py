import uuid
from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict


class DataSourceCreate(BaseModel):
    name: str
    source_type: str
    config: dict[str, Any] | None = None


class DataSourceUpdate(BaseModel):
    name: str | None = None
    config: dict[str, Any] | None = None
    status: str | None = None


class DataSourceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    business_id: uuid.UUID
    name: str
    source_type: str
    config: dict[str, Any] | None = None
    status: str
    created_at: datetime
