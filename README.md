# task-api

A simple REST API for managing tasks, built with Node.js and Express. Designed for deployment on AWS using CodeBuild and ECS/ECR.

## Endpoints

| Method | Path         | Description         |
|--------|--------------|---------------------|
| GET    | /health      | Health check        |
| GET    | /tasks       | List all tasks      |
| GET    | /tasks/:id   | Get a task by ID    |
| POST   | /tasks       | Create a new task   |
| PUT    | /tasks/:id   | Update a task       |
| DELETE | /tasks/:id   | Delete a task       |

## Running locally

```bash
npm install
npm start
```

## Running tests

```bash
npm test
```

## Docker

```bash
docker build -t task-api .
docker run -p 3000:3000 task-api
```

## Environment variables

| Variable          | Default | Description              |
|-------------------|---------|--------------------------|
| PORT              | 3000    | Port the server listens on |
| AWS_DEFAULT_REGION| —       | AWS region (for CodeBuild) |
| AWS_ACCOUNT_ID    | —       | AWS account ID (for CodeBuild) |
| IMAGE_REPO_NAME   | —       | ECR repository name      |
| IMAGE_TAG         | —       | Docker image tag         |
