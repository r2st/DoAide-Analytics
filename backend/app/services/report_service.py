import io
from typing import Any

from openpyxl import Workbook
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


def generate_pdf_report(title: str, widgets_data: list[dict[str, Any]]) -> bytes:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph(title, styles["Title"]))
    elements.append(Spacer(1, 20))

    for widget in widgets_data:
        elements.append(Paragraph(widget.get("title", "Widget"), styles["Heading2"]))
        elements.append(Spacer(1, 10))

        if widget.get("type") == "table" and widget.get("data"):
            data = widget["data"]
            if data:
                headers = list(data[0].keys())
                table_data = [headers] + [[str(row.get(h, "")) for h in headers] for row in data[:50]]
                t = Table(table_data)
                t.setStyle(TableStyle([
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#7c3aed")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("GRID", (0, 0), (-1, -1), 1, colors.grey),
                    ("FONTSIZE", (0, 0), (-1, -1), 8),
                ]))
                elements.append(t)
        else:
            config = widget.get("config", {})
            summary = f"Type: {widget.get('type', 'N/A')}"
            if config:
                summary += f" | Config: {', '.join(f'{k}={v}' for k, v in list(config.items())[:5])}"
            elements.append(Paragraph(summary, styles["Normal"]))

        elements.append(Spacer(1, 20))

    doc.build(elements)
    return buffer.getvalue()


def generate_excel_report(title: str, widgets_data: list[dict[str, Any]]) -> bytes:
    wb = Workbook()
    ws = wb.active
    ws.title = title[:31]

    for widget in widgets_data:
        ws.append([widget.get("title", "Widget")])
        ws.append([])

        if widget.get("data"):
            data = widget["data"]
            if data:
                headers = list(data[0].keys())
                ws.append(headers)
                for row in data[:1000]:
                    ws.append([row.get(h, "") for h in headers])
        ws.append([])

    buffer = io.BytesIO()
    wb.save(buffer)
    return buffer.getvalue()
