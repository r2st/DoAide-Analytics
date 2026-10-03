import uuid

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.dashboard import Dashboard, Widget
from app.models.report import Report
from app.models.user import User
from app.schemas.report import ReportCreate, ReportResponse
from app.services.report_service import generate_excel_report, generate_pdf_report
from app.utils.auth import get_current_user

router = APIRouter(prefix="/reports", tags=["reports"])


@router.post("/", response_model=ReportResponse, status_code=201)
async def create_report(
    data: ReportCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    report = Report(**data.model_dump())
    db.add(report)
    await db.commit()
    await db.refresh(report)
    return report


@router.get("/", response_model=list[ReportResponse])
async def list_reports(
    business_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Report).where(Report.business_id == business_id))
    return result.scalars().all()


@router.get("/{report_id}", response_model=ReportResponse)
async def get_report(
    report_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Report).where(Report.id == report_id))
    report = result.scalar_one_or_none()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


@router.post("/{report_id}/generate")
async def generate_report(
    report_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Report).where(Report.id == report_id))
    report = result.scalar_one_or_none()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    widgets_data = []
    if report.dashboard_id:
        widget_result = await db.execute(
            select(Widget).where(Widget.dashboard_id == report.dashboard_id)
        )
        widgets = widget_result.scalars().all()
        widgets_data = [
            {"title": w.title, "type": w.widget_type, "config": w.config, "data": []}
            for w in widgets
        ]

    if report.format == "pdf":
        content = generate_pdf_report(report.name, widgets_data)
        media_type = "application/pdf"
        ext = "pdf"
    else:
        content = generate_excel_report(report.name, widgets_data)
        media_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ext = "xlsx"

    return Response(
        content=content,
        media_type=media_type,
        headers={"Content-Disposition": f'attachment; filename="{report.name}.{ext}"'},
    )


@router.delete("/{report_id}", status_code=204)
async def delete_report(
    report_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Report).where(Report.id == report_id))
    report = result.scalar_one_or_none()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    await db.delete(report)
    await db.commit()
