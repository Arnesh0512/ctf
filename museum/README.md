# Museum Archive API

FastAPI application serving flags via endpoints `/flag1` through `/flag12`.

## Endpoints

- `GET /docs` - Interactive API documentation
- `GET /redoc` - ReDoc API documentation
- `GET /flag1` - Returns Flag 1
- `GET /flag2` - Returns Flag 2
- `GET /flag3` - Returns Flag 3
- `GET /flag4` - Returns Flag 4
- `GET /flag5` - Returns Flag 5
- `GET /flag6` - Returns Flag 6
- `GET /flag7` - Returns Flag 7
- `GET /flag8` - Returns Flag 8
- `GET /flag9` - Returns Flag 9
- `GET /flag10` - Returns Flag 10
- `GET /flag11` - Returns Flag 11
- `GET /flag12` - Returns Flag 12

## Environment Variables

Configure flags in `.env` or in Render service environment settings:
```env
FLAG_1=MAYA{...}
...
FLAG_12=MAYA{...}
```

## Running Locally

```bash
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 10000
```
