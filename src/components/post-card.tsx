"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Post {
  id: string
  title: string
  content: string
  author: string
  community: string
  upvotes: number
  downvotes: number
  comments: number
  timeAgo: string
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoggedIn] = useState(false)

  const handleVote = (voteType: "up" | "down") => {
    if (!isLoggedIn) {
      console.log("Show auth modal")
      return
    }

    if (userVote === voteType) {
      setUserVote(null)
    } else {
      setUserVote(voteType)
    }
  }

  const handleComment = () => {
    if (!isLoggedIn) {
      console.log("Show auth modal")
      return
    }
    console.log("Navigate to post detail")
  }

  const handleBookmark = () => {
    if (!isLoggedIn) {
      console.log("Show auth modal")
      return
    }
    setIsBookmarked(!isBookmarked)
  }

  const getVoteScore = () => {
    let score = post.upvotes - post.downvotes
    if (userVote === "up") score += 1
    if (userVote === "down") score -= 1
    return score
  }

  const formatScore = (score: number) => {
    if (score >= 1000) {
      return `${(score / 1000).toFixed(1)}k`
    }
    return score.toString()
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex">
          {/* Vote Section */}
          <div className="flex flex-col items-center p-3 bg-muted/30 rounded-l-lg">
            <Button
              variant={userVote === "up" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8 mb-1"
              onClick={() => handleVote("up")}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            
            <span className={`text-sm font-medium ${
              userVote === "up" 
                ? "text-orange-500" 
                : userVote === "down" 
                  ? "text-blue-500" 
                  : "text-foreground"
            }`}>
              {formatScore(getVoteScore())}
            </span>
            
            <Button
              variant={userVote === "down" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8 mt-1"
              onClick={() => handleVote("down")}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4">
            {/* Post Header */}
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
              <Badge variant="secondary" className="text-xs">
                c/{post.community}
              </Badge>
              <span>•</span>
              <span>Posted by u/{post.author}</span>
              <span>•</span>
              <span>{post.timeAgo}</span>
            </div>

            {/* Post Title */}
            <h2 className="text-lg font-semibold mb-2 leading-tight hover:text-primary cursor-pointer">
              {post.title}
            </h2>

            {/* Post Content */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-3">
              {post.content}
            </p>

            {/* Post Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleComment}
                className="text-muted-foreground hover:text-foreground"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {post.comments} Comments
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className={`text-muted-foreground hover:text-foreground ${
                  isBookmarked ? "text-primary" : ""
                }`}
              >
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Hide Post</DropdownMenuItem>
                  <DropdownMenuItem>Report</DropdownMenuItem>
                  <DropdownMenuItem>Block User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}