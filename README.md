# 🌱 Mentorship Matching Platform

A full-stack web application that enables incubators, accelerators, or organizations to match mentors with mentees. It supports user registration, role-based access, mentor discovery, session scheduling, feedback, and admin management.

---

## 🚀 Features

### 👥 User Roles
- **Admin**: Manage users, sessions, and mentorship requests
- **Mentor**: Set availability, accept mentees, and hold sessions
- **Mentee**: Browse mentors, send requests, and book sessions

### 🔐 Authentication
- Email & password login
- JWT-based authorization
- Role-based route protection

### 🧑‍🏫 Mentor Discovery
- Filter mentors by skills and industry
- Request mentorship
- Real-time request status

### 🗓️ Sessions
- Mentors define availability blocks
- Mentees book sessions post-approval
- Feedback system with rating and comments

### 🧑‍💼 Admin Dashboard
- View users, sessions, and requests
- Change user roles
- Access platform insights

---

## 🛠 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Zustand** (global state)
- **Axios**, **js-cookie**, **jwt-decode**

### Backend
- **Node.js**, **Express**, **TypeScript**
- **MongoDB** with **Mongoose**
- **JWT Auth**, **Bcrypt**, **Dotenv**
- RESTful API structure

---

## 🌍 Deployment

| Layer     | Platform | URL                        |
|-----------|----------|----------------------------|
| Backend   | Railway  | `https://your-backend-url` |
| Frontend  | Vercel   | `https://your-app-url`     |
| Database  | MongoDB Atlas | Cloud-based MongoDB    |

---

## 📁 Folder Structure

### Backend (`/mentorship-backend`)
