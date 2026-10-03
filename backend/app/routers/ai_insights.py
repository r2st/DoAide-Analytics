import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.ai_insight import AIInsight
from app.models.dataset import Dataset
from app.models.user import User
from app.schemas.ai_insight import AIInsightResponse, NLQueryRequest
from app.services.ai_service import analyze_dataset, query_dataset
from app.utils.auth import get_current_user

router = APIRouter(prefix="/ai", tags=["ai"])


@router.post("/analyze", response_model=AIInsightResponse, status_code=201)
async def analyze(
    dataset_id: uuid.UUID,
    business_id: uuid.UUID,
    analysis_type: str = "trend",
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Dataset).where(Dataset.id == dataset_id))
    dataset = result.scalar_one_or_none()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")

    content = await analyze_dataset(dataset.data, dataset.columns, analysis_type)

    insight = AIInsight(
        business_id=business_id,
        dataset_id=dataset_id,
        insight_type=analysis_type,
        content=content,
    )
    db.add(insight)
    await db.commit()
    await db.refresh(insight)
    return insight


@router.post("/query", response_model=AIInsightResponse, status_code=201)
async def nl_query(
    request: NLQueryRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Dataset).where(Dataset.id == request.dataset_id))
    dataset = result.scalar_one_or_none()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")

    content = await query_dataset(dataset.data, dataset.columns, request.query)

    insight = AIInsight(
        business_id=request.business_id,
        dataset_id=request.dataset_id,
        insight_type="query_response",
        content=content,
        metadata_={"query": request.query},
    )
    db.add(insight)
    await db.commit()
    await db.refresh(insight)
    return insight


@router.get("/insights", response_model=list[AIInsightResponse])
async def list_insights(
    business_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(AIInsight)
        .where(AIInsight.business_id == business_id)
        .order_by(AIInsight.created_at.desc())
    )
    return result.scalars().all()
