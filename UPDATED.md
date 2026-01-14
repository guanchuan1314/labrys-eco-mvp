# Project Architecture Overview

This document describes the frontend and backend architecture, structure, and current implementation notes for the project.

---

## Frontend

### Tech Stack
- **Framework:** React 18.3.1
- **Language:** TypeScript
- **Port:** 2468

### Folder Structure
The frontend is organized with a focus on maintainability and reusability:

- **views/**
  - Page-level components mapped to application routes.
- **components/**
  - Reusable UI components and design modules.
- **utils/**
  - Shared utility functions and reusable logic.
- **services/** *(optional / future use)*
  - Frontend business logic or service abstractions.

### Routing
- All routes are defined in `components/Routers.tsx`.
- `Routers.tsx` is imported and used in `App.tsx`.

### API Communication
- The frontend communicates with the backend via HTTP requests using **Axios**.
- Axios calls are currently made directly where needed.

### Error Handling
- When processing any function, setApiError("") is called first to clear existing API errors. If an error occurs during execution, the error is then captured and updated using setApiError

### Improvement Notes
- Create a dedicated **api/** folder.
- Group API request files based on backend domain or file names.
- Introduce request and response classes for each API:
  - Ensure consistent response structures.
  - Enable validation of requests and responses.
- Mirror these request/response classes in the backend.
- With shared models, implement encoding and decoding on both frontend and backend so that only encoded data is transmitted over the network.
- All errors should be captured on the frontend and sent to the backend for centralized processing. The backend is responsible for handling these errors and notifying the development team through configured channels such as email, Telegram, WhatsApp, Slack, or other preferred communication platforms.
- All functions should implement the error handling properly

---

## Backend

### Tech Stack
- **Framework:** Express.js
- **Language:** JavaScript (Node.js)
- **Port:** 1357
- **Architecture Pattern:** MVC (Model–View–Controller)

### Entry Point
- `app.js` is the main application file.

### Folder Structure
- **routes/**
  - Defines API endpoints.
  - `routes.js` is the main routing file; other route files are imported into it.
- **controllers/**
  - Handle incoming requests and return success or failure responses.
- **models/**
  - Contain the core business logic and data processing.
- **middleware/**
  - Intercepts requests for authentication, authorization, and validation.
- **services/**
  - Shared backend services when applicable.

### Routing Details
- All API paths are defined in `routes.js`.
- Routes are mapped directly to controller functions.
- Many routes and controllers share the same file names for easier navigation.

### Middleware
- Middleware intercepts requests before reaching controllers.
- Unauthorized requests can be blocked at this layer.

### Controller Behavior
- Controllers primarily delegate logic to model functions.
- Models handle most of the business logic.
- Controllers return standardized success or failure responses to the frontend.

### Error Handling
- When processing any function, if an error occurs during execution, the error is then captured and updated using logger.js

### Improvement Notes
- API paths are inconsistent (some are versioned, some are not).
  - Recommendation: Standardize all APIs using versioning (e.g. `/api/v1/...`).
- CORS was previously open to the public.
  - Recommendation: Restrict CORS to the frontend origin only.
- Backend currently lacks automated test cases.
  - Test cases should be implemented to ensure consistent behavior.
  - Tests must be updated whenever functionality changes.
- logger.js should update to notify the development team through configured channels such as email, Telegram, WhatsApp, Slack, or other preferred communication platforms
- All functions should implement the error handling properly
- The API responses are inconsistent. Some are using success: true, success: false but some use status: ok. Standardize all the response. {success: true, data: {}}

---

## Updates

### 1. CORS Configuration
- CORS has been updated to allow only:
  - `localhost:2468`, or
  - the domain specified in environment variables.
- Changes applied in:
  - `app.js` — line 21
  - `app.js` — line 36

### 2. Authentication Middleware Fix
- In `backend/middleware/auth.middleware.js`, the `ensureWebToken` function should retrieve the token directly from the `Authorization` header.
- The frontend already sends the token in the format:
- File reference:
- `auth.middleware.js` — line 5

### 3. Wallet Connection Modal Bug Fix
- File: `src/components/auth/ConnectWallet.tsx`
- Issue:
- Clicking the dark backdrop behind the “Continue with Wallet” popup did not close the modal.
- The Escape key worked correctly.
- Root Cause:
- The popup overlay was layered above the transparent dark backdrop, preventing click events from triggering the close behavior.

### 4. Added Error Handling
- Implemented comprehensive error handling across backend APIs, including request and response validation.
- Integrated error handling within frontend components to capture and manage API failures.
- Added a global frontend error handler to catch unhandled errors and edge cases that may be missed by component-level handling.

---

## Summary
This project uses a React + Express architecture with clear separation of concerns on both frontend and backend. While the core structure is solid, improvements such as API standardization, shared request/response models, stricter CORS rules, and automated testing will significantly improve maintainability, security, and scalability.
