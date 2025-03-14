# AI PDF Analyzer

A Node.js + TypeScript server using tRPC to analyze a candidate's CV and a job description PDF through Gemini 1.5.

## Features

1. Accepts two base64-encoded PDF files (Job Description & CV).
2. Parses PDF text with [pdf-parse](https://www.npmjs.com/package/pdf-parse).
3. Sends text to the Gemini 1.5 endpoint using
   the [GenerateContentRequest](https://github.com/googleapis/nodejs-vertexai/blob/4807338c51b3749c86b8e3b71380f4a45722564d/src/types/content.ts#L57)
   shape.
4. Returns an AI-generated strengths/weaknesses & alignment analysis.

## Installation & run

1. Add actual endpoint and auth key to the `.env` constants:

```text
GEMINI_AUTH_TOKEN=
ENDPOINT=
```

2. Install dependencies:

```shell
npm install
```

3. Run server:

```shell
npm run dev
```

### Run tests from scripts:

```shell
npx ts-node tests/testClient.ts
```

### Run tests using Postman or similar tool:

URL:
```text
http://localhost:3000/trpc/analyzeCV
```

Header:
```shell
Content-Type: application/json
```

Request body:
```text
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "analyzeCV",
  "params": {
    "jobDescriptionPdfBase64": "<JOB_DESCRIPTION_IN_BASE64>",
    "cvPdfBase64": "<CV_IN_BASE64>"
  }
}
```