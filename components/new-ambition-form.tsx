"use client"

import { cn } from "@/lib/utils"
import { MANAGER_AMBITIONS, TEAM_MEMBERS, type Ambition, type User } from "@/lib/types"
import { useAmbitionsStore } from "@/lib/ambitions-store"
import { OwnerDropdown } from "./owner-dropdown"
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  ChevronDown,
  Network,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface NewAmbitionFormProps {
  onClose: () => void
  onSuccess: () => void
}

type AmbitionType = "Business" | "Growth and Development" | "Manager Effectiveness"

export function NewAmbitionForm({ onClose, onSuccess }: NewAmbitionFormProps) {
  const [step, setStep] = useState(1)
  const [type, setType] = useState<AmbitionType>("Business")
  const [owner, setOwner] = useState<User | null>(TEAM_MEMBERS[0])
  const [privacy, setPrivacy] = useState<"Public" | "Private">("Public")
  const [sharedWith, setSharedWith] = useState<User[]>([])
  const [ladderedFrom, setLadderedFrom] = useState<string | null>(MANAGER_AMBITIONS[0])
  const [showLadderedDropdown, setShowLadderedDropdown] = useState(false)
  const [ambitionName, setAmbitionName] = useState("")
  const [actions, setActions] = useState<string[]>([""])
  const [achievements, setAchievements] = useState<string[]>([""])

  const { addAmbition } = useAmbitionsStore()

  const handleAddAction = () => {
    setActions([...actions, ""])
  }

  const handleRemoveAction = (index: number) => {
    if (actions.length > 1) {
      setActions(actions.filter((_, i) => i !== index))
    }
  }

  const handleActionChange = (index: number, value: string) => {
    const newActions = [...actions]
    newActions[index] = value
    setActions(newActions)
  }

  const handleAddAchievement = () => {
    setAchievements([...achievements, ""])
  }

  const handleRemoveAchievement = (index: number) => {
    if (achievements.length > 1) {
      setAchievements(achievements.filter((_, i) => i !== index))
    }
  }

  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...achievements]
    newAchievements[index] = value
    setAchievements(newAchievements)
  }

  const resetForm = () => {
    setStep(1)
    setType("Business")
    setOwner(TEAM_MEMBERS[0])
    setPrivacy("Public")
    setSharedWith([])
    setLadderedFrom(MANAGER_AMBITIONS[0])
    setShowLadderedDropdown(false)
    setAmbitionName("")
    setActions([""])
    setAchievements([""])
  }

  const handleSubmit = () => {
    if (!owner || !ambitionName.trim()) return

    const newAmbition: Ambition = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: ambitionName,
      type,
      owner,
      privacy,
      sharedWith,
      actions: actions.filter((a) => a.trim()),
      achievements: achievements.filter((a) => a.trim()),
      status: "Awaiting Approval",
      ladderedFrom: ladderedFrom || undefined,
      createdAt: new Date(),
    }

    addAmbition(newAmbition)
    resetForm()
    onSuccess()
  }

  const handleSaveAsDraft = () => {
    if (!owner || !ambitionName.trim()) return

    const newAmbition: Ambition = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: ambitionName,
      type,
      owner,
      privacy,
      sharedWith,
      actions: actions.filter((a) => a.trim()),
      achievements: achievements.filter((a) => a.trim()),
      status: "Draft",
      ladderedFrom: ladderedFrom || undefined,
      createdAt: new Date(),
    }

    addAmbition(newAmbition)
    resetForm()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-card p-8 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 text-muted-foreground hover:text-foreground"
        >
          <X className="h-6 w-6" />
        </button>

        {step === 1 ? (
          <>
            <h2 className="text-3xl font-bold text-foreground">
              1. Ambition <span className="text-primary">setup</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Define the type, assignee, and privacy level for this Ambition.
            </p>

            <div className="mt-8">
              <label className="text-sm font-medium text-foreground">Type:</label>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setType("Business")}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                    type === "Business"
                      ? "bg-foreground text-card"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  )}
                >
                  <Briefcase className="h-4 w-4" />
                  Business
                </button>
                <button
                  type="button"
                  onClick={() => setType("Growth and Development")}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                    type === "Growth and Development"
                      ? "bg-foreground text-card"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  )}
                >
                  <Sparkles className="h-4 w-4" />
                  Growth and Development
                </button>
                <button
                  type="button"
                  onClick={() => setType("Manager Effectiveness")}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                    type === "Manager Effectiveness"
                      ? "bg-foreground text-card"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  )}
                >
                  <Network className="h-4 w-4" />
                  Manager Effectiveness
                </button>
              </div>
            </div>

            <div className="mt-8">
              <label className="text-sm font-medium text-foreground">Owner:</label>
              <div className="mt-3">
                <OwnerDropdown value={owner} onChange={setOwner} />
              </div>
            </div>

            <div className="mt-8">
              <label className="text-sm font-medium text-foreground">Privacy:</label>
              <div className="mt-3 flex items-center gap-1 rounded-full bg-muted p-1 w-fit">
                <button
                  type="button"
                  onClick={() => setPrivacy("Public")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    privacy === "Public"
                      ? "bg-foreground text-card"
                      : "text-foreground hover:bg-muted/80"
                  )}
                >
                  Public
                </button>
                <button
                  type="button"
                  onClick={() => setPrivacy("Private")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    privacy === "Private"
                      ? "bg-foreground text-card"
                      : "text-foreground hover:bg-muted/80"
                  )}
                >
                  Private
                </button>
              </div>
            </div>

            {privacy === "Private" && (
              <div className="mt-6">
                <label className="text-sm font-medium text-foreground">
                  Share with:
                </label>
                <div className="mt-3">
                  <OwnerDropdown
                    value={null}
                    onChange={() => {}}
                    multiSelect
                    selectedUsers={sharedWith}
                    onMultiChange={setSharedWith}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-foreground">
              2. Ambition <span className="text-primary">content & AAA framework</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Use the AAA framework (Ambition, actions, and achievements) to set goals
              and measure impact.
            </p>

            <div className="mt-8">
              <label className="text-sm font-medium text-foreground">Laddered from:</label>
              <div className="mt-3 relative">
                <button
                  type="button"
                  onClick={() => setShowLadderedDropdown(!showLadderedDropdown)}
                  className="flex w-full items-center justify-between rounded-xl border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5 p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary/30">
                      <Image
                        src={TEAM_MEMBERS[0].avatar || "/placeholder.svg"}
                        alt="Manager"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground line-clamp-2">
                        {ladderedFrom || "Select a parent ambition"}
                      </p>
                      <p className="text-sm text-muted-foreground">Rupert Sterling</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 ml-3",
                      showLadderedDropdown && "rotate-180"
                    )}
                  />
                </button>

                {showLadderedDropdown && (
                  <div className="absolute z-50 mt-2 w-full rounded-xl border border-border bg-card p-2 shadow-lg">
                    {MANAGER_AMBITIONS.map((ambition) => (
                      <button
                        key={ambition}
                        type="button"
                        onClick={() => {
                          setLadderedFrom(ambition)
                          setShowLadderedDropdown(false)
                        }}
                        className={cn(
                          "w-full rounded-lg p-3 text-left text-sm transition-colors hover:bg-muted",
                          ladderedFrom === ambition && "bg-primary/10"
                        )}
                      >
                        {ambition}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <label className="text-sm font-medium text-foreground">
                Ambition Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={ambitionName}
                onChange={(e) => setAmbitionName(e.target.value)}
                placeholder="Drive departmental performance by scaling operational frameworks and best practices to ensure consistent, high-quality delivery."
                className="mt-3 w-full rounded-xl border border-border bg-muted/50 p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mt-8 grid grid-cols-[250px,1fr] gap-6">
              <div className="rounded-xl bg-muted/30 p-4">
                <h3 className="font-semibold text-foreground">Actions</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Define the steps, resources, and timeline needed to achieve your
                  Ambition.
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  This list of activities and values drives your work toward a
                  successful completion.
                </p>
              </div>
              <div className="space-y-3">
                {actions.map((action, index) => (
                  <div key={`action-${index}`} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={action}
                      onChange={(e) => handleActionChange(index, e.target.value)}
                      placeholder="Enter one plan of action..."
                      className="flex-1 rounded-xl border border-border bg-muted/50 p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {actions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAction(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddAction}
                  className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Plus className="h-4 w-4" />
                  Add Action
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-[250px,1fr] gap-6">
              <div className="rounded-xl bg-muted/30 p-4">
                <h3 className="font-semibold text-foreground">Achievements</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Define the measurable outcomes that indicate success.
                </p>
              </div>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={`achievement-${index}`} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => handleAchievementChange(index, e.target.value)}
                      placeholder="Describe one Key achievement..."
                      className="flex-1 rounded-xl border border-border bg-muted/50 p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {achievements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAchievement(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddAchievement}
                  className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Plus className="h-4 w-4" />
                  Add Achievement
                </button>
              </div>
            </div>
          </>
        )}

        <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
          <button
            type="button"
            onClick={handleSaveAsDraft}
            className="rounded-full border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Save as Draft
          </button>
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            {step === 1 ? (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!ambitionName.trim()}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit for approval
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
