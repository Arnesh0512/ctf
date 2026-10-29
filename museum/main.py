from fastapi import FastAPI
from dotenv import load_dotenv
import os

# Load environment variables from .env if present
load_dotenv()

app = FastAPI(
    title="Museum Archive API",
    description="Interactive documentation for Museum Archive flags 1 to 12.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

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
