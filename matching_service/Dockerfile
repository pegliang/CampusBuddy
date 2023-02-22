FROM python:3.10-slim

WORKDIR /app

COPY . .

EXPOSE 8080

# Dependencies
RUN pip install -r requirements.txt

CMD ["python", "./main.py"]