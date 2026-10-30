import os
import json
import base64
from typing import Optional
from fastapi import FastAPI, APIRouter, Request, Response, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="CTF Authentication & Authorization Gateway",
    description="Generic CTF Backend for cookie-based privilege escalation challenges",
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

ROYAL_ADMINS = ["king", "queen", "prince", "princess"]
FLAG = os.getenv("FLAG", "MAYA{ROYAL_CREDENTIAL}")

# Dedicated JaiVilla Router
router = APIRouter(tags=["JaiVilla"])

class LoginRequest(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None

def parse_auth_cookie(raw_cookie: Optional[str]):
    if not raw_cookie or not isinstance(raw_cookie, str):
        return None

    raw_clean = raw_cookie.strip().strip('"').strip("'")
    try:
        # Add padding if needed
        missing_padding = len(raw_clean) % 4
        if missing_padding:
            raw_clean += '=' * (4 - missing_padding)
        decoded = base64.b64decode(raw_clean).decode("utf-8")
        
        # 1. Attempt JSON decode
        try:
            parsed = json.loads(decoded)
            if isinstance(parsed, dict):
                return {
                    "username": str(parsed.get("username", "")).strip(),
                    "role": str(parsed.get("role", "")).strip()
                }
        except Exception:
            pass

        # 2. Delimiter fallback (username:role)
        if ":" in decoded:
            parts = decoded.split(":", 1)
            return {
                "username": parts[0].strip(),
                "role": parts[1].strip()
            }

        return None
    except Exception:
        return None

@app.get("/", include_in_schema=False)
def health_check():
    return {
        "status": "online",
        "service": "Jai Vilas Palace Gateway",
        "version": "1.0.0"
    }

async def process_login(request: Request, response: Response, login_data: Optional[LoginRequest] = None):
    username = None
    password = None

    if login_data:
        username = login_data.username
        password = login_data.password

    if not username:
        # Try raw json fallback
        try:
            body = await request.json()
            if isinstance(body, dict):
                username = body.get("username")
                password = body.get("password")
        except Exception:
            pass

    if not username or not password:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "success": False,
                "message": "Username and password are required."
            }
        )

    session_data = {
        "username": str(username).strip(),
        "role": "user"
    }

    # Encode JSON session in base64
    json_bytes = json.dumps(session_data).encode("utf-8")
    encoded_cookie = base64.b64encode(json_bytes).decode("utf-8")

    # Ensure backend-domain cookie is deleted so session is strictly frontend-only
    response.delete_cookie(
        key="auth",
        path="/",
        samesite="none",
        secure=True
    )

    return {
        "success": True,
        "message": "Authentication successful.",
        "cookie": encoded_cookie,
        "user": session_data
    }

@router.post("/login", summary="Login")
async def login(request: Request, response: Response, login_data: Optional[LoginRequest] = None):
    return await process_login(request, response, login_data)

async def process_vault(request: Request, cookie: Optional[str] = None):
    raw_cookie = (
        request.cookies.get("auth") or
        request.headers.get("x-auth-cookie") or
        request.query_params.get("cookie") or
        cookie
    )

    if not raw_cookie and "authorization" in request.headers:
        auth_header = request.headers["authorization"]
        if auth_header.lower().startswith("bearer "):
            raw_cookie = auth_header[7:].strip()
        else:
            raw_cookie = auth_header.strip()

    if not raw_cookie:
        # Try reading from body if JSON
        try:
            body = await request.json()
            if isinstance(body, dict) and "cookie" in body:
                raw_cookie = body["cookie"]
        except Exception:
            pass

    if not raw_cookie:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={
                "success": False,
                "message": "Missing authentication cookie. Please log in first."
            }
        )

    parsed = parse_auth_cookie(raw_cookie)

    if not parsed or not parsed.get("username"):
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "success": False,
                "message": "Malformed or invalid base64 session cookie."
            }
        )

    username_lower = parsed["username"].lower()
    role_lower = parsed["role"].lower()

    is_royal = username_lower in ROYAL_ADMINS
    is_admin = role_lower == "admin"

    if is_royal and is_admin:
        return {
            "success": True,
            "message": "Vault access granted! Royal identity verified.",
            "flag": FLAG,
            "vault": {
                "accessGrantedTo": parsed["username"],
                "role": parsed["role"],
                "collection": "Imperial Scindia Royal Jewels & Durbar Artifacts"
            }
        }

    return JSONResponse(
        status_code=status.HTTP_403_FORBIDDEN,
        content={
            "success": False,
            "message": "Access Denied: Only admins like king, queen, prince or princess can access it.",
            "identity": {
                "username": parsed["username"],
                "role": parsed["role"]
            }
        }
    )

