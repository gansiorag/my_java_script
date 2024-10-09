import sys
import os
from datetime import datetime

from datetime import datetime as dt
from time import sleep

from fastapi.responses import HTMLResponse
from fastapi import Request, Form
from termcolor import colored
import inspect


file_dir = os.path.dirname(__file__)
print(file_dir)
sys.path.append(file_dir.split("app")[0] + "app")

from app import app
from app import templates, logger


# Обработчик POST-запросов на /users
@app.get("/", response_class=HTMLResponse)
async def start_page(request: Request):
    """_summary_

    Args:
        user (User): _description_

    Returns:
        _type_: _description_
    """


    return templates.TemplateResponse(
        "index.html",
        {
            "request": request})

@app.post("/load_video/{code}", response_class=HTMLResponse)
async def load_video(
    code, request: Request, link_load: str = Form()
):  # function for start menu
    """roter regims works with sources

    Args:
        code (_type_): 1 - work with sources of data
        2 - modifySoursesSet modify data base of sources data

    Returns:
        _type_: _description_
    """
    print(
        colored(
            "=" * 20
            + " >> "
            + inspect.stack()[0][0].f_code.co_name
            + " << "
            + "=" * 20,
            "red",
        )
    )
    logger.info(f"load video {code}")
    logger.info(f"load video link_load {link_load}")
