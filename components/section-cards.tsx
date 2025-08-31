import { TrendingDownIcon, TrendingUpIcon, Link, Bookmark, Users, Activity } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:shadow-xs grid grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-yellow-50 *:data-[slot=card]:to-white dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card border-yellow-200 hover:border-yellow-300 transition-colors">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2 text-amber-700">
            <Link className="h-4 w-4" />
            Total Links
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-amber-800">
            2,847
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs border-yellow-300 text-yellow-700">
              <TrendingUpIcon className="size-3" />
              +18.2%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-amber-700">
            Growing link collection <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Added 432 links this month
          </div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card border-yellow-200 hover:border-yellow-300 transition-colors">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2 text-amber-700">
            <Bookmark className="h-4 w-4" />
            Collections
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-amber-800">
            156
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs border-yellow-300 text-yellow-700">
              <TrendingUpIcon className="size-3" />
              +8.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-amber-700">
            Organized collections <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Created 12 new collections
          </div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card border-yellow-200 hover:border-yellow-300 transition-colors">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2 text-amber-700">
            <Users className="h-4 w-4" />
            Team Members
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-amber-800">
            24
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs border-yellow-300 text-yellow-700">
              <TrendingUpIcon className="size-3" />
              +2
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-amber-700">
            Growing team <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Added 2 new members
          </div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card border-yellow-200 hover:border-yellow-300 transition-colors">
        <CardHeader className="relative">
          <CardDescription className="flex items-center gap-2 text-amber-700">
            <Activity className="h-4 w-4" />
            Activity Score
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-amber-800">
            94.2%
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs border-yellow-300 text-yellow-700">
              <TrendingUpIcon className="size-3" />
              +2.1%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-amber-700">
            High engagement <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Above target performance
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
