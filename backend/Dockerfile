FROM python:3.11-slim

RUN pip install uv

RUN useradd -m appuser
WORKDIR /app
USER appuser

COPY pyproject.toml .

RUN uv pip install --system --no-cache-dir --upgrade

COPY . .

EXPOSE 8000

CMD ["uv", "run", "backend:app", "--host", "0.0.0.0", "--port", "8000"]
