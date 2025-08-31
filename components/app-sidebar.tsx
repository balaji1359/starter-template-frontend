"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  Link,
  Bookmark,
  Tags,
  Activity,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isAuthenticated, isLoading } = useAuth()

  // Debug logging
  React.useEffect(() => {
    console.log('AppSidebar - Auth state:', { 
      isAuthenticated, 
      isLoading, 
      hasUser: !!user,
      userEmail: user?.email 
    })
  }, [isAuthenticated, isLoading, user])

  const data = {
    user: {
      name: user?.full_name || user?.email?.split('@')[0] || "BeeKeeper",
      email: user?.email || "user@beekeeper.com",
      avatar: user?.full_name ? user.full_name.charAt(0).toUpperCase() : "B",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboardIcon,
      },
      {
        title: "Links",
        url: "/links",
        icon: Link,
      },
      {
        title: "Collections",
        url: "/collections",
        icon: Bookmark,
      },
      {
        title: "Tags",
        url: "/tags",
        icon: Tags,
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: BarChartIcon,
      },
      {
        title: "Team",
        url: "/team",
        icon: UsersIcon,
      },
    ],
    navClouds: [
      {
        title: "Capture",
        icon: CameraIcon,
        isActive: true,
        url: "#",
        items: [
          {
            title: "Browser Extension",
            url: "#",
          },
          {
            title: "Mobile App",
            url: "#",
          },
        ],
      },
      {
        title: "Organize",
        icon: FileTextIcon,
        url: "#",
        items: [
          {
            title: "Smart Folders",
            url: "#",
          },
          {
            title: "Auto-tagging",
            url: "#",
          },
        ],
      },
      {
        title: "AI Features",
        icon: FileCodeIcon,
        url: "#",
        items: [
          {
            title: "Link Summaries",
            url: "#",
          },
          {
            title: "Content Analysis",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "/settings",
        icon: SettingsIcon,
      },
      {
        title: "Help & Support",
        url: "/help",
        icon: HelpCircleIcon,
      },
      {
        title: "Search",
        url: "/search",
        icon: SearchIcon,
      },
    ],
    documents: [
      {
        name: "Link Library",
        url: "/library",
        icon: DatabaseIcon,
      },
      {
        name: "Reports",
        url: "/reports",
        icon: ClipboardListIcon,
      },
      {
        name: "AI Assistant",
        url: "/assistant",
        icon: FileIcon,
      },
    ],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/" className="flex items-center gap-2">
                <span className="text-2xl">🐝</span>
                <span className="text-base font-semibold text-amber-800">BeeKeeper</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {isLoading ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Loading user...
          </div>
        ) : isAuthenticated && user ? (
          <NavUser user={data.user} />
        ) : (
          <div className="p-4 text-center text-sm text-muted-foreground">
            <a href="/signin" className="text-amber-600 hover:text-amber-700">
              Sign In
            </a>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
