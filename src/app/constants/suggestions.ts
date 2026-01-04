import { Zap, Code, Sparkles, MessageSquare, LucideIcon } from "lucide-react";

export interface Suggestion {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export const SUGGESTIONS: Suggestion[] = [
  {
    title: "Analyze Data",
    desc: "Can you help me analyze this dataset for trends?",
    icon: Zap,
  },
  {
    title: "Write Code",
    desc: "Create a responsive React component using Tailwind CSS.",
    icon: Code,
  },
  {
    title: "Brainstorm",
    desc: "Give me 5 creative ideas for a low-fidelity wireframe.",
    icon: Sparkles,
  },
  {
    title: "Summarize",
    desc: "Summarize the key takeaways from a complex technical paper.",
    icon: MessageSquare,
  },
];
