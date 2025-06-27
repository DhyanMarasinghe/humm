"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, TrendingUp, Compass, Clock, Users, Globe, Hash, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Sidebar() {
  const [isRecentOpen, setIsRecentOpen] = useState(false)
  const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(true)
  const [isTopicsOpen, setIsTopicsOpen] = useState(false)

  const joinedCommunities = [
    { name: "productivity", members: "12.4k", color: "bg-blue-500" },
    { name: "photography", members: "8.9k", color: "bg-green-500" },
    { name: "announcements", members: "45.2k", color: "bg-purple-500" },
  ]

  const popularCommunities = [
    { name: "technology", members: "156k", trending: true },
    { name: "cooking", members: "89k" },
    { name: "fitness", members: "67k" },
    { name: "music", members: "134k" },
    { name: "books", members: "78k" },
  ]

  const topics = [
    "Technology", "Science", "Art", "Sports", "Gaming", "Food", "Travel", "Health"
  ]

  return (
    <div className="w-64 border-r bg-card sticky top-16 h-[calc(100vh-4rem)]">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-2">
          {/* Main Navigation */}
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <TrendingUp className="mr-3 h-4 w-4 text-orange-500" />
              Popular
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Compass className="mr-3 h-4 w-4 text-blue-500" />
              Explore
            </Button>
            
            {/* Recent Dropdown */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => setIsRecentOpen(!isRecentOpen)}
              >
                <div className="flex items-center">
                  <Clock className="mr-3 h-4 w-4 text-muted-foreground" />
                  Recent
                </div>
                {isRecentOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {isRecentOpen && (
                <div className="ml-6 mt-1 space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                    Welcome to Humm! 🎉
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                    Productivity tips discussion
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                    Beautiful sunset photo
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Communities */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between"
              onClick={() => setIsCommunitiesOpen(!isCommunitiesOpen)}
            >
              <div className="flex items-center">
                <Users className="mr-3 h-4 w-4 text-green-500" />
                Your Communities
              </div>
              {isCommunitiesOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            {isCommunitiesOpen && (
              <div className="ml-6 mt-1 space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start text-primary">
                  <Plus className="mr-2 h-3 w-3" />
                  Create Community
                </Button>
                {joinedCommunities.map((community) => (
                  <div key={community.name} className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                    <div className={`h-3 w-3 rounded-full ${community.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">c/{community.name}</div>
                      <div className="text-xs text-muted-foreground">{community.members} members</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button variant="ghost" className="w-full justify-start">
            <Globe className="mr-3 h-4 w-4 text-indigo-500" />
            All Communities
          </Button>

          <Separator />

          {/* Topics */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between"
              onClick={() => setIsTopicsOpen(!isTopicsOpen)}
            >
              <div className="flex items-center">
                <Hash className="mr-3 h-4 w-4 text-pink-500" />
                Topics
              </div>
              {isTopicsOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            {isTopicsOpen && (
              <div className="ml-6 mt-1 space-y-1">
                {topics.map((topic) => (
                  <Button
                    key={topic}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-muted-foreground"
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Popular Communities */}
          <div className="space-y-1">
            <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Popular Communities
            </h3>
            {popularCommunities.map((community) => (
              <div
                key={community.name}
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                    <span className="text-xs font-bold">
                      {community.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium">c/{community.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {community.trending && (
                    <TrendingUp className="h-3 w-3 text-orange-500" />
                  )}
                  <span className="text-xs text-muted-foreground">{community.members}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}