# Next.js SaaS Starter

A modern SaaS starter template built with Next.js, Better Auth, MongoDB Atlas, Google OAuth, and Razorpay. It provides a complete foundation for authentication, user management, and subscription-based payments.

---

## Features

- Email & Password Authentication
- Google OAuth Login
- Session Management
- Protected Routes
- MongoDB Atlas Integration
- Razorpay Payment Gateway Integration
- Subscription Management
- Premium Plan Upgrade Flow
- Responsive UI
- Toast Notifications
- Modern App Router Architecture

---

## Tech Stack

- Next.js
- React
- JavaScript
- Tailwind CSS
- Better Auth
- MongoDB Atlas
- Google OAuth
- Razorpay
- Sonner
- Vercel

---

## Project Structure

```bash
.
├── app
│   ├── api
│   │   ├── auth
│   │   │   └── [...all]
│   │   │       └── route.js
│   │   │
│   │   └── orders
│   │       ├── create-order
│   │       │   └── route.js
│   │       └── verify-order
│   │           └── route.js
│   │
│   ├── payments
│   │   └── page.jsx
│   │
│   ├── welcome
│   │   └── page.jsx
│   │
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js
│
├── components
│   ├── ui
│   └── login-form.jsx
│
├── hooks
│
├── lib
│   ├── auth-client.js
│   ├── auth.js
│   ├── db.js
│   ├── razorpay.js
│   └── utils.js
│
├── public
│
├── package.json
├── package-lock.json
└── README.md
```

---

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file in the root directory.

```env
# MongoDB
DATABASE_URL=

# Better Auth
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Public Razorpay Key
NEXT_PUBLIC_RAZORPAY_KEY_ID=
```

---

## Authentication

This project uses Better Auth for:

- User Registration
- User Login
- Google OAuth Authentication
- Session Management
- User Logout

Authentication state is available throughout the application using:

```js
useSession()
```

Server-side session validation is performed using:

```js
auth.api.getSession()
```

---

## Payments

Razorpay is used for handling premium subscriptions.

### Payment Flow

```text
User clicks Upgrade
        ↓
Create Razorpay Order
        ↓
Open Razorpay Checkout
        ↓
Payment Success
        ↓
Verify Signature
        ↓
Activate Subscription
        ↓
Store Subscription in MongoDB
```

---

## Database

MongoDB Atlas is used as the primary database.

### Better Auth Collections

Managed automatically:

- user
- session
- account
- verification

### Subscription Collection

Stores subscription information for premium users.

---

## Scripts

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

Run linting:

```bash
npm run lint
```

---

## Deployment

The project can be deployed on:

- Vercel
- Netlify
- AWS
- DigitalOcean

Make sure all environment variables are configured before deployment.

---

## Future Improvements

- Subscription Renewal
- Razorpay Webhooks
- Email Verification
- Password Reset
- Admin Dashboard
- Payment History
- Invoice Generation
- User Analytics
- Team Accounts

---


## Author

Built with Next.js, Better Auth, MongoDB Atlas, and Razorpay.