"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeftFromLine, ArrowRightFromLine, Link2, Library, Hash, Filter, Upload, LogOut, User as UserIcon, Settings, DollarSign, BarChart3, FlaskConical, Users, Search, Hammer, Compass, Network, GlobeLock, Blocks, Megaphone } from "lucide-react"
import { cn } from "@/utils/cn"
import Image from "next/image"
import { useAuthStore } from "@/hooks/use-auth"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  
interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  children?: NavItem[]
  collapsible?: boolean
  experimental?: boolean
  showCount?: boolean
  count?: number
  placeholder?: boolean
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [isLoggingOut, setIsLoggingOut] = useState(false)



  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const getUserInitials = () => {
    if (user?.full_name) {
      return user.full_name
        .split(" ")
        .map((name: string) => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    if (user?.email) {
      return user.email[0].toUpperCase()
    }
    return "U"
  }





  const handleSectionChange = (section: string) => {
    if (section === "links") {
      router.replace("/dashboard", { scroll: false })
    } else {
      router.replace(`/dashboard?section=${section}`, { scroll: false })
    }
  }




  const navigationItems: NavItem[] = [
    {
      id: "feeds",
      label: "Feeds",
      icon: Megaphone,
      placeholder: true,
    },
    {
      id: "manage",
      label: "Manage",
      icon: Blocks,
      placeholder: true,
      children: [
        {
          id: "links",
          label: "Links",
          icon: Link2,
          showCount: true,
        },
        {
          id: "collections",
          label: "Collections",
          icon: Library,
          showCount: true,
        },
        {
          id: "tags",
          label: "Tags",
          icon: Hash,
          showCount: true,
        },
        {
          id: "filters",
          label: "Filters",
          icon: Filter,
        },
        {
          id: "import",
          label: "Import",
          icon: Upload,
        },
      ]
    },
    {
      id: "discover",
      label: "Discover",
      icon: Compass,
      placeholder: true,
      children: [
        {
          id: "discover-collections",
          label: "Collections",
          icon: GlobeLock,
        },
        {
          id: "discover-users",
          label: "Users",
          icon: Network,
        }
      ]
    },
    {
      id: "insights",
      label: "Insights",
      icon: BarChart3,
      experimental: true,
    },
  ]

  const renderNavItem = (item: NavItem, isChild: boolean = false) => {
    const hasChildren = item.children && item.children.length > 0

    const handleClick = () => {
      if (item.placeholder) {
        // For placeholder items, don't navigate
        return
      }
      
      handleSectionChange(item.id)
    }



    return (
      <div key={item.id} className="w-full">
        <div
          className={cn(
            "flex items-center rounded-lg my-0.5 relative",
            item.placeholder 
              ? "text-muted-foreground cursor-pointer hover:bg-accent/40" 
              : "cursor-pointer text-muted-foreground hover:text-foreground hover:bg-accent/80",
            shouldHighlight ? "bg-accent-foreground/10 text-foreground" : "",
            "transition-[background-color,color] duration-200",
            "h-10",
            isChild && "ml-6"
          )}
          onClick={handleClick}
          title={collapsed ? item.label : undefined}
          data-testid={`sidebar-nav-${item.id}`}
          data-tour={item.id === "collections" ? "collections-nav" : item.id === "tags" ? "tags-nav" : item.id === "filters" ? "filters-nav" : item.id === "import" ? "import-nav" : item.id === "feedback" ? "feedback-nav" : item.id === "insights" ? "insights-nav" : undefined}
        >
          <div className={cn(
            "absolute left-2 w-5 h-5 transition-none",
            "flex items-center justify-center"
          )}>
            <item.icon className="w-5 h-5" />
          </div>
          <div className={cn(
            "absolute left-9 right-2 whitespace-nowrap overflow-hidden transition-[opacity,transform] duration-300 ease-in-out flex items-center justify-between",
            collapsed ? "opacity-0 -translate-x-2" : "opacity-100 translate-x-0"
          )}>
            <div className="flex items-center">
              {item.label}
              {item.experimental && (
                <span className="ml-1 text-xs text-orange-500" title="Experimental feature">
                  <FlaskConical className="inline w-5 h-5 animate-pulse" />
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {item.showCount && item.count !== undefined && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full min-w-[28px] text-center">
                  {item.count}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Render children if not collapsed */}
        {!collapsed && hasChildren && (
          <div className="space-y-0.5">
            {item.children?.map(child => renderNavItem(child, true))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "h-full bg-muted/60 border-border border-r flex flex-col px-3 sidebar",
        "transition-[width] duration-300 ease-in-out",
        collapsed ? "w-[60px]" : "w-[240px]",
      )}
    >
      {/* Logo and Create Section */}
      <div className={cn(
        "h-[60px] relative",
        collapsed ? "flex items-center justify-center" : "flex items-center justify-between w-full px-2"
      )}>
        {/* Logo and App Name */}
        <div className="flex items-center">
          <Image
            src="/icon48.png"
                          alt="BeeKeeper Logo"
            width={32}
            height={32}
            className="rounded-lg"
            draggable={false}
          />
          {/* App Name */}
          {!collapsed && (
            <span className="font-semibold text-lg ml-3">BeeKeeper</span>
          )}
        </div>
        
        {/* Toggle Button */}
        {!collapsed && (
          <button
            className="relative p-1.5 rounded-md hover:bg-accent transition-colors duration-200 group"
            onClick={onToggle}
            title="Hide navigation"
          >
            <ArrowLeftFromLine className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
          </button>
        )}
        
        {/* Collapsed state toggle button */}
        {collapsed && (
          <button
            className="relative p-1.5 rounded-md hover:bg-accent transition-colors duration-200 group"
            onClick={onToggle}
            title="Show navigation"
          >
            <ArrowRightFromLine className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
          </button>
        )}
      </div>

      {/* Navigation - scrollable if needed */}
      <nav className="flex-1 pt-8 pb-6 overflow-y-auto" style={{ marginTop: '16px' }}>
        <div className="space-y-2">
          {navigationItems.map((item) => renderNavItem(item))}
        </div>
      </nav>

      {/* Bottom Section with Profile */}
      <div className="border-t border-border/50 p-2">

        {/* Profile Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "w-full rounded-lg",
                "text-muted-foreground hover:text-foreground hover:bg-accent",
                "transition-colors duration-200",
                "flex items-center gap-3 px-2 py-2",
                collapsed && "justify-center"
              )}
              data-tour="profile-nav"
            >
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                {getUserInitials()}
              </div>
              {!collapsed && (
                <div className="flex-1 text-left overflow-hidden">
                  <div className="truncate text-sm font-medium">{user?.full_name || user?.email}</div>
                  <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align={collapsed ? "center" : "start"} 
            className="w-56"
            side={collapsed ? "right" : "top"}
          >
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.full_name || "User"}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="sidebar-profile-link" onClick={() => onSectionChange && onSectionChange("profile")}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem data-testid="sidebar-billing-link" onClick={() => onSectionChange && onSectionChange("billing")}>
              <DollarSign className="mr-2 h-4 w-4" />
              <span>Billing</span>

              <span className="ml-1 text-xs text-orange-500" title="Experimental feature">
                <FlaskConical className="inline w-5 h-5 animate-pulse" />
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem data-testid="sidebar-settings-link" onClick={() => onSectionChange && onSectionChange("settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>

              <span className="ml-1 text-xs text-orange-500" title="Experimental feature">
                <FlaskConical className="inline w-5 h-5 animate-pulse" />
              </span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => router.push("/feedback")}>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Feedback</span>
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              data-testid="sidebar-logout-button"
              disabled={isLoggingOut}
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isLoggingOut ? "Logging out" : "Logout"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Logout Confirmation Dialog */}
        {showLogoutDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 w-full max-w-xs flex flex-col items-center">
              <div className="mb-4 text-center">
                <div className="font-semibold text-lg mb-2">Confirm Logout</div>
                <div className="text-sm text-muted-foreground">Are you sure you want to logout?</div>
              </div>
              <div className="flex gap-3 w-full mt-2">
                <button
                  className="flex-1 py-2 rounded-lg bg-muted text-foreground hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setShowLogoutDialog(false)}
                  disabled={isLoggingOut}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <div className="flex items-center justify-center w-full">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </div>
                  ) : (
                    "Logout"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
