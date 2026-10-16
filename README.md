# 📄 ResumeCraft AI — Smart Resume Builder

A modern resume-building web application designed to help users create, customize, preview, and export professional resumes with ease.

Built using React, TypeScript, and Firebase, the project focuses on making resume creation simple, accessible, and convenient for students, fresh graduates, and job seekers.

## ✨ Features

- **Easy Resume Creation:** Enter and organize your professional information in a structured format.
- **Editable Resume Details:** Customize your resume information to reflect your skills, education, projects, and experience.
- **Resume Preview:** Review your resume before exporting it.
- **PDF Export:** Generate a downloadable resume using PDF-generation tools.
- **Firebase Integration:** Uses Firebase-related configuration for application services.
- **Modern UI:** A responsive interface with reusable components and smooth animations.
- **Interactive Experience:** Icons, animations, and visual elements improve usability.

> Features may depend on the current implementation and configuration of the application.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Building the user interface |
| TypeScript | Type-safe development |
| Vite | Development server and build tooling |
| Tailwind CSS | Styling and responsive layouts |
| Firebase | Application service integration |
| jsPDF | PDF generation |
| html2canvas | Capturing HTML content for export |
| Framer Motion | UI animations |
| Lucide React | Icons |
| QRCode | QR code generation |

## 📂 Project Structure

```text
resumebuilder/
├── src/                 # Application source code
├── public/              # Static assets
├── .env.example         # Environment configuration template
├── .firebaserc          # Firebase project configuration
├── firebase.json        # Firebase Hosting configuration
├── firestore.rules      # Firestore security rules
├── index.html           # Main HTML entry point
├── package.json         # Dependencies and scripts
├── package-lock.json    # Dependency lock file
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md            # Project documentation
```

## ⚙️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- A Firebase project if you need Firebase-connected functionality

### 1. Clone the repository

```bash
git clone https://github.com/teja3856/resumebuilder.git
```

### 2. Navigate to the project

```bash
cd resumebuilder
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory using `.env.example` as the template.

Add your Firebase web application configuration:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Replace the example values with the appropriate configuration from your Firebase project.

**Important:** Never commit private credentials or service-account keys. Firebase web configuration values are not substitutes for proper security rules and access controls.

### 5. Run the development server

```bash
npm run dev
```

Open the local URL displayed in the terminal.

### 6. Build for production

```bash
npm run build
```

This runs TypeScript checks and creates an optimized production build in the `dist/` directory.

### 7. Preview the production build

```bash
npm run preview
```

## 🎯 Project Objectives

- Simplify the process of creating professional resumes.
- Provide an organized way to present education, skills, projects, and experience.
- Make resume customization convenient.
- Support digital resume export.
- Build a modern web application using current frontend technologies.

## 🔮 Future Enhancements

- AI-powered resume content suggestions.
- Job-description-based resume improvement.
- ATS-friendly resume analysis.
- Additional professional resume templates.
- Improved suggestions for incomplete resume sections.
- More customization options for layout, typography, and colors.
- Enhanced accessibility and mobile responsiveness.

## 👨‍💻 About the Developer

Developed by **Teja Santosh**, a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning.

I enjoy building practical web applications, exploring AI-powered tools, and developing software that solves real-world problems.

## 🤝 Connect

- **GitHub:** [@teja3856](https://github.com/teja3856)
- **Repository:** [Resume Builder](https://github.com/teja3856/resumebuilder)

## 📄 License

No license is currently specified in this repository. Please contact the repository owner for permission before redistributing or reusing the source code.

---

⭐ If you find this project interesting, explore the repository and follow its development.
