from fastapi import FastAPI

app = FastAPI(
    title="Enterprise AI Knowledge Hub",
    version="1.0.0"
)

@app.get("/")
async def root():
    return {"message": "Welcome to Enterprise AI Knowledge Hub"}

@app.get("/health")
async def health():
    return {"status": "UP"}