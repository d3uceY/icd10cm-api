# ICD-10-CM API

A production-ready REST API for querying ICD-10-CM (International Classification of Diseases, 10th Revision, Clinical Modification) codes. Built with Node.js, Express, and TypeScript.

---

## Features

- **Code prefix search** — search by the start of an ICD-10-CM code (e.g. `E11`, `S52`)
- **Description keyword search** — search by any word or phrase in a code's description
- **Exact code lookup** — retrieve a single entry by its full code
- **Smart query routing** — automatically detects whether input is a code or a keyword
- **Capped results** — all search responses return a maximum of 20 items
- **Health check endpoint** — for uptime monitoring and load balancer probes
- **Graceful shutdown** — handles `SIGTERM` cleanly for containerized deployments

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript (strict mode)
- **Dev server:** ts-node-dev (hot reload)

---

## Getting Started

### Prerequisites

- Node.js v18+
- The ICD-10-CM flat text file placed in the project root

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root (or set system environment variables):

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Port the server listens on |
| `NODE_ENV` | `development` | Environment name |
| `ICD_TEXT_NAME` | `icd10cm-codes-April-1-2026.txt` | Filename of the ICD-10-CM flat text data file |

### Data File

Place your ICD-10-CM flat text file in the project root. The file must follow the standard CDC/NCHS format — one entry per line with the code followed by the description separated by whitespace:

```
A000  Cholera due to Vibrio cholerae 01, biovar cholerae
A001  Cholera due to Vibrio cholerae 01, biovar eltor
E1100 Type 2 diabetes mellitus with hyperosmolarity without nonketotic...
```

The filename must match the `ICD_TEXT_NAME` environment variable.

### Running the Server

```bash
# Development (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Type check only
npm run type-check
```

---

## API Reference

### Health Check

```
GET /health
```

**Response `200`**
```json
{
  "status": "ok",
  "timestamp": "2026-03-28T13:00:00.000Z"
}
```

---

### Search ICD-10-CM Codes

```
GET /api/icd?q=<query>
```

The `q` parameter drives two search modes automatically:

| Input pattern | Mode | Example |
|---------------|------|---------|
| Starts with a letter followed by digits (e.g. `E11`, `S52.001A`) | Code prefix search | `?q=E11` |
| Any other text | Description keyword search | `?q=diabetes` |

Returns at most **20 results**.

**Query Parameters**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `q` | Yes | Code prefix or description keyword |

**Response `200`**
```json
{
  "query": "diabetes",
  "count": 20,
  "results": [
    { "code": "E0800", "description": "Diabetes mellitus due to underlying condition with hyperosmolarity without nonketotic hyperglycemic-hyperosmolar coma (NKHHC)" },
    { "code": "E0801", "description": "Diabetes mellitus due to underlying condition with hyperosmolarity with coma" }
  ]
}
```

**Response `400`** — missing or empty `q`
```json
{
  "status": "error",
  "message": "Query parameter \"q\" is required and must be a non-empty string."
}
```

---

### Exact Code Lookup

```
GET /api/icd/:code
```

Returns a single entry for the exact ICD-10-CM code. Case-insensitive.

**Response `200`**
```json
{
  "code": "E119",
  "description": "Type 2 diabetes mellitus without complications"
}
```

**Response `404`** — code not found
```json
{
  "status": "error",
  "message": "ICD-10-CM code \"E999\" not found."
}
```

---

## Project Structure

```
src/
├── index.ts               # Server bootstrap & graceful shutdown
├── app.ts                 # Express app, middleware, route registration
├── config/
│   └── env.ts             # Centralized environment config
├── routes/
│   ├── icd.routes.ts      # /api/icd routes
│   ├── health.routes.ts   # /health route
│   └── api.routes.ts      # /api/test route
├── controllers/
│   ├── icd.controller.ts  # Search and lookup handlers
│   ├── health.controller.ts
│   └── test.controller.ts
├── services/
│   └── icd.services.ts    # Data loading, hashmap, search logic
└── utils/
    └── errorHandler.ts    # 404 and centralized error middleware
```

---

## Data & Licensing

ICD-10-CM code data is published by the **National Center for Health Statistics (NCHS), CDC** and is a **U.S. Government work in the public domain** (17 U.S.C. § 105). See [THIRD_PARTY_NOTICES](./THIRD_PARTY_NOTICES) for full attribution.

This API source code is licensed under the **MIT License**. See [LICENSE](./LICENSE).

> **Disclaimer:** This API does not constitute medical advice. Always consult a qualified medical coder or healthcare professional for clinical coding decisions.
