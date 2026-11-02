# Temple Chain

Small FastAPI CTF service with one route: `/link/{number}`.

- Numbers 0 through 200 return the previous and next absolute URLs.
- Record 0 links back to record 200, and record 200 links to record 0.
- Requests outside that range return HTTP 404.
- The configured record adds the flag in the `X-Archive-Fragment` response header.
- The root page is titled “Temple Chain API.” Interactive Swagger/ReDoc docs and the OpenAPI schema are disabled.

## Run locally

```sh
python -m pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

Set `FLAG_AT` and `CTF_FLAG` in the Render environment to change the challenge record and flag. The default flag record is 125.

## Render

- Runtime: Python
- Root directory: `link-of-links`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
