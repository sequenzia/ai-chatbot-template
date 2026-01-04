# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Figma Make-generated AI Chatbot interface built with React 18, Vite, and Tailwind CSS v4. The design originates from Figma and includes shadcn/ui components. **Note:** Files are auto-synced from Figma Make - manual edits may be overwritten by future syncs.

## Development Commands

```bash
npm i          # Install dependencies
npm run dev    # Start Vite dev server
npm run build  # Production build
```

## Architecture

### Entry Flow
`index.html` → `src/main.tsx` → `src/app/App.tsx`

### Core Components
- **App.tsx** - Main component, manages message state and coordinates Sidebar, ChatStream, InputBox
- **Sidebar.tsx** - Navigation with collapsible state and theme toggle (collapses below 1024px)
- **ChatStream.tsx** - Displays messages with motion animations, auto-scrolls on new messages
- **InputBox.tsx** - Auto-expanding textarea with model selector dropdown and suggestion prompts
- **WelcomeScreen.tsx** - Initial state UI with clickable suggestion prompts

### Message System
Messages use the interface `{ id, role: 'user' | 'assistant', content }`. Currently uses mock 1000ms delayed responses - designed for LLM integration.

### Component Locations
- `/src/app/components/ui/` - 48+ shadcn/ui components (Radix UI-based)
- `/src/app/components/figma/` - Figma-generated components
- `/src/app/context/` - React Context providers (ThemeContext)
- `/src/app/constants/` - Static data (suggestion prompts)

## Styling System

### Tailwind CSS v4
Uses `@tailwindcss/vite` plugin - no traditional tailwind.config.js. Configuration is in CSS files.

### Theming
- CSS variables defined in `/src/styles/theme.css` using oklch color space
- Light/dark mode via `.dark` class on document root
- Theme persisted to localStorage, falls back to system preference
- Access via `useTheme()` hook from ThemeContext

### Path Alias
`@` maps to `./src` (configured in vite.config.ts)

## Key Dependencies

| Library | Purpose |
|---------|---------|
| motion | Animations (motion/react with AnimatePresence) |
| cmdk | Command menu |
| react-hook-form | Form state |
| sonner | Toast notifications |
| next-themes | Theme management |
| class-variance-authority | Component variants |
| tailwind-merge + clsx | Class utilities |

## Build Configuration

- **Vite plugins required:** `@vitejs/plugin-react` and `@tailwindcss/vite` (Figma Make requirement)
- **pnpm override:** Vite locked to 6.3.5
- **No ESLint/Prettier/TypeScript config** - Vite handles TypeScript via plugin
