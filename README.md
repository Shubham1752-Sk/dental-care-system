# 🦷 Dental Center Management Dashboard

A responsive and fully functional Dental Center Management System built using **React**. This dashboard simulates the workflows of both **Admins (Dentists)** and **Patients** for appointment handling, patient records, and file uploads using only `localStorage`. This is a frontend-only project created as part of an SDE1 assessment for ENTNT.

## How to run

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

---

## 🚀 Features

### 👨‍⚕️ Admin (Dentist)
- Simulated login with hardcoded credentials
- Dashboard with KPIs (upcoming appointments, top patients, revenue, etc.)
- Full CRUD for patient management
- Appointment/incident management:
  - Add treatment details, cost, status
  - Upload treatment-related files (PDF/X-ray)
- Calendar view of appointments (Monthly/Weekly)

### 🧑‍💼 Patient
- Simulated login with limited access
- View own appointments and treatment history
- Preview invoices or uploaded files
- Read-only, secure role-based access

### 🔒 Authentication
- Simulated user login
- Session persisted via `localStorage`
- Role-based access control (Admin vs Patient)

### 🧠 Data Persistence
- All data saved to `localStorage` (no backend)
- File uploads saved as Base64/blob URLs

### 💅 UI & UX
- Responsive design (mobile-first)
- TailwindCSS-based styling
- Form validation & user feedback
- Clean, reusable component structure

---

## 📂 Project Structure

src/
├── components/ # Reusable components (Form, Modal, Table, etc.)
├── pages/ # Admin and Patient views
├── context/ # Auth and App Context
├── routes/ # Protected routes with React Router
├── utils/ # Helper functions (localStorage, validators)
├── assets/ # Icons and images
└── App.jsx # Main entry point

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.