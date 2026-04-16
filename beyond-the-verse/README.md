# Beyond the Verse

> A modern, feature-rich web platform built with React, Vite, Firebase, and Tailwind CSS.

---

## 🚀 Overview

**Beyond the Verse** is a dynamic web application designed to foster community, enable donations, manage exams, and provide a digital library—all in one place. Built for scalability and performance, it leverages the latest frontend technologies and cloud services.

---

## ✨ Features

- 🔒 Authentication (Firebase Auth)
- 🏠 Home, About, and Community Pages
- 📝 Community Posts & Comments
- 💸 Donation System with Payment Modal
- 📚 Digital Library with Uploads
- 🧑‍🎓 Exam Engine & Admin Editor
- 👤 User Profiles & Settings
- ⚙️ Admin Dashboard
- 🌐 Responsive UI with Tailwind CSS
- 🔔 Real-time Notifications (Firebase Messaging)

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite
- **Styling:** Tailwind CSS, PostCSS
- **Backend/Cloud:** Firebase (Auth, Firestore, Storage, Messaging)
- **Routing:** React Router DOM
- **State/Context:** React Context API
- **Other:** ESLint, gh-pages (for deployment)

---

## 📦 Folder Structure

```
beyond-the-verse/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, icons, etc.
│   ├── components/        # Reusable UI components
│   ├── context/           # React Context (Auth, etc.)
│   ├── pages/             # Page-level components
│   ├── services/          # Firebase and other services
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main App component
│   ├── firebase.js        # Firebase config
│   └── main.jsx           # Entry point
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rohantiwari123/beyondtheverse.git
cd beyondtheverse/beyond-the-verse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Update `src/firebase.js` with your Firebase project credentials if needed.

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or as specified by Vite).

---

## 🧩 Available Scripts

- `npm run dev`       – Start development server
- `npm run build`     – Build for production
- `npm run preview`   – Preview production build
- `npm run lint`      – Run ESLint
- `npm run deploy`    – Deploy to GitHub Pages

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📬 Contact

For questions, feedback, or support, please contact the maintainer:

- GitHub: [rohantiwari123](https://github.com/rohantiwari123)

---

> Made with ❤️ using React, Vite, and Firebase.
