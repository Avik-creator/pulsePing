# PulsePing Frontend

This is the frontend for PulsePing, a server monitoring and notification platform. Built with Next.js, React, Tailwind CSS, shadcn/ui, and Next Auth.

---

## Features

- **Google OAuth Authentication**  
  Secure login using Google accounts.

- **Dashboard**  
  View and manage monitored servers, logs, and notifications.

- **Add/Remove Monitored URLs**  
  Easily add or remove servers to monitor.

- **Responsive UI**  
  Modern design using Tailwind CSS and shadcn/ui.

- **Email Notifications**  
  Get notified when your servers go down.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** React, Tailwind CSS, shadcn/ui
- **Auth:** Next Auth (Google)
- **State:** React Query
- **Validation:** Zod

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Backend running (see pulse-backend)

---

### 1. Install Dependencies

```sh
npm install
```

---

### 2. Configure Environment Variables

Create a `.env` file in `pulse-frontend/`:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
BACKEND_URL=http://localhost:8000
```

---

### 3. Run the Development Server

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- **Sign in** with Google.
- **Add a server URL** to monitor.
- **View logs** and status on your dashboard.
- **Receive email notifications** if your server goes down.

---

## Project Structure

```
pulse-frontend/
  src/
    app/
    components/
    lib/
    types/
    actions/
  public/
  ...
```

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Next Auth](https://next-auth.js.org/)

---

## License

MIT

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
