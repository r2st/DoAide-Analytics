import json

from app.utils.openrouter import send_chat_completion


async def analyze_dataset(dataset_data: list[dict], columns: list[str], analysis_type: str = "trend") -> str:
    sample = dataset_data[:50]
    context = f"Dataset columns: {columns}\nSample data ({len(sample)} of {len(dataset_data)} rows):\n{json.dumps(sample, default=str)}"

    prompts = {
        "trend": "Analyze this dataset for trends and patterns. Identify key trends, growth/decline patterns, and notable changes over time. Provide actionable insights.",
        "anomaly": "Analyze this dataset for anomalies and outliers. Identify any unusual data points, unexpected values, or patterns that deviate from the norm. Explain why they might be significant.",
        "summary": "Provide a comprehensive summary of this dataset. Include key statistics, distributions, and notable characteristics of the data.",
    }

    prompt = prompts.get(analysis_type, prompts["summary"])

    messages = [
        {"role": "system", "content": "You are a data analyst. Provide clear, concise, actionable insights. Use bullet points and specific numbers from the data."},
        {"role": "user", "content": f"{prompt}\n\n{context}"},
    ]

    return await send_chat_completion(messages)


async def query_dataset(dataset_data: list[dict], columns: list[str], question: str) -> str:
    sample = dataset_data[:100]
    context = f"Dataset columns: {columns}\nData ({len(sample)} of {len(dataset_data)} rows):\n{json.dumps(sample, default=str)}"

    messages = [
        {"role": "system", "content": "You are a data analyst assistant. Answer questions about the provided dataset accurately and concisely. Reference specific data points when possible."},
        {"role": "user", "content": f"Question: {question}\n\nDataset:\n{context}"},
    ]

    return await send_chat_completion(messages)
