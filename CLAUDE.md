# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production (outputs to dist/)
npm run lint     # Run ESLint on the project
npm run preview  # Preview production build locally
```

## Project Structure

This is a React + Vite presentation application for agent research presentations.

- **src/App.jsx**: Main component containing the slide deck logic
  - `SLIDES` array defines presentation content (title slide + content slides)
  - Keyboard navigation: Arrow keys to navigate slides and bullet points
  - Click anywhere to advance
  - Uses `framer-motion` for slide transitions and bullet point animations
  - Uses `lucide-react` for icons

- **src/index.css**: Global styles and slide template design
  - PPT-style background with blue accent (#004a8d)
  - Corporate branding elements (lion logo, department info)
  - Responsive slide layout with progress bar

## Key Conventions

- ESLint config allows unused vars with `^[A-Z_]` pattern (for constants)
- No TypeScript - plain React with hooks
- Presentation images stored in `src/assets/images/`
