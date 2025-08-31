"use client"

import { cn } from "@/utils/cn"

export const colorOptions = [
  { value: "violet", label: "Violet", class: "bg-violet-500" },
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "emerald", label: "Emerald", class: "bg-emerald-500" },
  { value: "amber", label: "Amber", class: "bg-amber-500" },
  { value: "rose", label: "Rose", class: "bg-rose-500" },
  { value: "slate", label: "Slate", class: "bg-slate-500" },
]

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
  showNoneOption?: boolean
}

export function ColorPicker({ value, onChange, showNoneOption = true }: ColorPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-1.5 p-2 border border-gray-200/50 dark:border-gray-700/50 rounded-md bg-white/50 dark:bg-gray-800/50">
      {colorOptions.map((color) => (
        <button
          key={color.value}
          type="button"
          onClick={() => onChange(color.value)}
          className={cn(
            "flex items-center gap-2 p-1.5 rounded-md border transition-all",
            value === color.value
              ? "border-purple-500 bg-purple-50/50 dark:bg-purple-500/20"
              : "border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600",
          )}
        >
          <div className={cn("w-3 h-3 rounded-full", color.class)} />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{color.label}</span>
        </button>
      ))}
      {showNoneOption && value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="flex items-center gap-2 p-1.5 rounded-md border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300"
        >
          <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs font-medium">None</span>
        </button>
      )}
    </div>
  )
} 