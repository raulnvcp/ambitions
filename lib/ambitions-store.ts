"use client"

import { create } from "zustand"
import type { Ambition } from "./types"

interface AmbitionsStore {
  ambitions: Ambition[]
  addAmbition: (ambition: Ambition) => void
}

export const useAmbitionsStore = create<AmbitionsStore>((set) => ({
  ambitions: [],
  addAmbition: (ambition) =>
    set((state) => ({
      ambitions: [...state.ambitions, ambition],
    })),
}))
