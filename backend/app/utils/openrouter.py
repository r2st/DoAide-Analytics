import httpx

from app.config import settings

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


async def send_chat_completion(messages: list[dict], model: str | None = None) -> str:
    model = model or settings.OPENROUTER_MODEL
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            OPENROUTER_URL,
            headers={
                "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": model,
                "messages": messages,
            },
        )
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"]
