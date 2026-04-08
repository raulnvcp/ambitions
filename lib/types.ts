export interface User {
  id: string
  name: string
  role: string
  avatar: string
}

export interface Ambition {
  id: string
  name: string
  type: "Business" | "Growth and Development" | "Manager Effectiveness"
  owner: User
  privacy: "Public" | "Private"
  sharedWith: User[]
  actions: string[]
  achievements: string[]
  status: "Awaiting Approval" | "Draft" | "Completed"
  ladderedFrom?: string
  createdAt: Date
}

export const TEAM_MEMBERS: User[] = [
  {
    id: "1",
    name: "Kylie Simmons",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "John Doe",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Calvin Harris",
    role: "Design Lead",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Michael Scott",
    role: "Regional Manager",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "5",
    name: "Jim Halpert",
    role: "Sales Representative",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face",
  },
]

export const MANAGER_AMBITIONS = [
  "Improve team sprint velocity by 10% through the optimization of cross-functional workflows and resource allocation.",
  "Deliver all assigned project milestones for the current fiscal year while maintaining the quality standards defined by Sony Interactive Entertainment.",
]
