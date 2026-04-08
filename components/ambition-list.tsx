"use client"

import { cn } from "@/lib/utils"
import { useAmbitionsStore } from "@/lib/ambitions-store"
import { MANAGER_AMBITIONS } from "@/lib/types"
import { Filter, Plus, Search, X, Sparkles, Briefcase, Sprout, Users } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface AmbitionListProps {
  onNewAmbition: () => void
}

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
]

function getTypeIcon(type: string) {
  switch (type) {
    case "Business":
      return <Briefcase className="h-5 w-5 text-muted-foreground" />
    case "Growth and Development":
      return <Sprout className="h-5 w-5 text-muted-foreground" />
    case "Manager Effectiveness":
      return <Users className="h-5 w-5 text-muted-foreground" />
    default:
      return <Briefcase className="h-5 w-5 text-muted-foreground" />
  }
}

export function AmbitionList({ onNewAmbition }: AmbitionListProps) {
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active")
  const [showBanner, setShowBanner] = useState(true)
  const { ambitions } = useAmbitionsStore()

  const draftCount = ambitions.filter((a) => a.status === "Draft").length
  const completedCount = ambitions.filter((a) => a.status === "Completed").length

  return (
    <div className="flex-1 p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Ambitions</h1>
          <p className="mt-1 text-muted-foreground">
            Track and manage Ambitions for the 2026 fiscal year.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-3 rounded-xl bg-card px-4 py-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-muted">
              <span className="sr-only">Draft progress</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Draft</p>
              <p className="text-2xl font-bold text-foreground">{draftCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-card px-4 py-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-muted">
              <span className="sr-only">Completed progress</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-foreground">{completedCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-foreground"
          >
            <Filter className="h-4 w-4" />
            Type: All
          </button>
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-foreground"
          >
            <Filter className="h-4 w-4" />
            Status: All
          </button>
          <div className="flex -space-x-2">
            {avatars.map((avatar, index) => (
              <div
                key={avatar}
                className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-card"
                style={{ zIndex: avatars.length - index }}
              >
                <Image
                  src={avatar || "/placeholder.svg"}
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            <button
              type="button"
              className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground text-muted-foreground"
              style={{ zIndex: 0 }}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-64 rounded-full border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onNewAmbition}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New Ambition
        </button>
      </div>

      <div className="mb-6">
        <div className="flex gap-6 border-b border-border">
          <button
            type="button"
            onClick={() => setActiveTab("active")}
            className={cn(
              "border-b-2 pb-3 text-sm font-medium transition-colors",
              activeTab === "active"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("archived")}
            className={cn(
              "border-b-2 pb-3 text-sm font-medium transition-colors",
              activeTab === "archived"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Archived
          </button>
        </div>
      </div>

      {showBanner && (
        <div className="mb-6 rounded-2xl border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-primary">
                  Your manager has created business Ambitions that may interest you!
                </h3>
                <div className="mt-4 space-y-3">
                  {MANAGER_AMBITIONS.map((ambition) => (
                    <div
                      key={ambition}
                      className="flex items-center justify-between"
                    >
                      <p className="max-w-3xl text-sm text-foreground">
                        {ambition}
                      </p>
                      <button
                        type="button"
                        className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-foreground hover:text-primary"
                      >
                        <Plus className="h-4 w-4" />
                        Add laddered Ambition
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowBanner(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {ambitions.map((ambition) => (
          <div
            key={ambition.id}
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/30">
                  <Image
                    src={ambition.owner.avatar || "/placeholder.svg"}
                    alt={ambition.owner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {getTypeIcon(ambition.type)}
              </div>
              <p className="max-w-2xl font-medium text-foreground">
                {ambition.name}
              </p>
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                ambition.status === "Awaiting Approval"
                  ? "text-primary"
                  : ambition.status === "Completed"
                    ? "text-green-600"
                    : "text-muted-foreground"
              )}
            >
              {ambition.status}
            </span>
          </div>
        ))}
      </div>

      {ambitions.length === 0 && (
        <div className="mt-12 text-center text-muted-foreground">
          <p>No ambitions yet. Click "+ New Ambition" to create one.</p>
        </div>
      )}
    </div>
  )
}
