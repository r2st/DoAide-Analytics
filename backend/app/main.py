from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import *  # noqa: F401, F403
from app.routers import (
    ai_insights,
    auth,
    businesses,
    dashboards,
    data_sources,
    datasets,
    health,
    reports,
    scheduled_reports,
    usage,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(
    title="DoAide Analytics",
    description="AI-powered business analytics for SMBs",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(auth.router)
app.include_router(businesses.router)
app.include_router(data_sources.router)
app.include_router(datasets.router)
app.include_router(dashboards.router)
app.include_router(reports.router)
app.include_router(scheduled_reports.router)
app.include_router(ai_insights.router)
app.include_router(usage.router)
