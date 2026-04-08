"use client"

import { cn } from "@/lib/utils"
import { TEAM_MEMBERS, type User } from "@/lib/types"
import { Check, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

interface OwnerDropdownProps {
  value: User | null
  onChange: (user: User) => void
  multiSelect?: boolean
  selectedUsers?: User[]
  onMultiChange?: (users: User[]) => void
}

export function OwnerDropdown({
  value,
  onChange,
  multiSelect = false,
  selectedUsers = [],
  onMultiChange,
}: OwnerDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (user: User) => {
    if (multiSelect && onMultiChange) {
      const isSelected = selectedUsers.some((u) => u.id === user.id)
      if (isSelected) {
        onMultiChange(selectedUsers.filter((u) => u.id !== user.id))
      } else {
        onMultiChange([...selectedUsers, user])
      }
    } else {
      onChange(user)
      setIsOpen(false)
    }
  }

  const displayValue = multiSelect
    ? selectedUsers.length > 0
      ? `${selectedUsers.length} selected`
      : "Select team members"
    : value
      ? value.name
      : "Select owner"

  const displaySubtext = multiSelect
    ? selectedUsers.map((u) => u.name).join(", ") || "No one selected"
    : value?.role || "Select an owner"

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/50 p-4 text-left transition-colors hover:bg-muted"
      >
        <div className="flex items-center gap-3">
          {!multiSelect && value ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary/30">
              <Image
                src={value.avatar || "/placeholder.svg"}
                alt={value.name}
                fill
                className="object-cover"
              />
            </div>
          ) : multiSelect && selectedUsers.length > 0 ? (
            <div className="flex -space-x-2">
              {selectedUsers.slice(0, 3).map((user, index) => (
                <div
                  key={user.id}
                  className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-card"
                  style={{ zIndex: 3 - index }}
                >
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {selectedUsers.length > 3 && (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-medium text-foreground">
                  +{selectedUsers.length - 3}
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/30 bg-muted">
              <span className="text-muted-foreground">?</span>
            </div>
          )}
          <div>
            <p className="font-medium text-foreground">{displayValue}</p>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {displaySubtext}
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-border bg-card p-2 shadow-lg">
          {TEAM_MEMBERS.map((user) => {
            const isSelected = multiSelect
              ? selectedUsers.some((u) => u.id === user.id)
              : value?.id === user.id

            return (
              <button
                key={user.id}
                type="button"
                onClick={() => handleSelect(user)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-muted",
                  isSelected && "bg-primary/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                {isSelected && <Check className="h-5 w-5 text-primary" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
