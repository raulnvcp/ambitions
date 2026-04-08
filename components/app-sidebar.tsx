"use client"

import { ArrowRight, Bell, CalendarDays, Network, Settings } from "lucide-react"
import Image from "next/image"

export function AppSidebar() {
  return (
    <aside className="flex h-screen w-16 flex-col items-center border-r border-border bg-card py-4">
      <div className="mb-8">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 6C7 5.44772 7.44772 5 8 5H14C14.5523 5 15 5.44772 15 6V14C15 14.5523 14.5523 15 14 15H8C7.44772 15 7 14.5523 7 14V6Z"
            fill="currentColor"
          />
          <path
            d="M17 10C17 9.44772 17.4477 9 18 9H24C24.5523 9 25 9.44772 25 10V26C25 26.5523 24.5523 27 24 27H18C17.4477 27 17 26.5523 17 26V10Z"
            fill="currentColor"
          />
          <path
            d="M7 18C7 17.4477 7.44772 17 8 17H14C14.5523 17 15 17.4477 15 18V26C15 26.5523 14.5523 27 14 27H8C7.44772 27 7 26.5523 7 26V18Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <button
        type="button"
        className="mb-6 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
      >
        <ArrowRight className="h-5 w-5" />
      </button>

      <nav className="flex flex-1 flex-col items-center gap-4">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
        >
          <CalendarDays className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
        >
          <Network className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
        >
          <Settings className="h-5 w-5" />
        </button>
      </nav>

      <div className="mt-auto flex flex-col items-center gap-4">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            alt="User avatar"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </aside>
  )
}
