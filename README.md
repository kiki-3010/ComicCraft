# COMICCRAFT — AI-Powered Comic Creation Platform

![ComicCraft Banner](https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80)

> **"Turn Your Stories Into Comics."**
> A modern, futuristic digital comic creation studio built with React, Vite, Node.js, Express, and MongoDB.

---

## 🌟 Overview

**ComicCraft** empowers writers, digital artists, and storytellers to compose high-contrast, atmospheric digital comics without wrestling with complex graphic suites. Inspired by sci-fi, cyberpunk, and dark futuristic comic artwork, ComicCraft brings a responsive 3-column studio layout, authentic comic speech bubbles, narration caption boxes, sound effect stickers, and instant visual presets together into one unified platform.

---

## 🚀 Key Features

- **Futuristic Sci-Fi Visual Direction**:
  - High-contrast comic panels with black borders and glowing electric cyan (`#00BFFF`) and electric blue (`#0077FF`) accents.
  - Deep dark obsidian backgrounds (`#05070B`, `#0B1118`, `#111827`).
- **Complete Authentication & User Profiles**:
  - JWT (JSON Web Token) authentication with secure password hashing via `bcryptjs`.
  - Protected API routes and client-side navigation guards.
  - Profile customization: change name, avatar upload, and password update.
- **Studio Comic Editor**:
  - **Step 1 — Story Premise**: Title, description, genre selection, and cover image.
  - **Step 2 — Cast Characters**: Create heroes, cyborgs, AI entities, and villains with bios and custom avatars.
  - **Step 3 — 3-Column Studio Layout**:
    - **Left**: Panel sequence manager (add, duplicate, delete, reorder).
    - **Center**: Live interactive Comic Canvas with real-time speech bubbles and captions.
    - **Right**: Property inspector (speaking character, dialogue style, bubble positioning, narration, sound effects, file upload & preset picker).
  - **Step 4 — Preview & Publish**: Full vertical comic preview with one-click publishing.
- **Authentic Comic Elements**:
  - Pointy-tail speech bubbles, cloud thought bubbles, and jagged shout bubbles.
  - Cyberpunk narration boxes with cyan accent borders.
  - Comic sound effects (e.g. `BZZZT!`, `KRAAA-KOW!`, `VOOOOM!`) rendered with custom comic typography.
- **Asset Upload & Curated Presets**:
  - File upload engine with Multer (validates file types and sizes up to 10MB).
  - Built-in sci-fi preset library (Cyberpunk cities, futuristic command bridges, cosmic rifts, tech labs).
- **Responsive Comic Viewer**:
  - Vertical reader mode optimized for desktop, tablet, and mobile devices.
  - One-click print/export and shareable comic URLs.
- **Resilient Multi-Mode Database Layer**:
  - Connects to MongoDB via standard Mongoose.
  - Features an automated zero-downtime persistence engine so the application runs immediately without requiring manual MongoDB daemon setup.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18
- **Bundler & Tooling**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **Icons**: Lucide React
- **Typography**: Orbitron (Sci-Fi), Bangers (Comic Sound FX), Plus Jakarta Sans (UI)
- **Styling**: Modern CSS Design System with CSS variables and responsive grids

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB / Mongoose with resilient persistence adapter
- **Security**: JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), CORS
- **File Uploads**: Multer (disk storage with static serving)
- **Logging**: Morgan HTTP logger

---

## 📁 Project Structure