@router.get("/vault", summary="Get Vault")
async def get_vault(request: Request, cookie: Optional[str] = None):
    return await process_vault(request, cookie)

app.include_router(router)

# ==========================================
# KONARK SUN TEMPLE ROUTER (CTF CHALLENGE)
# ==========================================
import time
import warnings
warnings.filterwarnings("ignore")
import jwt

TEMPLE_JWT_SECRET = os.getenv("TEMPLE_JWT_SECRET", "2407")
TEMPLE_FLAG = os.getenv("TEMPLE_FLAG", "MAYA{TICKING_CHARIOT}")

konark_router = APIRouter(prefix="/temple", tags=["konark sun temple"])

@konark_router.post("/login", summary="Temple Login")
async def temple_login(request: Request, login_data: Optional[LoginRequest] = None):
    username = "pilgrim"
    password = None

    if login_data:
        if login_data.username:
            username = login_data.username.strip()
        password = login_data.password

    if not password:
        try:
            body = await request.json()
            if isinstance(body, dict):
                if body.get("username"):
                    username = str(body["username"]).strip()
                password = body.get("password")
        except Exception:
            pass

    now = int(time.time())
    payload = {
        "sub": username,
        "role": "pilgrim",
        "temple": "Konark Sun Temple",
        "dynasty": "Eastern Ganga",
        "iat": now,
        "exp": now  # Expired immediately upon issuance
    }

    token = jwt.encode(payload, TEMPLE_JWT_SECRET, algorithm="HS256")

    return {
        "success": True,
        "message": "Pilgrim transit pass issued by the priests of King Narasimhadeva I.",
        "token": token,
        "user": {
            "username": username,
            "role": "pilgrim",
            "temple": "Konark Sun Temple"
        },
        "hint": "The Sun God Surya measures time across 24 stone chariot wheels. Sacred Secret: 2407"
    }

@konark_router.get("/flag", summary="Unseal Sanctum Flag")
@konark_router.post("/flag", summary="Unseal Sanctum Flag (POST)")
async def temple_flag(request: Request, token: Optional[str] = None):
    raw_token = (
        request.headers.get("x-access-token") or
        request.query_params.get("token") or
        token
    )

    if not raw_token and "authorization" in request.headers:
        auth_header = request.headers["authorization"]
        if auth_header.lower().startswith("bearer "):
            raw_token = auth_header[7:].strip()
        else:
            raw_token = auth_header.strip()

    if not raw_token:
        try:
            body = await request.json()
            if isinstance(body, dict) and "token" in body:
                raw_token = body["token"]
        except Exception:
            pass

    if not raw_token:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={
                "success": False,
                "error": "MissingToken",
                "message": "Missing Sun Chariot transit pass (JWT). Please authenticate at the Surya gateway."
            }
        )

    clean_token = raw_token.strip().strip('"').strip("'")

    try:
        # Verify signature with secret 2407
        unverified_exp = jwt.decode(
            clean_token,
            TEMPLE_JWT_SECRET,
            algorithms=["HS256"],
            options={"verify_exp": False}
        )
    except jwt.InvalidSignatureError:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={
                "success": False,
                "error": "InvalidSignatureError",
                "message": "Temple seal rejected! The signature does not match Surya's sacred secret 2407."
            }
        )
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "success": False,
                "error": "MalformedTokenError",
                "message": f"Malformed JWT chariot pass: {str(e)}"
            }
        )

    exp = unverified_exp.get("exp")
    now = int(time.time())

    if exp is None or exp <= now:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={
                "success": False,
                "error": "TokenExpiredError",
                "message": f"Chariot transit pass has EXPIRED at timestamp {exp}. Current sun time is {now}. The sands of time have run out.",
                "expired_at": exp,
                "current_time": now,
                "hint": "Surya demands a live token signed with secret 2407 whose expiration is in the future."
            }
        )

    return {
        "success": True,
        "message": "The 24 carved stone wheels of the Sun Chariot align! King Narasimhadeva I's inner sanctum reveals the sacred flag.",
        "flag": TEMPLE_FLAG,
        "temple": {
            "name": "Konark Sun Temple",
            "deity": "Surya (The Sun God)",
            "builder": "King Narasimhadeva I",
            "dynasty": "Eastern Ganga Dynasty",
            "century": "13th Century CE",
            "location": "Odisha, Eastern Coast of India",
            "design": "Monumental Stone Chariot with 24 carved wheels & 7 horses"
        }
    }

app.include_router(konark_router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 10000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
