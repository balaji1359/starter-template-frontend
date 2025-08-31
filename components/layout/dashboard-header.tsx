"use client"

import { useState } from "react"
import {
  Plus,
  Grid3X3,
  List,
  Star,
  RotateCcw,
  ChevronDown,
  CalendarClock,
  FileText,
  ArrowUpNarrowWide,
  ArrowDownNarrowWide,
  Hash,
  Folder,
  Network,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"

interface DashboardHeaderProps {
  title: string
  subtitle: string
  view: "grid" | "list" | "graph"
  onViewChange: (view: "grid" | "list" | "graph") => void
  sortBy: string
  sortDirection: "asc" | "desc"
  onDateSortToggle: () => void
  onTextSortToggle: () => void
  onCountSortToggle?: () => void
  showFavoritesOnly?: boolean
  onFavoritesToggle?: () => void
  perPage?: number
  onPerPageChange?: (perPage: number) => void
  onRefresh: () => void
  onAdd?: () => void
  addButtonText?: string
  isLoading?: boolean
  isInitialized?: boolean
  type: "links" | "collections" | "tags" | "filters"
}

const PAGINATION_OPTIONS = [15, 30, 45, 60]

export function DashboardHeader({
  title,
  subtitle,
  view,
  onViewChange,
  sortBy,
  sortDirection,
  onDateSortToggle,
  onTextSortToggle,
  onCountSortToggle,
  showFavoritesOnly,
  onFavoritesToggle,
  perPage,
  onPerPageChange,
  onRefresh,
  onAdd,
  addButtonText = "Add",
  isLoading = false,
  isInitialized = true,
  type,
}: DashboardHeaderProps) {
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false)

  // Determine sort type based on sortBy
  const sortType = sortBy === "title" || sortBy === "name" ? "text" : sortBy === "link_count" ? "count" : "date"

  return (
    <div className="flex-shrink-0 bg-card px-6 py-0.5 mx-0">
      <div className="flex items-center justify-between flex-row my-0">
        {/* Left - Title and Subtitle */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>

        {/* Right - Controls */}
        <div className="flex items-center gap-2">
          {/* Per Page Dropdown - For Links, Collections, and Tags */}
          {(type === "links" || type === "collections" || type === "tags") && perPage && onPerPageChange && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPerPageDropdown(!showPerPageDropdown)}
                disabled={!isInitialized}
                className="text-muted-foreground hover:text-foreground hover:bg-accent px-2 py-1.5 text-xs disabled:opacity-50"
              >
                {perPage} per page
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>

              {showPerPageDropdown && isInitialized && (
                <div className="absolute right-0 top-10 bg-card border border-border rounded-lg shadow-lg py-2 w-32 z-50">
                  {PAGINATION_OPTIONS.map((option) => (
                    <button
                      key={option}
                      className={cn(
                        "w-full px-4 py-2 text-left hover:bg-accent transition-colors text-sm",
                        perPage === option ? "bg-primary text-primary-foreground" : "text-card-foreground",
                      )}
                      onClick={() => {
                        onPerPageChange(option)
                        setShowPerPageDropdown(false)
                      }}
                    >
                      {option} per page
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Favorites Toggle - Only for Links */}
          {type === "links" && onFavoritesToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onFavoritesToggle}
              disabled={!isInitialized}
              className={cn(
                "p-1.5 transition-colors disabled:opacity-50",
                showFavoritesOnly
                  ? "text-yellow-400 hover:text-yellow-300 bg-yellow-400/10 hover:bg-yellow-400/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
              title={showFavoritesOnly ? "Show all links" : "Show favorites only"}
            >
              <Star className={cn("h-3.5 w-3.5", showFavoritesOnly && "fill-current")} />
            </Button>
          )}

          {/* Sort Toggle Group */}
          <div className="flex items-center bg-muted rounded-lg p-0.5">
            {/* Date Sort Toggle - Available for all types */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onDateSortToggle}
              disabled={!isInitialized}
              className={cn(
                "px-2 py-1.5 disabled:opacity-50",
                sortType === "date"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50",
              )}
              title={`Sort by Date (${sortDirection === "asc" ? "Oldest First" : "Newest First"})`}
            >
              <div className="flex items-center">
                <CalendarClock className="h-3.5 w-3.5" />
                {sortType === "date" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpNarrowWide className="h-3 w-3 ml-0.5" />
                  ) : (
                    <ArrowDownNarrowWide className="h-3 w-3 ml-0.5" />
                  ))}
              </div>
            </Button>

            {/* Text Sort Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onTextSortToggle}
              disabled={!isInitialized}
              className={cn(
                "px-2 py-1.5 disabled:opacity-50",
                sortType === "text"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50",
              )}
              title={`Sort by Name (${sortDirection === "asc" ? "A to Z" : "Z to A"})`}
            >
              <div className="flex items-center">
                {type === "collections" ? (
                  <Folder className="h-3.5 w-3.5" />
                ) : type === "tags" ? (
                  <Folder className="h-3.5 w-3.5" />
                ) : (
                  <FileText className="h-3.5 w-3.5" />
                )}
                {sortType === "text" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpNarrowWide className="h-3 w-3 ml-0.5" />
                  ) : (
                    <ArrowDownNarrowWide className="h-3 w-3 ml-0.5" />
                  ))}
              </div>
            </Button>

            {/* Count Sort Toggle - For Collections and Tags */}
            {(type === "collections" || type === "tags") && onCountSortToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onCountSortToggle}
                disabled={!isInitialized}
                className={cn(
                  "px-2 py-1.5 disabled:opacity-50",
                  sortType === "count"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                )}
                title={`Sort by Count (${sortDirection === "asc" ? "Least First" : "Most First"})`}
              >
                <div className="flex items-center">
                  <Hash className="h-3.5 w-3.5" />
                  {sortType === "count" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpNarrowWide className="h-3 w-3 ml-0.5" />
                    ) : (
                      <ArrowDownNarrowWide className="h-3 w-3 ml-0.5" />
                    ))}
                </div>
              </Button>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-0.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewChange("grid")}
              disabled={!isInitialized}
              className={cn(
                "px-2 py-1.5 disabled:opacity-50",
                view === "grid" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
              title="Grid view"
            >
              <Grid3X3 className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewChange("list")}
              disabled={!isInitialized}
              className={cn(
                "px-2 py-1.5 disabled:opacity-50",
                view === "list" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
              title="List view"
            >
              <List className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewChange("graph")}
              disabled={!isInitialized}
              className={cn(
                "px-2 py-1.5 disabled:opacity-50",
                view === "graph" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
              title="Graph view"
            >
              <Network className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={!isInitialized || isLoading}
            className="text-muted-foreground hover:text-foreground hover:bg-accent p-1.5 disabled:opacity-50"
            title={`Refresh ${type === "collections" ? "collections" : type === "tags" ? "tags" : "filtered links"}`}
          >
            <RotateCcw className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} />
          </Button>

          {/* Add Button */}
          {onAdd && (
            <Button 
              onClick={onAdd} 
              size="sm" 
              className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs"
              data-testid={`add-button-${type}`}
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              {addButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
} 