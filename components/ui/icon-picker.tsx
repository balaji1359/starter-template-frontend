"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/utils/cn"
import { ICON_OPTIONS } from "@/constants/icons"
import type { IconOption } from "@/constants/icons"

interface IconPickerProps {
  value: IconOption
  onChange: (value: IconOption) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm bg-white dark:bg-gray-950">
      <ScrollArea className="h-[100px]">
        <div className="p-3 grid grid-cols-6 gap-x-2 gap-y-4">
          {ICON_OPTIONS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => onChange(label)}
              className={cn(
                "flex flex-col items-center gap-1 group",
                value === label 
                  ? "text-black dark:text-white" 
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg transition-all duration-200",
                value === label 
                  ? "bg-gray-100 dark:bg-gray-800" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium truncate w-full text-center">{label}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
} 