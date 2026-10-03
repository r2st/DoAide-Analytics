from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.usage import UsageTracking
from app.models.user import User
from app.utils.auth import get_current_user

router = APIRouter(prefix="/usage", tags=["usage"])


@router.get("/stats")
async def get_usage_stats(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(UsageTracking.action, func.count(UsageTracking.id))
        .where(UsageTracking.user_id == current_user.id)
        .group_by(UsageTracking.action)
    )
    stats = {row[0]: row[1] for row in result.all()}
    return {"user_id": str(current_user.id), "stats": stats}
