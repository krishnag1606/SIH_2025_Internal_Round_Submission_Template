# TeleMed - Rural Healthcare Platform

## Tasks Accomplished

* [x] **Multilingual support:** Implemented comprehensive UI and content translation support (i18n) with language switching for English, Hindi, and Punjabi across all client applications.
* [x] **Video calling:** Integrated real-time video calling between patient and doctor using WebRTC with Socket.IO signaling server for connection management.
* [x] **Real-time doctor schedule:** Implemented doctor availability system with live schedule updates and real-time booking status via WebSocket connections.
* [x] **Patient appointment booking:** Complete appointment creation, booking confirmation, and status management with calendar integration and availability checking.
* [x] **Authentication system:** Secure JWT-based authentication for both patients and doctors with phone number and password login.
* [x] **Offline-first design:** Implemented offline data sync capabilities with pending sync queues for rural connectivity scenarios.
* [x] **Cross-platform mobile apps:** Built separate React Native applications for patients and doctors with native mobile experience.
* [x] **Real-time messaging:** Socket.IO-based real-time communication system for instant notifications and call management.

## Technology Stack

This project leverages the following technologies:

* **[React Native](https://reactnative.dev):** Cross-platform mobile framework for building iOS and Android apps from a single codebase, chosen for rural accessibility across devices.
* **[Expo](https://expo.dev):** Development platform for React Native that simplifies mobile app development and deployment.
* **[Node.js](https://nodejs.org):** Server runtime for backend services, chosen for its excellent real-time capabilities with Socket.IO.
* **[Express.js](https://expressjs.com):** Lightweight web framework for REST APIs and middleware, providing fast and minimal server setup.
* **[Socket.IO](https://socket.io):** Real-time bidirectional communication library for video call signaling and live updates.
* **[PostgreSQL](https://www.postgresql.org):** Production-ready relational database for transactional data with excellent data integrity.
* **[Prisma](https://www.prisma.io):** Type-safe ORM for database operations with automated migrations and schema management.
* **[WebRTC](https://webrtc.org):** Peer-to-peer video calling technology for direct doctor-patient communication.
* **[Next.js](https://nextjs.org):** React framework for the web-based patient client with static export capabilities.
* **[Tailwind CSS](https://tailwindcss.com):** Utility-first CSS framework for rapid UI development and consistent design.
* **[Lucide React](https://lucide.dev):** Beautiful icon library providing consistent iconography across all platforms.

---

## Key Features

* **Video Consultations:** Direct video calls between doctors and patients with WebRTC technology
* **Multi-platform Access:** Native mobile apps for patients and doctors, plus web interface
* **Real-time Scheduling:** Live doctor availability with instant booking confirmation
* **Offline Capability:** Data sync queues for areas with poor connectivity
* **Multilingual Interface:** Support for English, Hindi, and Punjabi languages
* **Secure Authentication:** JWT-based auth with phone number verification
* **Medicine Finder:** Locate nearby pharmacies and check medicine availability
* **Health Records:** Digital patient cards with QR codes and consultation history
* **Emergency Features:** Quick access to emergency services and critical health information
* **Doctor Dashboard:** Comprehensive interface for managing patients, consultations, and prescriptions

---

## Local Setup Instructions

### Prerequisites

* Node.js (v18+ recommended) & npm
* PostgreSQL database
* For mobile development:
  * Android: Android Studio + SDK
  * iOS: Xcode (macOS only)
* Git

### 1. Clone the repository

```bash
git clone <repository-url>
cd telemedicine-platform
```

### 2. Environment Setup

Create `.env` files in the server directory:

```bash
# code/server/.env
DATABASE_URL="postgresql://username:password@localhost:5432/telemedicine"
JWT_SECRET="your-super-secret-jwt-key"
JWT_SECRET_DOCTOR="your-doctor-jwt-secret-key"
PORT=4000
```

### 3. Database Setup

```bash
cd code/server
npm install
npx prisma migrate deploy
npx prisma generate
```

### 4. Start the Backend Server

```bash
cd code/server
npm run dev
# Server will run on http://localhost:4000
```

### 5. Patient Mobile App (React Native)

```bash
cd code/client
npm install
# Start the development server
npm start
# For Android
npx expo run:android
# For iOS (macOS only)
npx expo run:ios
```

### 6. Doctor Mobile App (React Native)

```bash
cd code/doctor-client
npm install
# Start the development server
npm start
# For Android
npx expo run:android
# For iOS (macOS only)
npx expo run:ios
```

### 7. Web Patient Client (Next.js)

```bash
cd code/patient-client
npm install
npm run dev
# Web app will run on http://localhost:3000
```

### 8. Update API Endpoints

Update the `BASE_URL` in the following files to match your server:
- `code/client/lib/RouteProvider.ts`
- `code/doctor-client/lib/RouteProvider.ts`

Change from:
```typescript
export const BASE_URL = 'https://5b45f8364650.ngrok-free.app';
```

To:
```typescript
export const BASE_URL = 'http://localhost:4000';
```

---

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

* **Patient:** User profiles with health information
* **Doctor:** Healthcare provider profiles with specializations
* **Appointment:** Booking system with availability slots
* **DoctorAvailability:** Time slot management for doctors
* **Consultation:** Video call session records
* **Prescription:** Digital prescriptions and medication records

---

## Real-time Features

The application uses Socket.IO for real-time communication:

* **Video Call Signaling:** WebRTC peer connection establishment
* **Live Notifications:** Instant appointment updates and call requests
* **Online Status:** Real-time doctor and patient availability
* **Message Delivery:** Instant chat and prescription delivery

---

## Development Notes & Conventions

* **Code Organization:** Modular architecture with separate client apps for patients and doctors
* **State Management:** React Context API for global state across mobile apps
* **Styling:** Consistent design system using Tailwind CSS and custom StyleSheet components
* **Type Safety:** TypeScript throughout the codebase with Prisma-generated types
* **Internationalization:** Centralized translation files with language context providers
* **Offline Support:** AsyncStorage for local data persistence and sync queues

---

## API Endpoints

### Patient Routes
- `POST /patient/register` - Patient registration
- `POST /patient/login` - Patient authentication
- `GET /patient/me` - Get patient profile

### Doctor Routes
- `POST /doctor/register` - Doctor registration
- `POST /doctor/login` - Doctor authentication
- `GET /doctor/me` - Get doctor profile
- `GET /doctor/all` - List all doctors
- `POST /doctor/book` - Book appointment
- `GET /doctor/appointments/today` - Get today's appointments

---

## Troubleshooting

* **Database connection errors:** Ensure PostgreSQL is running and `DATABASE_URL` is correct. Check that the database exists and migrations have been applied.
* **Video call not connecting:** Verify that both Socket.IO server is running on port 4000 and WebRTC permissions are granted on mobile devices.
* **Mobile build errors:** For iOS, run `pod install` in the ios directory. For Android, ensure Android SDK is properly configured and emulator is running.
* **API connection issues:** Check that the `BASE_URL` in RouteProvider files matches your running server address and port.
* **Socket connection failures:** Ensure CORS is properly configured and no firewall is blocking WebSocket connections.

---

## TODOs / Suggested Improvements

* **Complete AI Integration:** Finish implementing the symptom checker with actual AI/ML models and LangChain integration
* **Push Notifications:** Add Firebase/APNs integration for appointment reminders and call notifications
* **Payment Integration:** Implement payment gateway for consultation fees and prescription orders
* **Advanced Video Features:** Add screen sharing, recording, and multi-participant calls
* **Prescription Management:** Complete the prescription workflow with pharmacy integration and delivery tracking
* **Analytics Dashboard:** Add comprehensive analytics for doctors and administrators
* **Automated Testing:** Implement E2E tests for critical user flows like appointment booking and video calls
* **Production Deployment:** Set up CI/CD pipeline with Docker containerization for AWS/cloud deployment

---

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Patient App   │    │   Doctor App    │    │   Web Client    │
│  (React Native) │    │  (React Native) │    │   (Next.js)     │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴─────────────┐
                    │     Backend Server        │
                    │   (Node.js + Express)     │
                    │     + Socket.IO           │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │     PostgreSQL DB         │
                    │    (Prisma ORM)           │
                    └───────────────────────────┘
```
