# Employee Management System

A full-stack CRUD web application for managing employee records.

## Tech Stack

- **Frontend:** React + Vite, Bootstrap 5, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas (Mongoose)
- **Deployment:** Vercel

## Project Structure

```
├── backend/
│   ├── models/Employee.js
│   ├── routes/employees.js
│   ├── index.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/EmployeeModal.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
├── vercel.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the server:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies `/api` to `http://localhost:5000`.

## API Endpoints

| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| GET    | /api/employees        | Get all employees   |
| POST   | /api/employees        | Create employee     |
| PUT    | /api/employees/:id    | Update employee     |
| DELETE | /api/employees/:id    | Delete employee     |

## Deployment (Vercel)

1. Push source code to a public GitHub repository
2. Import the repository in Vercel
3. Add environment variable `MONGO_URI` in Vercel project settings
4. Deploy — Vercel will build the frontend and serve the backend as serverless functions
