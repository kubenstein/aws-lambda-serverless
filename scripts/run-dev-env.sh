#!/bin/bash

# stop on error
set -e

PATH="./node_modules/.bin:$PATH"


AWS_ACCESS_KEY_ID=dev AWS_SECRET_ACCESS_KEY=dev \
  concurrently \
    --kill-others-on-fail \
    -n ' lambda ',frontend,dynamoDB,'db utils' \
    -c yellow,green,blue,cyan \
      '
        # Lambda
        echo waiting for dynamoDB
        wait-on tcp:8000 && \
          serverless offline start --nos3sync --stage dev
      ' \
      '
        # Frontend
        echo waiting for dynamoDB
        wait-on tcp:8000 && \
          VITE_LAMBDA_ENDPOINT=http://localhost:3001/dev/ vite --port 3000 ./src/frontend/
      ' \
      '
        # DynamoDB
        docker run -i --rm \
          -p 8000:8000 \
          -v $(PWD)/.db/:/usr/app/data \
          amazon/dynamodb-local \
            -jar DynamoDBLocal.jar \
            -disableTelemetry \
            -sharedDb \
            -dbPath /usr/app/data/
      ' \
      '
        # DynamoDB migrations
        echo waiting for dynamoDB
        wait-on tcp:8000 && \
          serverless dynamodb migrate
      '