"use client"

import { cn } from "@/lib/utils"
import {
  CalendarCheck,
  CircleCheck,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react"

const tabs = [
  { name: "Ambitions", icon: CircleCheck, active: true },
  { name: "Check-ins", icon: CalendarCheck, active: false },
  { name: "Feedback", icon: MessageSquare, active: false },
  { name: "Performance Reviews", icon: Users, active: false },
  { name: "Talent Planning", icon: Sparkles, active: false },
]

export function NavigationTabs() {
  return (
    <nav className="flex items-center gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
            tab.active
              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
              : "bg-card text-foreground hover:bg-muted"
          )}
        >
          <tab.icon className="h-4 w-4" />
          {tab.name}
        </button>
      ))}
    </nav>
  )
}
