<div align="center">

# Bikash Jaiswal

### Developer • Investor • Entrepreneur

[![Website](https://img.shields.io/badge/Website-bikashjaiswal.com-8b5cf6?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.bikashjaiswal.com)
[![GitHub](https://img.shields.io/badge/GitHub-bikash--jaiswal-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bikash-jaiswal)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bikash-jaiswal/)

</div>

---

## 🚀 About This Project

A modern, high-performance personal website and blog built with cutting-edge web technologies. Features a beautiful UI with dark/light mode support, syntax-highlighted code blocks, and smooth animations.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| **⚡ Next.js 15** | App Router with React Server Components |
| **🎨 Modern UI/UX** | Glassmorphism, gradient effects, smooth animations |
| **🌓 Dark/Light Mode** | Premium theming with CSS custom properties |
| **📝 Blog Platform** | Markdown support with syntax highlighting |
| **📊 Reading Progress** | Visual progress indicator with time remaining |
| **🔍 SEO Optimized** | Meta tags, Open Graph, structured data |
| **📱 Fully Responsive** | Mobile-first design approach |
| **♿ Accessible** | WCAG compliant with keyboard navigation |

### 🛠️ Tech Stack

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)

---

## 📦 Getting Started

### Prerequisites

- **Node.js** 18.0.0 or later
- **pnpm** (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/bikash-jaiswal/bikash-jaiswal.github.io.git
cd bikash-jaiswal.github.io

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint errors |
| `pnpm format` | Format with Prettier |
| `pnpm type-check` | TypeScript type checking |
| `pnpm analyze` | Analyze bundle size |
| `pnpm clean` | Clean build artifacts |

---

## 📁 Project Structure

```
bikash-jaiswal.github.io/
├── app/                      # Next.js App Router
│   ├── blog/                 # Blog pages
│   │   └── [slug]/           # Dynamic blog post pages
│   ├── projects/             # Projects page
│   ├── resources/            # Resources page
│   ├── contacts/             # Contact page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # React components
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Site footer
│   ├── BlogPostPreview.tsx   # Blog card component
│   ├── NewsletterSignup.tsx  # Newsletter form
│   └── ThemeToggle.tsx       # Dark/light mode toggle
├── content/                  # Markdown blog posts
├── lib/                      # Utility functions
├── styles/                   # Global CSS & theming
│   └── globals.css           # CSS custom properties
├── types/                    # TypeScript definitions
└── public/                   # Static assets
```

---

## 🎨 Theming

The site uses a comprehensive CSS custom properties system for theming:

```css
/* Dark Mode */
--theme-bg: #0a0a0b;
--theme-text: #fafafa;
--theme-accent: #8b5cf6;

/* Light Mode */
--theme-bg: #fafaf9;
--theme-text: #171717;
--theme-accent: #6d28d9;
```

Toggle between themes using the sun/moon icon in the header.

---

## 📝 Writing Blog Posts

Create a new markdown file in `content/` with frontmatter:

```markdown
---
title: "Your Post Title"
subtitle: "A brief description"
date: "2024-01-15"
tags: ["development", "tutorial"]
author: "Bikash Jaiswal"
---

Your content here with **markdown** support and `code blocks`.
```

---

## 🚀 Deployment

### GitHub Pages

This site is configured for GitHub Pages deployment:

```bash
pnpm build
# Deploy the `out/` directory
```

### Vercel (Alternative)

Push to `main` branch for automatic deployment on Vercel.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [Bikash Jaiswal](https://www.bikashjaiswal.com)**

</div>