```
comic final/
├── client/
│   ├── src/
│   │   ├── assets/          # Static assets and icons
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ComicCard.jsx
│   │   │   ├── ComicPanel.jsx
│   │   │   ├── CharacterModal.jsx
│   │   │   ├── PresetModal.jsx
│   │   │   ├── SpeechBubble.jsx
│   │   │   ├── NarrationBox.jsx
│   │   │   ├── SoundFx.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/         # AuthContext & ToastContext
│   │   ├── hooks/           # useAuth & useToast hooks
│   │   ├── layouts/         # MainLayout with sticky navbar & footer
│   │   ├── pages/           # Application views
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── CreateComicPage.jsx
│   │   │   ├── MyComicsPage.jsx
│   │   │   ├── ComicViewerPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── services/
│   │   │   └── api.js       # Centralized API service with Axios interceptors
│   │   ├── App.jsx          # Route definitions & provider wrappers
│   │   ├── main.jsx         # React DOM entry point
│   │   └── index.css        # ComicCraft design system & global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   ├── db.js            # MongoDB / Mongoose connection handler
│   │   └── jsonStore.js     # Resilient zero-downtime persistent storage engine
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── comicController.js
│   │   ├── characterController.js
│   │   ├── panelController.js
│   │   └── profileController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Comic.js
│   │   ├── Character.js
│   │   └── Panel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── comicRoutes.js
│   │   ├── characterRoutes.js
│   │   ├── panelRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── aiRoutes.js
│   ├── services/
│   │   └── aiService.js
│   ├── utils/
│   │   └── jwtUtils.js
│   ├── uploads/             # Static storage for uploaded artwork
│   ├── .env
│   ├── server.js            # Express application entry point
│   └── package.json
│
├── .env.example
├── .gitignore
├── README.md
└── package.json             # Root orchestrator scripts
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `server/` directory (or use `.env.example` as a template):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/comiccraft
JWT_SECRET=comiccraft_super_secret_jwt_key_2026_xyz987
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

## 📦 Installation & Setup

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### 2. Install Dependencies
You can install dependencies for both the client and server using the root script:

```bash
npm run install:all
```

Or install them individually:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

## 🏃 Running the Application

### Option A: Run Both Simultaneously
Open two terminal windows:

**Terminal 1 (Backend API):**
```bash
cd server
npm start
# Server listens on http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
# Frontend live at http://localhost:5173
```

### Option B: Access the Web App
Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📡 REST API Reference

### Auth Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new creator account | No |
| `POST` | `/api/auth/login` | Log in and receive JWT token | No |
| `GET` | `/api/auth/me` | Fetch authenticated user details | Yes |

### Comic Routes (`/api/comics`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/comics` | Get all user comics (supports `search`, `genre`, `sort`) | Yes |
| `POST` | `/api/comics` | Create a new comic with panels and characters | Yes |
| `GET` | `/api/comics/:id` | Get single comic by ID (ownership enforced) | Yes |
| `PUT` | `/api/comics/:id` | Update comic metadata and panels | Yes |
| `DELETE` | `/api/comics/:id` | Delete comic and all associated panels | Yes |
| `POST` | `/api/comics/:id/panels` | Add a new panel to a comic | Yes |

### Panel Routes (`/api/panels`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `PUT` | `/api/panels/:id` | Update a panel's dialogue, style, position, or image | Yes |
| `DELETE` | `/api/panels/:id` | Delete a panel from a comic | Yes |

### Character Routes (`/api/characters`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/characters` | List all characters created by user | Yes |
| `POST` | `/api/characters` | Add a new character profile | Yes |
| `PUT` | `/api/characters/:id` | Update character details | Yes |
| `DELETE` | `/api/characters/:id` | Delete a character profile | Yes |

### Profile Routes (`/api/profile`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/profile` | Retrieve user profile & dashboard stats | Yes |
| `PUT` | `/api/profile` | Update user name, bio, and avatar image | Yes |
| `PUT` | `/api/profile/password` | Change user account password | Yes |

### Media & AI Routes
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/upload` | Upload image file (returns accessible static URL) | Yes |
| `GET` | `/api/ai/presets` | Get curated sci-fi background and character assets | Yes |
| `POST` | `/api/ai/suggest` | Generate AI story, scene, dialogue, and sound suggestions | Yes |

---

## 🧪 Testing Checklist & Verification

- [x] **Backend Server Running**: Listening on port `5000` with `/api/health` returning HTTP 200.
- [x] **Frontend Vite Running**: Live on port `5173` with fast HMR.
- [x] **Registration & Login**: JWT generated and verified; passwords hashed with bcrypt.
- [x] **Access Control**: Users can only read, edit, and delete their own comics.
- [x] **Comic Studio**: 4-step wizard with 3-column studio layout, panel duplication, and sound effects.
- [x] **Speech Bubbles**: Pointy tails, thought clouds, and shout bubble styles.
- [x] **Image Upload**: Uploads via Multer saved to disk and served statically via Express.
- [x] **Responsive UI**: Verified on desktop, tablet, and mobile breakpoints.

---

## 🔮 Future Enhancements

1. **Direct WebGL / Canvas Export**: Render comic book pages directly to high-resolution PDF or CBZ formats.
2. **Text-to-Image Generation**: Integrate Gemini or Stable Diffusion API for direct generative panel imagery.
3. **Collaborative Comic Rooms**: Multi-author real-time editing with WebSockets.
4. **Comic Community Marketplace**: Allow creators to publish comics to a public discovery feed.

---

## 📄 License
This project is licensed under the MIT License. Built with pride for ComicCraft creators.
