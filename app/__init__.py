import os, sys
import subprocess
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import logging

# Create a logger
logger = logging.getLogger(__name__)

# Set the logging level
logger.setLevel(logging.DEBUG)

# Create a file handler
# file_handler = logging.FileHandler('app.log')

# Create a console handler
console_handler = logging.StreamHandler()

# Add the handlers to the logger
# logger.addHandler(file_handler)
logger.addHandler(console_handler)

path_prj = os.getcwd().split("dropt_it_project")[0] + "dropt_it_project/"
sys.path.append(path_prj)
app = FastAPI()
app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")