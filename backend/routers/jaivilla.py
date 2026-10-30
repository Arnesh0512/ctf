import os
import json
import base64
from typing import Optional
from fastapi import APIRouter, Request, Response, status
from fastapi.responses import JSONResponse
from models import LoginRequest

ROYAL_ADMINS = ["king", "queen", "prince", "princess"]
FLAG = os.getenv("FLAG", "MAYA{ROYAL_CREDENTIAL}")

router = APIRouter(tags=["JaiVilla"])

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
