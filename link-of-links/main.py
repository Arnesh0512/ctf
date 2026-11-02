import os

from fastapi import FastAPI, HTTPException, Request
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.responses import HTMLResponse, PlainTextResponse


app = FastAPI(
    title="Temple Chain API",
    docs_url=None,
    redoc_url=None,
)

FLAG_AT = int(os.getenv("FLAG_AT", "125"))
CTF_FLAG = os.getenv("CTF_FLAG", "MAYA{LINKED_TRAIL}")


@app.get("/", include_in_schema=False, response_class=HTMLResponse)
async def home() -> HTMLResponse:
    return HTMLResponse(
        "<!doctype html><html><head><meta charset='utf-8'>"
        "<meta name='viewport' content='width=device-width, initial-scale=1'>"
        "<title>Temple Chain API</title></head>"
        "<body><h1>Temple Chain API</h1>"
        "<p>Follow the linked records using <code>/link/{number}</code>.</p>"
        "</body></html>"
    )


@app.get("/docs", include_in_schema=False, response_class=HTMLResponse)
async def api_docs() -> HTMLResponse:
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title="Temple Chain API",
    )


@app.get("/link/{number}", name="link", response_class=PlainTextResponse)
async def get_next_link(number: int, request: Request) -> PlainTextResponse:
    if not 0 <= number <= 200:
        raise HTTPException(status_code=404, detail="Link not found")

    previous_number = 200 if number == 0 else number - 1
    next_number = 0 if number == 200 else number + 1
    previous_url = str(request.url_for("link", number=str(previous_number)))
    next_url = str(request.url_for("link", number=str(next_number)))
    headers = {"Link": f'<{previous_url}>; rel="prev", <{next_url}>; rel="next"'}

    if number == FLAG_AT:
        headers["X-Archive-Fragment"] = CTF_FLAG

    return PlainTextResponse(
        content=(
            f"The previous record is at {previous_url}\n"
            f"The next record is at {next_url}\n"
        ),
        headers=headers,
    )
