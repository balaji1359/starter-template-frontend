"use client"

import { useState } from "react"
import { MessageCircle, Activity, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

// Arrow Right To Line icon component
function ArrowRightToLineIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17 12H3"/>
      <path d="m11 18 6-6-6-6"/>
      <path d="M21 5v14"/>
    </svg>
  )
}

// Arrow Left To Line icon component
function ArrowLeftToLineIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 19V5"/>
      <path d="m13 6-6 6 6 6"/>
      <path d="M7 12h14"/>
    </svg>
  )
}

interface RightSidebarProps {
  onClose: () => void
}

export function RightSidebar({ onClose }: RightSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div
      className={`${collapsed ? "w-12" : "w-80"} bg-muted/60 border-l border-border flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Collapse Toggle Button */}
      <div className="h-16 flex items-center border-b border-border/50">
        <button
          onClick={toggleCollapsed}
          className="ml-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 flex justify-center items-center"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ArrowLeftToLineIcon className="h-4 w-4" />
          ) : (
            <ArrowRightToLineIcon className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Content - only show when not collapsed */}
      {!collapsed && (
        <>
          {/* Activity Section */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-button-primary" />
                <h3 className="font-semibold text-card-foreground">My Activity</h3>
              </div>
              <button className="text-button-primary text-sm hover:underline">View all</button>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-card-foreground">Added new link</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent-purple rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-card-foreground">Updated tags</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Community Section */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-button-primary" />
                <h3 className="font-semibold text-card-foreground">Community</h3>
              </div>
              <button className="text-button-primary text-sm hover:underline">See all</button>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-white">SC</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-card-foreground">Sarah Chen started following you</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-button-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-button-primary-foreground">AM</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-card-foreground">Alex Morgan liked your collection</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copilot Chat */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-button-primary" />
                  <h3 className="font-semibold text-card-foreground">Copilot</h3>
                </div>
                <button className="text-button-primary text-sm hover:underline">New chat</button>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-auto">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  I noticed you've added several links about machine learning recently. Would you like me to help
                  organize them into a new collection?
                </p>
                <p className="text-xs text-muted-foreground mt-2">2m ago</p>
              </div>

              <div className="bg-button-primary rounded-lg p-3 ml-8">
                <p className="text-sm text-button-primary-foreground">
                  Yes, that would be helpful! What did you have in mind?
                </p>
                <p className="text-xs text-button-primary-foreground/80 mt-2">1m ago</p>
              </div>
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 min-w-0 bg-input border border-border rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button size="sm" className="flex-shrink-0">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
