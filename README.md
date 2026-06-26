# 📚 The Back Benchers

**A full-stack academic resource platform for MAKAUT engineering students — live in production.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-the--back--benchers.vercel.app-brightgreen?style=for-the-badge)](https://the-back-benchers.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

---

## 🌐 Live Demo

🔗 **[https://the-back-benchers.vercel.app](https://the-back-benchers.vercel.app)**

---

## 📌 About

The Back Benchers is a production-grade academic platform built for MAKAUT engineering students. It provides organized access to study materials across **5 departments**, **8 semesters**, and **4 resource types** — all managed through a custom-built admin panel.

---

## ✨ Features

- 📂 **Semester-wise Resources** — Notes, PYQs, Syllabus, and Organizers organized by department and semester
- 🔐 **Role-Based Authentication** — Secure admin/user access via NextAuth.js
- 🛠️ **Admin Panel** — Full CRUD for subjects, study materials (PDFs), and notice board with sidebar navigation
- ☁️ **Cloud PDF Storage** — PDFs uploaded and streamed via Cloudinary
- 🗄️ **Persistent Database** — MongoDB Atlas with case-insensitive filtering across department, semester, and subject
- 🚀 **Zero-Downtime Deployment** — Deployed on Vercel with environment variable management; resolved a production MongoDB Atlas auth issue live
- 📱 **Fully Responsive** — Mobile-first UI with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | MongoDB Atlas |
| Auth | NextAuth.js (role-based) |
| File Storage | Cloudinary (PDFs) |
| Deployment | Vercel |

---

## 🏗️ Project Structure

```
the-back-benchers/
├── app/               # Next.js App Router (pages & API routes)
├── components/        # Reusable UI components
├── lib/               # DB connection, utilities
├── models/            # MongoDB Mongoose models
└── public/            # Static assets
```

---

## 🚀 Getting Started (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/avijitdas-code/the-back-benchers.git

# 2. Navigate to the project
cd the-back-benchers

# 3. Install dependencies
npm install

# 4. Set up environment variables
# Create a .env.local file with:
# MONGODB_URI=your_mongodb_atlas_uri
# NEXTAUTH_SECRET=your_secret
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📸 Screenshots

> _Add a screenshot of the homepage and admin panel here._
> Tip: `![Homepage](public/screenshots/homepage.png)`

---

## 👨‍💻 Author

**Avijit Das** — Full-Stack Developer · MERN · Next.js

- 🌐 Portfolio: [avijit-das-portfolio.vercel.app](https://avijit-das-portfolio.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/avijit-das-320200284](https://www.linkedin.com/in/avijit-das-320200284)
- 🐙 GitHub: [github.com/avijitdas-code](https://github.com/avijitdas-code)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
