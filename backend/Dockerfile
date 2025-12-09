FROM python:3.12-slim AS builder

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
ENV PATH="/root/.local/bin:$PATH"

WORKDIR /app
COPY pyproject.toml uv.lock ./


RUN uv sync --frozen --no-install-project

COPY . . 

CMD ["uv", "run", "uvicorn", "app.main:app", "--port", "8080", "--host", "0.0.0.0"]
