# 🎓 JoinEazy – Assignment Management Portal

**JoinEazy** is a React-based Assignment Management Portal designed to simplify the process of creating, assigning, and tracking student assignments.

The platform provides separate dashboards for Admins and Students, allowing faculty to manage assignments while students can view their assigned tasks and track their submission progress.

---

## ✨ Features

### 👨‍💻 Admin Dashboard
- Create new assignments with title, description, and due date.
- Assign tasks to individual students or all students.
- Add Google Drive links to assignments.
- Edit existing assignments.
- Delete assignments with confirmation.
- Monitor total assignments, submissions, and pending work.
- Track submission progress through dynamic progress bars.

### 👨‍🎓 Student Dashboard
- View assigned assignments.
- Check assignment descriptions and due dates.
- Open assignment resources through Google Drive links.
- Submit assignments.
- Track completed and pending assignments.
- Monitor overall completion percentage.

### 🎨 Additional Features
- Light and Dark Mode.
- Responsive design for different screen sizes.
- LocalStorage for saving assignments and user session data.
- Toast notifications for successful actions.
- Role-based demo login (Admin / Student).
- React Router navigation.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic |
| Tailwind CSS v4 | Styling and responsive UI |
| React Router DOM | Page navigation |
| React Toastify | Notifications |
| LocalStorage | Client-side data persistence |

---

## 📂 Project Structure

```text
JoinEazy/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── AssignmentCard.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── StatCard.jsx
│   │
│   ├── Data/
│   │   ├── dummyData.js
│   │   └── students.js
│   │
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── StudentDashboard.jsx
│   │   └── Login.jsx
│   │
│   ├── Toast/
│   │   └── Toast.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── index.css
│
├── package.json
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to run JoinEazy locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/JoinEazy.git
```

### 2. Navigate to the Project Folder

```bash
cd JoinEazy
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access JoinEazy.

---

## 💾 Data Storage

JoinEazy currently uses the browser's **LocalStorage** to store:

- Assignment details.
- Student assignment data.
- Current login information.
- Selected theme preference.

No backend or database is currently required.

> **Note:** This is a frontend demonstration project. Login is a demo role selector, not secure authentication. LocalStorage data is stored in the current browser and is not shared between different users or devices.

---



## 👨‍💻 Author

**Kartik saini**

---

⭐ If you like this project, consider giving it a star!

**Built with ❤️ using React and Tailwind CSS.**
