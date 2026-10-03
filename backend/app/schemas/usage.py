import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class UsageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    user_id: uuid.UUID
    action: str
    resource_type: str
    resource_id: uuid.UUID | None = None
    created_at: datetime
