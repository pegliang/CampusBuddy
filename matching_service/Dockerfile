FROM python:3.10.6

WORKDIR /app

COPY . .

EXPOSE 8080

# Dependencies
RUN python3.10 -m pip install -r requirements.txt

CMD ["python3.10", "./main.py"]