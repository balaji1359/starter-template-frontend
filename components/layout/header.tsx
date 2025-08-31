"use client"

import React from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

interface HeaderProps {
  onToggleRightSidebar?: () => void
}

export function Header({ onToggleRightSidebar }: HeaderProps) {
  const router = useRouter()

  return (
    <header className="h-16 bg-card border-b border-border flex items-center px-6 gap-6 justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/icon48.png"
                        alt="BeeKeeper Logo"
          width={32}
          height={32}
          className="rounded-lg"
        />
      </div>
      
      {/* Center - Search Bar */}
      <div className="flex-1 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="earch..."
            className="w-full bg-input border border-border rounded-lg pl-12 pr-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
          />
        </div>
      </div>
    </header>
  )
}
