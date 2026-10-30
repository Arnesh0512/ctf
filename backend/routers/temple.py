import os
import time
import warnings
from typing import Optional
from fastapi import APIRouter, Request, status
from fastapi.responses import JSONResponse
import jwt
from models import LoginRequest

warnings.filterwarnings("ignore")

TEMPLE_JWT_SECRET = os.getenv("TEMPLE_JWT_SECRET", "2407")
TEMPLE_FLAG = os.getenv("TEMPLE_FLAG", "MAYA{TICKING_CHARIOT}")

router = APIRouter(prefix="/temple", tags=["konark sun temple"])

@router.post("/login", summary="Temple Login")
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

@router.get("/flag", summary="Unseal Sanctum Flag")
@router.post("/flag", summary="Unseal Sanctum Flag (POST)")
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
                "current_time": now
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
