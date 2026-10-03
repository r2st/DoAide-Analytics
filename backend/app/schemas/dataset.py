import uuid
from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict


class DatasetCreate(BaseModel):
    name: str
    data_source_id: uuid.UUID
    columns: list[str]
    data: list[dict[str, Any]]


class DatasetResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    data_source_id: uuid.UUID
    name: str
    columns: list[str]
    row_count: int
    created_at: datetime
