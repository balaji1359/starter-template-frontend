"use client"

import React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { Sidebar } from "./sidebar"
import { RightSidebar } from "./right-sidebar"
import { useTheme } from "@/hooks/use-theme"
import { Search, Plus, Link, Sun, Moon, Monitor, Speech } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { useLinksStore } from "@/hooks/use-links-store"
import { useAppStore } from "@/hooks/use-app-store"
import { AddLinkDialog } from "@/components/links/add-link-dialog"
import { TourTrigger } from "@/components/tour/TourTrigger"
import ChatWidget from "@/components/ChatWidget"
import { cn } from "@/utils/cn"
import { ActiveSection } from "@/types/navigation.types"

interface AppLayoutProps {
  children: React.ReactNode
  activeSection?: ActiveSection
  onSectionChange?: (section: ActiveSection) => void
}

// Create a context for search loading state
interface SearchContextType {
  isSearching: boolean;
  setIsSearching: (value: boolean) => void;
}

export const SearchContext = createContext<SearchContextType>({
  isSearching: false,
  setIsSearching: () => {},
});

export const useSearch = () => useContext(SearchContext);

export function AppLayout({ children, activeSection = "links", onSectionChange }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const { theme, setTheme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showAddLinkDialog, setShowAddLinkDialog] = useState(false)
  const [showThemeMenu, setShowThemeMenu] = useState(false)


  const router = useRouter()
  const searchParams = useSearchParams()
  const { fetchTags, fetchCollections } = useLinksStore()
  const { fetchTags: fetchAppTags, tags, collections } = useAppStore()

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ] as const

  const currentThemeIcon = themeOptions.find((option) => option.value === theme)?.icon || Monitor

  // Safety check to ensure theme is valid
  const safeTheme = theme || "system"

  // Initialize theme on mount
  useEffect(() => {
    // This ensures theme is applied on first load
    if (theme) {
      console.log('AppLayout: Initializing theme:', theme)
      setTheme(theme)
    }
  }, [theme, setTheme])

  // Reset search term when URL changes
  useEffect(() => {
    const search = searchParams?.get("search")
    if (!search) {
      setSearchTerm("")
    }
  }, [searchParams])

  useEffect(() => {
    fetchAppTags({}, true)
  }, [fetchAppTags])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Only update URL and section, let filters page handle the search
      const currentParams = new URLSearchParams(searchParams?.toString() || "")
      currentParams.set("search", searchTerm.trim())
      
      // First change section to filters to prevent double search
      if (activeSection !== "filters" && onSectionChange) {
        onSectionChange("filters")
      }
      
      // Then update URL
      router.push(`/dashboard?${currentParams.toString()}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  const handleAddLinkClick = () => {
    setShowAddLinkDialog(true)
  }

  // Close theme menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.theme-menu-container')) {
        setShowThemeMenu(false)
      }
    }

    if (showThemeMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showThemeMenu])

  return (
    <SearchContext.Provider value={{ isSearching, setIsSearching }}>
      <div className="h-screen w-screen overflow-hidden flex bg-background text-foreground">
        {/* Left Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex min-h-0">
          {/* Main Content with Search */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Search Bar */}
            <div className="h-16 border-b border-border flex items-center px-6">
              <div className="max-w-2xl w-full mx-auto flex items-center gap-3">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <form onSubmit={handleSearch} className="w-full">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                      {isSearching ? (
                        <Spinner className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Search className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Search links, summary, notes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full h-10 bg-background border border-border rounded-xl pl-10 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 active:border-primary/70 active:ring-2 active:ring-primary/30 transition-all duration-200"
                      data-tour="search-bar"
                    />
                  </form>
                </div>

                {/* Plus Action Icon */}
                <Button
                  type="button"
                  onClick={handleAddLinkClick}
                  className="h-10 w-10 px-0 rounded-xl"
                  title="Add"
                  data-tour="add-link-button"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Feedback Button */}
              <div className="ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/dashboard?section=feedback')}
                  className="h-10 w-10 p-0 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent"
                  title="Give Feedback"
                  data-tour="feedback-nav"
                >
                  <Speech className="h-4 w-4" />
                </Button>
              </div>

              {/* Tour Trigger */}
              <div className="ml-4">
                <TourTrigger />
              </div>

              {/* Theme Toggle - Top Right */}
              <div className="relative ml-2 theme-menu-container">
                {currentThemeIcon && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      console.log('Theme button clicked, current theme:', theme)
                      setShowThemeMenu(!showThemeMenu)
                    }}
                    className="h-10 w-10 p-0 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent"
                    title="Theme"
                  >
                    {React.createElement(currentThemeIcon, { className: "h-4 w-4" })}
                  </Button>
                )}

                {showThemeMenu && (
                  <div className="absolute right-0 top-12 bg-popover border border-border rounded-lg shadow-lg py-1 w-40 z-50">
                    {themeOptions.map((option) => (
                      <button
                        key={option.value}
                        className={cn(
                          "w-full px-3 py-1.5 text-left hover:bg-accent transition-colors flex items-center gap-2",
                          safeTheme === option.value ? "text-accent-foreground bg-accent" : "text-muted-foreground"
                        )}
                        onClick={() => {
                          setTheme(option.value)
                          setShowThemeMenu(false)
                        }}
                      >
                        <option.icon className="h-4 w-4" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-6">
              {children}
            </div>
          </div>

          {/* Right Sidebar */}
          {/*rightSidebarOpen && <RightSidebar onClose={() => setRightSidebarOpen(false)} />*/}
        </div>
      </div>

      {/* Add Link Dialog */}
      <AddLinkDialog
        open={showAddLinkDialog}
        onOpenChange={setShowAddLinkDialog}
        tags={tags}
        collections={collections}
      />
      
      {/* Chat Widget - Global */}
      <ChatWidget />
    </SearchContext.Provider>
  )
}