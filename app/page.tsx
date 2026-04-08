"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { NavigationTabs } from "@/components/navigation-tabs"
import { AmbitionList } from "@/components/ambition-list"
import { NewAmbitionForm } from "@/components/new-ambition-form"
import { SuccessToast } from "@/components/success-toast"
import { useState } from "react"

export default function AmbitionsPage() {
  const [showForm, setShowForm] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleSuccess = () => {
    setShowForm(false)
    setShowToast(true)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        <header className="flex items-center gap-4 border-b border-border bg-card px-8 py-4">
          <NavigationTabs />
        </header>
        <AmbitionList onNewAmbition={() => setShowForm(true)} />
      </main>

      {showForm && (
        <NewAmbitionForm
          onClose={() => setShowForm(false)}
          onSuccess={handleSuccess}
        />
      )}

      {showToast && (
        <SuccessToast
          message="Ambition submitted for approval successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}
