import csv
import io
from typing import Any


def parse_csv(file_content: bytes) -> dict[str, Any]:
    text = file_content.decode("utf-8-sig")
    reader = csv.DictReader(io.StringIO(text))
    rows = list(reader)
    columns = reader.fieldnames or []
    return {
        "columns": list(columns),
        "data": rows,
        "row_count": len(rows),
    }


def validate_dataset(data: list[dict]) -> bool:
    if not data:
        return False
    if not isinstance(data, list):
        return False
    if not all(isinstance(row, dict) for row in data):
        return False
    return True
