FROM python:3.10

RUN apt-get update && apt-get install -y libpq-dev gcc

RUN pip install "poetry==1.3.1"
RUN poetry config virtualenvs.create false

WORKDIR /code
COPY poetry.lock pyproject.toml README.md /code/
RUN poetry install --no-root

COPY ./webapp /code/webapp
COPY ./alembic /code/alembic

RUN poetry install

CMD ["uvicorn", "webapp.main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]