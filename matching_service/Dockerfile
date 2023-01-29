FROM python:3.10.6

WORKDIR /app

COPY . .

EXPOSE 8080

# Dependencies
RUN pip install -r requirements.txt

CMD ["python", "./main.py"]