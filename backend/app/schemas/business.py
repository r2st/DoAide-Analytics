import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class BusinessCreate(BaseModel):
    name: str
    industry: str | None = None


class BusinessUpdate(BaseModel):
    name: str | None = None
    industry: str | None = None


class BusinessResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    industry: str | None = None
    owner_id: uuid.UUID
    created_at: datetime
    updated_at: datetime
