import uuid
from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict


class AIInsightResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    business_id: uuid.UUID
    dataset_id: uuid.UUID | None = None
    insight_type: str
    content: str
    metadata_: dict[str, Any] | None = None
    created_at: datetime


class NLQueryRequest(BaseModel):
    query: str
    dataset_id: uuid.UUID
    business_id: uuid.UUID
