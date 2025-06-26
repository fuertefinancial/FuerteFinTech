# Fuerte Financial Technologies - Website

## 🚀 Overview

This repository contains the source code for the official website of Fuerte Financial Technologies. The project is a state-of-the-art digital presence built with a modern, high-performance tech stack. It showcases the firm's identity at the intersection of finance and artificial intelligence, featuring a public-facing marketing site and a secure portal for investors. The core narrative, **"Harnessing Chaos, Engineering Alpha,"** is woven throughout the user experience, from the interactive 3D hero section to the AI-powered user engagement tools.

---

## 🛠️ Technology Stack

This project leverages a powerful and modern technology stack designed for performance, scalability, and an exceptional developer experience.

| Category                | Technology                               | Purpose                                                       |
| ----------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| **Frontend Framework**  | [Next.js](https://nextjs.org/) 14 (React 18) | Static Site Generation (SSG), performance, and SEO.           |
| **3D Graphics**         | [Three.js](https://threejs.org/) & [R3F](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) | Hardware-accelerated 3D visualizations and the main hero scene. |
| **Animation**           | [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/) | Sophisticated scroll-driven narratives and fluid UI animations. |
| **Data Visualization**  | [D3.js](https://d3js.org/)               | Bespoke, interactive data visualizations for financial data.  |
| **Styling**             | CSS Modules & `*.module.css`             | Locally scoped, conflict-free component styling.              |
| **Language**            | [TypeScript](https://www.typescriptlang.org/) | Type safety, enhanced developer experience, and scalability.  |
| **Headless CMS**        | [Contentful](https://www.contentful.com/) (Simulated) | Decoupled content management for insights and articles.       |
| **Authentication**      | [NextAuth.js](httpss://next-auth.js.org/) (Simulated) | Secure, session-based authentication for the investor portal. |
| **Deployment**          | GitHub Pages                             | CI/CD via GitHub Actions for automated static site deployment.  |

---

## 📂 Project Structure

The codebase is organized logically to separate concerns and promote maintainability. Here is a high-level overview of the key directories:

```
FuerteFinTech/
├── .github/workflows/       # CI/CD pipeline for deployment
├── docs/                    # High-level documentation (vision, IA, design)
├── pages/                   # Next.js page routes
│   ├── api/                 # API routes (simulated)
│   ├── insights/            # Insights portal pages
│   ├── investors/           # Secure investor portal pages
│   └── ...                  # Other top-level pages
├── public/                  # Static assets (images, videos, fonts)
├── src/
│   ├── components/          # Reusable React components, organized by feature
│   │   ├── ai/              # AI-powered components (search, chat, recommendations)
│   │   ├── hero/            # Components for the WebGL hero section
│   │   ├── navigation/      # Main navigation, living logo, mobile nav
│   │   ├── portal/          # Components for the secure investor portal
│   │   ├── ui/              # Generic UI elements (Button, FormInput)
│   │   └── ...              # Other feature-specific components
│   ├── hooks/               # Custom React hooks (e.g., useAISearch, useDeviceCapabilities)
│   ├── lib/                 # Library functions, Contentful client
│   ├── styles/              # Global and shared styles
│   └── types/               # TypeScript type definitions
├── styles/                  # Legacy global styles
├── next.config.js           # Next.js configuration for static export
├── package.json             # Project dependencies and scripts
└── tsconfig.json            # TypeScript compiler options
```

---

## ⚙️ Getting Started

Follow these instructions to get the project running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or later)
- [npm](https://www.npmjs.com/) (v9.x or later) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/[YourUsername]/FuerteFinTech.git
    cd FuerteFinTech
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

To start the local development server, run the following command:

```bash
npm run dev
```

This will start the application in development mode with hot-reloading. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for Production

To create a production-ready build, run:

```bash
npm run build
```

This command performs a static export of the site, generating the final HTML, CSS, and JavaScript files in the `out/` directory, ready for deployment.

---

## ✨ Core Features & Components Deep Dive

### 1. The Interactive 3D Hero (`src/components/hero/`)

The hero section is the centerpiece of the public-facing site, providing a visual metaphor for the company's narrative.

-   **`FuerteEngine.tsx`**: The main orchestrator for the Three.js scene. It manages the camera, lighting, and coordinates the animations of its children.
-   **`ChaosParticles.tsx`**: A particle system representing market chaos. It uses a custom vertex shader with Perlin noise to create organic, unpredictable movement.
-   **`ProcessedParticles.tsx`**: A second particle system representing "alpha." Particles transition from the chaos system to this system, forming an ordered, crystalline structure.
-   **Animation**: The entire sequence is driven by the user's scroll position, managed by GSAP's ScrollTrigger, creating a cinematic narrative experience.

### 2. The Investor Portal (`pages/investors/` & `src/components/portal/`)

A secure, data-focused area for qualified investors, with a design inspired by Bloomberg Terminals.

-   **`PortalLayout.tsx`**: A higher-order component that wraps all investor pages, enforcing authentication and providing a consistent sidebar navigation and layout.
-   **`dashboard.tsx`**: The main landing page for investors, featuring a grid of widgets.
-   **Widgets (`PerformanceWidget.tsx`, `AccountSummary.tsx`, etc.)**: Modular, reusable components that display key financial data.
-   **Security**: Authentication is simulated via `sessionStorage`. In a production environment, this would be replaced with a robust NextAuth.js implementation.

### 3. AI-Powered User Engagement (`src/components/ai/` & `src/hooks/useAISearch.ts`)

To demonstrate Fuerte's AI competency, several AI-powered features are integrated into the site. The backend logic is currently simulated to allow for front-end development and will be connected to real AI APIs.

-   **`AISearchBar.tsx`**: Replaces a standard keyword search on the `/insights` page. It simulates understanding natural language queries to provide semantically relevant results. The core logic is abstracted into the `useAISearch` hook.
-   **`AIChatbot.tsx`**: A sophisticated chatbot available on the contact page and for logged-in investors. It has a simulated knowledge base to answer complex, context-aware questions about the firm's funds and policies.
-   **`AIRecommendations.tsx`**: On the investor dashboard, this component analyzes a user's (mocked) portfolio and viewing habits to recommend relevant articles and insights, demonstrating personalization.

### 4. Scroll-Driven Philosophy Page (`pages/philosophy.tsx`)

This page uses GSAP's ScrollTrigger to create a "scrollytelling" experience. As the user scrolls, different sections of text pin in place while the accompanying visualizations animate, creating a rich, narrative-driven flow.

-   **Component Structure**: The page is built from a series of components (`DataDeluge.tsx`, `SignalFromNoise.tsx`, etc.), each representing a key part of the firm's investment philosophy.
-   **Animation Orchestration**: The main `philosophy.tsx` page orchestrates the complex timeline of pinning and animation triggers, ensuring a smooth and seamless user experience.

---

## 🎨 Design System & Styling

-   **Brand Identity**: The core design principles, colors, and typography are defined in `docs/design-system.md` and `docs/style-guide.md`.
-   **CSS Variables**: Foundational design tokens (colors, fonts, spacing) are defined in `styles/variables.css` and are used throughout the application.
-   **Component Scoping**: Styling is primarily handled via CSS Modules (`.module.css`). This approach ensures that styles are scoped locally to their component, preventing global namespace conflicts.
-   **Global Styles**: Base styles and resets are located in `styles/base.css`.

## 🚀 Deployment

The site is configured for static deployment on GitHub Pages. The CI/CD pipeline in `.github/workflows/deploy.yml` automates this process. On every push to the `master` branch, the workflow will:

1.  Check out the code.
2.  Install dependencies.
3.  Run `npm run build` to generate the static site.
4.  Deploy the contents of the `out/` directory to the `gh-pages` branch, making it live.

---
This README provides a comprehensive guide for any developer looking to work on the Fuerte Financial Technologies website. It covers the what, why, and how of the codebase. 