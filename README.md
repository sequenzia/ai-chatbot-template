# AI Chatbot Template

A modern React + Vite + Tailwind CSS v4 chatbot interface template.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **shadcn/ui** component library
- **Framer Motion** for animations
- **Lucide React** for icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── components/     # Application components
│   │   └── ui/         # shadcn/ui components
│   ├── context/        # React contexts (ThemeContext)
│   └── constants/      # Static data
├── styles/             # CSS (Tailwind, theme, fonts)
└── main.tsx            # Entry point
```

## Features

- 💬 Chat interface with message history
- 🌙 Dark/light theme toggle
- 📱 Responsive design (mobile, tablet, desktop)
- ♿ Accessibility-ready with ARIA support
- 🎨 Customizable via CSS variables

## Documentation

- [UI/UX Recommendations](./docs/UX-UI-RECOMMENDATIONS.md) - Guidelines for responsive design, accessibility, and mobile optimization

## Integration

The chat functionality is currently mocked. See `src/app/App.tsx` `handleSendMessage` function to integrate with your LLM backend.