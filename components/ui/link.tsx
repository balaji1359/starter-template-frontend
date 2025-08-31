import * as React from "react"
import NextLink from "next/link"
import { cn } from "@/utils/cn"

const Link = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof NextLink>
>(({ className, ...props }, ref) => {
  return (
    <NextLink
      className={cn(
        "text-primary underline-offset-4 hover:underline",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Link.displayName = "Link"

export { Link } 