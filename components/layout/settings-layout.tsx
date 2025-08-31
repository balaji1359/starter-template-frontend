"use client"

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/utils/cn'
import { 
  Settings, 
  User, 
  CreditCard, 
  Zap, 
  Tag, 
  HelpCircle,
  Search,
  CopyPlus,
  BookmarkPlus,
  BarChart3,
  MessagesSquare,
  Eye,
  Users,
  Compass,
  Sliders
} from 'lucide-react'

interface SettingsNavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

interface SidebarSection {
  title: string
  items: SettingsNavItem[]
}

const settingsNavItems: SettingsNavItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/settings'
  },
  {
    id: 'profile',
    label: 'Edit Profile',
    icon: User,
    href: '/settings/profile'
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: Sliders,
    href: '/settings/preferences'
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: Zap,
    href: '/integrations'
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: CreditCard,
    href: '/billing'
  },
  {
    id: 'tags',
    label: 'Manage Tags',
    icon: Tag,
    href: '/tags'
  },
  {
    id: 'help',
    label: 'Help',
    icon: HelpCircle,
    href: '/help'
  }
]

interface SettingsLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function SettingsLayout({ children, title, description }: SettingsLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleNavClick = (href: string) => {
    router.push(href)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left Sidebar */}
      <div className="w-[200px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">LL</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white text-sm">BeeKeeper</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-0.5">
            {settingsNavItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left transition-all duration-150 text-sm",
                    isActive 
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/70 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                Balaji Nagisetty
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Curator Free
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
