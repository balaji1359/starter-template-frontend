// Shared pricing configuration - single source of truth
export interface PricingPlan {
  id: string
  name: string
  price: {
    monthly: string
    annual: string
  }
  period?: string
  description: string
  easyLinks: string[]
  socialLinks: string[]
  deepLinks: string[]
  buttonText: string
  buttonVariant: "primary" | "secondary"
  highlighted?: boolean
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: "$0", annual: "$0" },
    description: "Perfect for personal bookmarking",
    easyLinks: [
      "Unlimited links",
      "One-click save from any device or browser",
      "Smart organization with AI-powered collections and tags",
      "AI-powered search across content",
      "Import from browsers (Chrome, Firefox, Safari, Edge)",
      "Import from documents (PDFs, Word docs, text files)",
      "Cross-device sync (web, mobile, extensions, MCP)",
      "Advanced filters and search",
      "Usage insights and analytics"
    ],
    socialLinks: [
      "Preview Social Links features"
    ],
    deepLinks: [
      "Preview Deep Links features"
    ],
    buttonText: "Get Started",
    buttonVariant: "secondary" as const,
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: "$3.99", annual: "$39.99" },
    period: "per month",
    description: "Everything in Starter, plus community and AI features:",
    easyLinks: [
      "Everything from Starter",
      "Priority support",
      "Enhanced customization and themes"
    ],
    socialLinks: [
      "Follow users and SMEs",
      "Re-share and recommend with notes",
      "Upvote/downvote community ranking",
      "Invite-only circles for niche topics",
      "Collection-level follows",
      "Reputation scoring system",
      "Private/Public/Community visibility",
      "Top curators and collections discovery"
    ],
    deepLinks: [
      "AI summarization & TL;DRs",
      "Podcast-style audio summaries",
      "Semantic annotations and highlights",
      "Knowledge Kanban workflows",
      "Topic clustering and organization",
      "Ask-Me-Anything over your links",
      "Reading queue and archive system",
      "Daily/Weekly personalized digests"
    ],
    buttonText: "Try Pro",
    buttonVariant: "primary" as const,
    highlighted: true,
  },
]