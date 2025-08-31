"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { clearDiscoverCache } from '@/hooks/use-discover-lazy'

export function DiscoverCacheDebug() {
  const handleClearCache = () => {
    clearDiscoverCache()
    window.location.reload()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-sm">Discover Cache Debug</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleClearCache}
          variant="outline"
          size="sm"
          className="w-full"
        >
          Clear Cache & Reload
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Check browser console for cache logs
        </p>
      </CardContent>
    </Card>
  )
}
