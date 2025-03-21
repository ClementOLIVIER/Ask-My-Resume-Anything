# Ask My Resume

This application allows you to interact with my resume using natural language.
It is built with Nuxt 3, TypeScript, and Gemini, and is designed to be easily deployable on platforms like Fly.io.
It uses a custom resume format and provides a user-friendly interface for querying resume information.

## Pre-requisites

- Node.js v18.0.0 or higher
- pnpm v9.0.0 or higher

## Configuration
Create your environment file:

```bash
cp .env.tmpl .env
```

And update the `.env` file with your Gemini API key: https://aistudio.google.com/app/apikey

## Development Setup

Install dependencies:

```bash
pnpm install
```

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```


### VSCode Setup

This project includes VSCode configurations to make development easier:

1. Open the project in VSCode
2. Use the built-in debugging configurations:
   - `client: chrome` - Debug the frontend in Chrome
   - `server: nuxt` - Debug the Nuxt server
   - `fullstack: nuxt` - Debug both client and server simultaneously

## Building for Production
Build the application for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```


## Docker Setup

Building the Docker Image

```bash
docker build -t ask-my-resume-anything --file Dockerfile ./
```

Running the Container

```bash
docker run --rm -p 3000:3000 --env-file .env ask-my-resume-anything
```

The application will be available at `http://localhost:3000`

## Deployment

The application can be deployed to Fly.io using

Configure environment variables:
```bash
fly secrets set GEMINI_API_KEY=<your-gemini-api-key>
```

Launch
```bash
fly launch
```

Deploy
```bash
fly deploy
```