from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.openapi.docs import get_swagger_ui_html
from dotenv import load_dotenv
import os

# Load environment variables from .env if present
load_dotenv()

app = FastAPI(
    title="Museum Archive API",
    description="Interactive documentation for Museum Archive flags 1 to 12.",
    version="1.0.0",
    docs_url=None,  # Custom handler below provides minimal calling GUI
    redoc_url="/redoc"
)

CUSTOM_CSS = """
<style>
/* 1. Hide Parameters & Action Buttons */
.opblock-section-header,
.parameters-container,
.try-out,
.btn-clear,
.btn.btn-clear,
button.btn-clear,
.btn.cancel,
button.cancel {
    display: none !important;
}

/* 2. Hide Curl & Request URL */
.curl-command,
.request-url,
.responses-inner > div > h4 {
    display: none !important;
}

/* 3. Hide Response Headers and its label */
.response-headers,
pre.response-headers,
.response-col_description > h5:nth-of-type(2),
h5:has(+ pre.response-headers),
h5:has(+ .response-headers) {
    display: none !important;
}

/* 4. Hide Status Code Column & Headers row in live response table */
.live-responses-table thead,
.response-col_status,
.responses-header {
    display: none !important;
}

/* 5. Hide bottom static Documentation Responses table and its heading */
.responses-inner > table.responses-table:not(.live-responses-table),
.responses-inner > h4 {
    display: none !important;
}

/* 6. Single clean full-width Execute Button */
.execute-wrapper {
    padding: 12px 20px !important;
}
.btn-group {
    display: block !important;
    width: 100% !important;
}
.btn.execute {
    width: 100% !important;
    display: block !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    padding: 10px 0 !important;
    border-radius: 6px !important;
    letter-spacing: 0.05em !important;
}

/* 7. Clean Response Body display */
.live-responses-table,
.live-responses-table tbody,
.live-responses-table tr.response,
.response-col_description {
    display: block !important;
    width: 100% !important;
}
.response-col_description {
    padding: 0 20px 16px 20px !important;
}
.response-col_description > h5:first-of-type {
    font-size: 12px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    color: #49cc90 !important;
    margin-bottom: 6px !important;
}
.highlight-code pre {
    border-radius: 6px !important;
    font-size: 14px !important;
}
</style>
"""

@app.get("/docs", include_in_schema=False)
def custom_docs():
    """Custom documentation view showing only Execute button and returned response."""
    response = get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title,
        swagger_ui_parameters={"tryItOutEnabled": True}
    )
    content = response.body.decode().replace("</head>", f"{CUSTOM_CSS}</head>")
    return HTMLResponse(content=content)

def get_flag(n: int) -> str:
    """Retrieve flag from environment variable FLAG_N or FLAGN."""
    return (
        os.getenv(f"FLAG_{n}")
        or os.getenv(f"FLAG{n}")
        or f"MAYA{{flag_{n}}}"
    )

@app.get("/flag1", tags=["Flags"], summary="Retrieve Flag 1")
def flag1():
    return {"flag": get_flag(1)}

@app.get("/flag2", tags=["Flags"], summary="Retrieve Flag 2")
def flag2():
    return {"flag": get_flag(2)}

@app.get("/flag3", tags=["Flags"], summary="Retrieve Flag 3")
def flag3():
    return {"flag": get_flag(3)}

@app.get("/flag4", tags=["Flags"], summary="Retrieve Flag 4")
def flag4():
    return {"flag": get_flag(4)}

@app.get("/flag5", tags=["Flags"], summary="Retrieve Flag 5")
def flag5():
    return {"flag": get_flag(5)}

@app.get("/flag6", tags=["Flags"], summary="Retrieve Flag 6")
def flag6():
    return {"flag": get_flag(6)}

@app.get("/flag7", tags=["Flags"], summary="Retrieve Flag 7")
def flag7():
    return {"flag": get_flag(7)}

@app.get("/flag8", tags=["Flags"], summary="Retrieve Flag 8")
def flag8():
    return {"flag": get_flag(8)}

@app.get("/flag9", tags=["Flags"], summary="Retrieve Flag 9")
def flag9():
    return {"flag": get_flag(9)}

@app.get("/flag10", tags=["Flags"], summary="Retrieve Flag 10")
def flag10():
    return {"flag": get_flag(10)}

@app.get("/flag11", tags=["Flags"], summary="Retrieve Flag 11")
def flag11():
    return {"flag": get_flag(11)}

@app.get("/flag12", tags=["Flags"], summary="Retrieve Flag 12")
def flag12():
    return {"flag": get_flag(12)}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 10000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
