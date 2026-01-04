# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development server
npm run dev

# Production build
npm run build
```

## Architecture

This is a React + Vite + Tailwind CSS v4 AI chatbot template. It uses React 18 with peer dependencies.

### Entry Points
- `index.html` - HTML entry point
- `src/main.tsx` - React entry point, mounts `<App />` to `#root`
- `src/app/App.tsx` - Main application component with chat state management

### Key Directories
- `src/app/components/` - Application components (ChatStream, InputBox, Sidebar, WelcomeScreen)
- `src/app/components/ui/` - shadcn/ui component library (pre-installed)
- `src/app/context/` - React contexts (ThemeContext for light/dark mode)
- `src/app/constants/` - Static data (suggestions.ts)
- `src/styles/` - CSS entry points (index.css imports fonts, tailwind, theme)

### Styling System
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no tailwind.config needed)
- **Theme variables** defined in `src/styles/theme.css` using CSS custom properties
- **Dark mode** uses `.dark` class on `<html>` element with `@custom-variant dark (&:is(.dark *))`
- **shadcn/ui components** use `class-variance-authority` (cva) for variants
- **Utility function** `cn()` in `src/app/components/ui/utils.ts` merges Tailwind classes

### Path Alias
`@` maps to `./src` (configured in vite.config.ts)

### Component Patterns
- UI components follow shadcn/ui conventions with `data-slot` attributes
- Animation uses `motion/react` (Framer Motion)
- Icons from `lucide-react`
- Theme toggle via `useTheme()` hook from ThemeContext

### Current State
The chat functionality is mocked. `App.tsx` has `handleSendMessage` with a setTimeout that returns a mock AI response. This is the integration point for connecting to a real LLM backend.

## Documentation

- `docs/UX-UI-RECOMMENDATIONS.md` - Comprehensive UI/UX guidelines for responsive design, accessibility, and mobile optimization

## UI/UX Guidelines

When modifying UI components, refer to `docs/UX-UI-RECOMMENDATIONS.md` for:
- **Responsive breakpoints**: Mobile (<640px), Tablet (640-1024px), Desktop (>1024px)
- **Touch targets**: Minimum 44x44px for mobile (Apple HIG)
- **Accessibility**: ARIA labels, focus management, screen reader announcements
- **Safe areas**: Support for device notches and home indicators
- **Performance**: Reduced motion support, debounced resize handlers
