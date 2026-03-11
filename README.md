# CourseVisa

A full-stack, enterprise-grade e-learning platform built with React, TypeScript, Node.js, Express, and MongoDB. CourseVisa provides a complete learning ecosystem with role-based dashboards for students, mentors, and administrators, along with course and book catalogs, Google OAuth authentication, and Razorpay payment integration.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Payment Integration](#payment-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Features

### For Students
- Browse and search a full course catalog with filtering by category, price, and difficulty
- Access a curated books catalog with advanced search and pagination
- Multi-step checkout flow powered by Razorpay (UPI, Credit Card, Net Banking)
- Personal student dashboard showing enrolled courses and learning progress
- Profile settings with Cloudinary avatar upload
- Google OAuth single sign-on

### For Mentors
- Dedicated mentor dashboard with course management
- Earnings and analytics overview
- Mentor application portal for aspiring instructors

### For Administrators
- Admin portal with a full user directory (activate or suspend accounts)
- Course catalog management with delete capability
- Mentor application review queue
- Full role-based access control with JWT middleware

### Platform-Wide
- Three-theme support: Light, Dark, and Corporate, using DaisyUI semantic tokens
- Animated particle background and click-spark effects via React Bits
- Responsive design across all breakpoints
- Protected routes with automatic redirect for unauthorized access

---

## Technology Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework and type safety |
| Vite | Build tool and development server |
| Tailwind CSS v4 + DaisyUI | Utility-first styling and component library |
| React Router v6 | Client-side routing |
| @react-oauth/google | Google OAuth 2.0 integration |
| Lucide React | Icon library |
| Cloudinary Upload Widget | Avatar and media uploads |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JSON Web Tokens | Stateless authentication |
| bcryptjs | Password hashing |
| google-auth-library | Server-side Google token verification |
| Razorpay | Payment order creation and signature verification |
| Helmet | HTTP security headers |
| CORS | Cross-origin request handling |
| dotenv | Environment variable management |
| Nodemon | Development hot-reload |

---

## Project Structure

```
CourseVisa/
├── backend/                    # Express API server
│   ├── src/
│   │   ├── controllers/        # Route handler logic
│   │   │   ├── auth.js         # Register, login, Google OAuth
│   │   │   ├── admin.js        # User and course management
│   │   │   ├── courses.js      # Course CRUD
│   │   │   ├── mentor.js       # Mentor application
│   │   │   ├── books.js        # Books catalog
│   │   │   └── payment.js      # Razorpay order and verification
│   │   ├── models/             # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   ├── Book.js
│   │   │   └── Application.js
│   │   ├── routes/             # Express route definitions
│   │   ├── middleware/
│   │   │   └── auth.js         # JWT protect and role authorize
│   │   └── index.js            # Server entry point
│   ├── seedBooks.js            # Data seeder for book catalog
│   └── .env                    # Backend environment variables (not committed)
│
├── src/                        # React frontend
│   ├── components/
│   │   ├── auth/               # LoginForm, SignupForm, ProtectedRoute
│   │   ├── shared/             # Card, Button, Input, Navbar, Footer, Badge
│   │   └── animations/         # ParticlesBackground, ClickSpark
│   ├── context/
│   │   ├── AuthContext.tsx     # Auth state, login, signup, googleLogin
│   │   ├── CartContext.tsx      # Shopping cart state
│   │   └── ThemeContext.tsx    # DaisyUI theme switching
│   ├── hooks/                  # useAuth, useCart, useFormValidation
│   ├── pages/                  # Route-level page components
│   ├── services/
│   │   └── api.ts              # Typed API client wrappers
│   ├── styles/                 # Global CSS and CSS variable definitions
│   └── types/                  # Shared TypeScript interfaces
│
├── index.html                  # App entry with SDK scripts
├── vite.config.ts              # Vite config with proxy to backend
├── .env                        # Frontend environment variables (not committed)
└── .env.example                # Example frontend environment variable keys
```

---

## Prerequisites

- Node.js 18 or later
- npm 9 or later
- A MongoDB Atlas cluster (or local MongoDB instance)
- A Google Cloud project with OAuth 2.0 credentials configured

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/garvitmh/CourseVisa.git
cd CourseVisa
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory for the frontend:

```bash
cp .env.example .env
```

Then fill in the required values (see [Environment Variables](#environment-variables) below).

Create a `.env` file inside the `backend/` directory:

```bash
cp backend/.env.example backend/.env
```

### 5. Run the Development Servers

Open two terminal windows.

**Terminal 1 — Frontend:**
```bash
npm run dev
```

**Terminal 2 — Backend:**
```bash
cd backend
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:5000`.

---

## Environment Variables

### Frontend (`/.env`)

```env
VITE_APP_NAME=CourseVisa
VITE_API_URL=/api/v1
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

### Backend (`/backend/.env`)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/coursevisa
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

---

## Available Scripts

### Frontend

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server on port 5173 |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on the source files |

### Backend

| Script | Description |
|---|---|
| `npm run dev` | Start the backend with Nodemon (auto-restart on file changes) |
| `npm start` | Start the backend without Nodemon (for production) |

---

## API Reference

All API routes are prefixed with `/api/v1`.

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register a new user |
| POST | `/auth/login` | Public | Login with email and password |
| POST | `/auth/google` | Public | Login or register with a Google OAuth access token |
| GET | `/auth/me` | Private | Get the currently authenticated user |

### Courses

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/courses` | Public | Get all courses |
| GET | `/courses/:id` | Public | Get a single course by ID |

### Books

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/books` | Public | Get all books |
| GET | `/books/:id` | Public | Get a single book by ID |

### Admin

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/admin/users` | Admin | Get all users |
| PUT | `/admin/users/:id/status` | Admin | Activate or suspend a user |
| GET | `/admin/courses` | Admin | Get all courses with stats |
| DELETE | `/admin/courses/:id` | Admin | Delete a course |
| GET | `/admin/applications` | Admin | Get mentor applications |

### Payment

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/payment/create-order` | Private | Create a Razorpay payment order |
| POST | `/payment/verify` | Private | Verify a Razorpay payment signature |

### Mentor

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/mentor/apply` | Private | Submit a mentor application |

---

## Authentication

CourseVisa uses a JWT-based stateless authentication system.

- On successful login or registration, the server returns a signed JWT.
- The frontend stores the token in `localStorage` and attaches it as a `Bearer` token in the `Authorization` header for all protected API requests.
- The `protect` middleware on the backend verifies the token on every protected route.
- The `authorize(...roles)` middleware restricts access to specific roles (e.g., `admin`).

### Google OAuth Flow

1. The user clicks "Continue with Google" on the login or signup page.
2. The `@react-oauth/google` library opens a Google account picker popup.
3. After the user selects an account, Google returns an OAuth2 access token to the frontend.
4. The frontend sends this access token to `POST /api/v1/auth/google`.
5. The backend calls Google's `/oauth2/v3/userinfo` endpoint to verify the token and retrieve the user's name and email.
6. If no account exists for that email, a new student account is created automatically.
7. A JWT is issued and returned to the frontend, completing the sign-in.

> Note: While the Google Cloud project is in Testing mode, only email addresses added as test users in the OAuth consent screen will be able to sign in. Publish the app in the Google Cloud Console to allow any Google account.

---

## Payment Integration

CourseVisa uses Razorpay for payments, which fully supports Indian payment methods including UPI, credit and debit cards, net banking, and wallets.

1. The user proceeds to checkout and fills in billing details.
2. The frontend calls `POST /api/v1/payment/create-order` to create a server-side Razorpay order.
3. The Razorpay checkout popup opens on the frontend using the `window.Razorpay` SDK loaded from `checkout.razorpay.com`.
4. After the user completes payment, Razorpay sends back a payment ID and a signature.
5. The frontend sends these to `POST /api/v1/payment/verify`, which validates the HMAC-SHA256 signature server-side.
6. On successful verification, the cart is cleared and the user is redirected to the order confirmation page.

> If Razorpay keys are not configured in `.env`, the backend returns a mock order and skips the popup, allowing end-to-end testing of the checkout flow without a Razorpay account.

---

## Deployment

### Frontend (Vercel)

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Set the root directory to the project root.
4. Add all `VITE_*` environment variables in the Vercel project settings.
5. Set the build command to `npm run build` and the output directory to `dist`.

### Backend (Render or Railway)

1. Create a new Web Service pointing to the `backend/` folder.
2. Set the start command to `node src/index.js`.
3. Add all backend environment variables in the service settings.
4. Update the `CORS` origin in `backend/src/index.js` to point to your production frontend URL.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes with a clear message: `git commit -m "feat: add your feature description"`
4. Push to your fork and open a pull request.

Please follow the conventional commits format: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.

---

## License

This project is licensed under the MIT License.
