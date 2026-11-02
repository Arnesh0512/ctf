import os

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import PlainTextResponse


app = FastAPI(title="Temple Chain")

FLAG_AT = int(os.getenv("FLAG_AT", "73"))
CTF_FLAG = os.getenv("CTF_FLAG", "MAYA{LINKED_TRAIL}")


@app.get("/link/{number}", name="link", response_class=PlainTextResponse)
async def get_next_link(number: int, request: Request) -> PlainTextResponse:
    if not 0 <= number <= 100:
        raise HTTPException(status_code=404, detail="Link not found")

    next_number = 0 if number == 100 else number + 1
    next_url = str(request.url_for("link", number=str(next_number)))
    headers = {"Link": f'<{next_url}>; rel="next"'}

    if number == FLAG_AT:
        headers["X-Archive-Fragment"] = CTF_FLAG

    return PlainTextResponse(
        content=f"The next record is at {next_url}\n",
        headers=headers,
    )
