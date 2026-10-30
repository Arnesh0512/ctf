import os
import sys
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

# Ensure backend root is in python module search path
backend_root = Path(__file__).resolve().parent
if str(backend_root) not in sys.path:
    sys.path.insert(0, str(backend_root))

from routers.jaivilla import router as jaivilla_router
from routers.temple import router as temple_router

app = FastAPI(
    title="CTF Authentication & Authorization Gateway",
    description="Generic CTF Backend for cookie-based privilege escalation and JWT challenges",
    version="1.0.0"
)

# Enable CORS for all origins with credentials enabled
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https?://.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root health check endpoint (excluded from Swagger schema)
@app.get("/", include_in_schema=False)
def health_check():
    return {
        "status": "online",
        "service": "CTF Gateway",
        "version": "1.0.0"
    }

# Register decentralized routers
app.include_router(jaivilla_router)
app.include_router(temple_router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 10000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
