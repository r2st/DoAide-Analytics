import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ReportCreate(BaseModel):
    name: str
    format: str
    business_id: uuid.UUID
    dashboard_id: uuid.UUID | None = None


class ReportResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    business_id: uuid.UUID
    dashboard_id: uuid.UUID | None = None
    name: str
    format: str
    file_url: str | None = None
    created_at: datetime


class ScheduledReportCreate(BaseModel):
    report_id: uuid.UUID
    cron_expression: str
    recipients: list[str]


class ScheduledReportUpdate(BaseModel):
    cron_expression: str | None = None
    recipients: list[str] | None = None
    is_active: bool | None = None


class ScheduledReportResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    report_id: uuid.UUID
    cron_expression: str
    recipients: list[str]
    is_active: bool
    last_sent_at: datetime | None = None
    next_send_at: datetime | None = None
    created_at: datetime
