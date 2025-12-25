# NeuroFit 🧠💪

**Personalized fitness planning with real-time workout tracking**

## Overview

**NeuroFit** is a web-based fitness platform that helps users improve their health through **personalized meal and workout plans** combined with a **real-time workout tracker** that provides rep counting and posture feedback using computer vision.

The app is built for users who want structured fitness guidance without expensive gym memberships, complex onboarding, or external devices — everything runs directly in the browser.

🔗 **Live Demo:** https://myneurofit.vercel.app

---

## Features

### 🧩 Personalized Meal & Workout Planning

- AI-assisted meal and workout plans
- Personalization based on:
  - Age, gender, height, weight
  - Activity level and fitness goals
  - Diet preferences and allergies
- Optional onboarding flow — users can skip onboarding and use predefined plans

### 🎥 Real-Time Workout Tracking

- Webcam-based exercise tracking
- Supported exercises:
  - Bicep curls
  - Squats
  - Shoulder press
- Capabilities:
  - Real-time rep counting
  - Basic posture correction feedback
- Built using computer vision (MediaPipe-based pipeline)

> ⚠️ The workout tracker is under active development and currently focuses on limited exercises with basic feedback.

### 🤖 AI-Powered Guidance

- AI-generated meal and workout plans
- Integrated chatbot for fitness-related guidance
- Hybrid approach using rule-based logic combined with LLM outputs
- Groq used for fast plan generation and chatbot responses

### 🔐 Authentication & Data Persistence

- JWT-based authentication (access tokens)
- Secure password handling with bcrypt
- Persisted user data includes:
  - Profile information
  - Meal logs
  - Workout logs
  - Generated meal and workout plans

---

## Tech Stack

### Frontend

- React + TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Router (file-based routing & layouts)
- Framer Motion
- Axios

### Backend

- Node.js + Express (TypeScript)
- Zod for schema validation
- Prisma ORM
- JWT authentication
- bcrypt, cors

### ML / Computer Vision

- MediaPipe for pose detection
- Custom workout tracking model (collaborative contribution)

### Database

- PostgreSQL  
  Chosen for structured relational data and long-term scalability.

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: Render (PostgreSQL)

---

## Architecture

- Separate frontend and backend codebases
- Modular and scalable structure
- Clear separation of concerns:
  - API layer
  - Authentication layer
  - Validation layer
  - Database access via Prisma
- Two backend services:
  - Node.js + Express API (core application, auth, data)
  - FastAPI service for AI and workout tracking logic


### Design Decisions

- TanStack Router for file-based routing with layout support
- Zod for runtime-safe validation
- shadcn/ui for composable and customizable UI components

---

## Local Setup

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- Environment variables configured

### Client

```bash
npm install
npm run dev
```

### Server

```bash
npm install
npm run dev
```

### Bot Server (AI & Workout Tracking Service)

```bash
pip install -r requirements.txt
python botapp.py
```

### Environment Variables

Both backend services require `.env` files with:

- Database connection URL
- JWT secret
- Groq API key (for AI features)
- env.example files are provided in the respective folders.

> ⚠️ The backend will fail to start if the database is not connected or environment variables are missing.

---

## Current Limitations

- Workout tracker supports a limited number of exercises
- Tracker feedback is basic and actively improving
- Chat history persistence is not yet implemented
- Authentication currently uses access tokens only (no refresh tokens)

---

## Roadmap

Planned improvements:

- Enhance workout tracker UI and feedback accuracy
- Implement stronger authentication (refresh tokens, improved security)
- Persist AI chat history and improve chat UI/UX

---

## Contribution

Contributions are welcome.  
If you are interested in improving the workout tracker, UI/UX, or backend reliability, feel free to open an issue or submit a pull request.

---

## Credits

- All frontend development, backend APIs, authentication, database design, and deployment were built and maintained by **Mayank Singla**
- Workout tracking model and AI powered meal and workout plans implemented with collaborative contribution by **Jayant Bisht**

---

## Why NeuroFit

NeuroFit was built to make structured fitness guidance accessible to people who:

- Cannot afford expensive gym memberships
- Prefer working out privately due to anxiety
- Want a single platform instead of juggling multiple fitness apps

This project reflects real-world engineering tradeoffs, scalable architecture, and continuous iteration — not just a demo.
