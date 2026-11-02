# Link of Links

Small FastAPI CTF service with one route: `/link/{number}`.

- Numbers 0 through 100 return the next absolute URL.
- Record 100 links back to record 0.
- Requests outside that range return HTTP 404.
- The configured record adds the flag in the `X-Archive-Fragment` response header.
- FastAPI documentation is available at `/docs` (Swagger UI), `/redoc`, and `/openapi.json`.

## Run locally

```sh
python -m pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

Set `FLAG_AT` and `CTF_FLAG` in the Render environment to change the challenge record and flag.

## Render

- Runtime: Python
- Root directory: `link-of-links`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
