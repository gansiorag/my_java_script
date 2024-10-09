import uvicorn
from app.router import app
# Запуск приложения
if __name__ == "__main__":
    # asyncio.run(main_two())
    uvicorn.run(app, host="0.0.0.0", port=4548)