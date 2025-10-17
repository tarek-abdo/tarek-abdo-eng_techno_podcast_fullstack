# 🎧 Podcaster – Full Stack Podcast Web App

**Podcaster** is a full-stack web application that allows users to browse, play, and manage podcast episodes.  
It features a modern UI built with **Next.js** and a backend powered by **Express.js**, **MongoDB**, and **Cloudinary** for audio and image storage.

**Live Demo:** [https://podcaster-qvtr.vercel.app/](https://podcaster-qvtr.vercel.app/)


## 🚀 Project Overview
Podcaster enables users to:
- View the latest and all podcast episodes.
- Stream audio directly from the browser.
- View detailed pages for each podcast.
- Store and retrieve podcasts from MongoDB.

## 🛠️ Tech Stack

### **Frontend**
- [Next.js 15]
- TypeScript
- React 19 (App Router)
- Tailwind CSS
- Cloudinary (for image/audio storage)
- Deployed on (https://podcaster-qvtr.vercel.app/)

### **Backend**
- Node.js & Express.js
- MongoDB with Prisma ORM
- Cloudinary SDK

## ⚙️ Setup Instructions

### **1. Clone the Repository**
bash
git clone (https://github.com/yourusername/podcaster.git](https://github.com/tarek-abdo/tarek-abdo-eng_techno_podcast_fullstack.git)
cd podcaster

### **2. Install Dependencies**

#### Frontend
bash
cd client
npm install

#### Backend
bash
cd server
npm install

## 🔐 Environment Variables

### **Frontend (`.env.local`)**
env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

## 🧩 Available Scripts

### **Frontend**

| Command         | Description                               |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Runs the Next.js app in development mode. |
| `npm run build` | Builds the app for production.            |
| `npm start`     | Starts the built app.                     |

### **Backend**

| Command               | Description                                            |
| --------------------- | ------------------------------------------------------ |
| `npm run dev`         | Starts the Express server with nodemon for hot reload. |
| `npm run start`       | Starts the production server.                          |
| `npx prisma generate` | Regenerates Prisma client.                             |
| `npx prisma db push`  | Pushes Prisma schema to MongoDB.                       |
| `npm run seed`        | Seeds initial podcast data.                            |

---

## 🧠 API Endpoints

### **Base URL**
local
http://localhost:5000/api


### **Routes**

| Method   | Endpoint        | Description                                       |
| -------- | --------------- | ------------------------------------------------- |
| **GET**  | `/podcasts`     | Fetch all podcasts.                               |
| **GET**  | `/podcasts/:id` | Fetch a podcast by ID.                            |

## 🧱 Folder Structure
podcaster/
├── client/               # Next.js frontend
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable UI components
│   └── lib/              # Types, helpers
│
├── server/               # Express backend
│   ├── prisma/           # Prisma schema & seed script
│   ├── src/
│   │   ├── controllers/  # API logic
│   │   ├── routes/       # Express routes
│   │   └── index.ts      # Server entry point
│   └── data/             # Seed/fallback JSON data
│
└── README.md

## 🚀 Deployment
### **Frontend (Vercel)**

1. Push your code to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/).
3. Import your GitHub repo.
4. Add environment variables:
   * `NEXT_PUBLIC_API_URL=https://your-backend-url/api`
5. Deploy!

## 💡 Notes
* The app automatically falls back to local seed data (`seed-podcasts.json`) if the database connection fails.

## 📸 Screenshots
* Home page
<img width="1916" height="1021" alt="image" src="https://github.com/user-attachments/assets/ead48173-1910-4662-b6be-e8a4f3404853" />

* Podcast details page
  <img width="1919" height="1023" alt="image" src="https://github.com/user-attachments/assets/3d3429eb-8c1f-4263-a673-69e5e36ecab3" />

## 🧑‍💻 Author

**Tarek Abdelnaby**
📧 Email: tabdelnaby06@gmail.com
🌐 Portfolio: https://tarek-abdo-portfolio.netlify.app/



