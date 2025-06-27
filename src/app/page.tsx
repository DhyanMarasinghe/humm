import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import PostCard from "@/components/post-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data for development
const mockPosts = [
  {
    id: "1",
    title: "Welcome to Humm! 🎉",
    content: "This is the beginning of something great. Share your thoughts, join communities, and connect with like-minded people.",
    author: "humm_team",
    community: "announcements",
    upvotes: 42,
    downvotes: 2,
    comments: 8,
    timeAgo: "2 hours ago"
  },
  {
    id: "2",
    title: "What are your favorite productivity tips?",
    content: "Looking for ways to stay focused and get more done. What works for you? I've been trying the Pomodoro technique lately and it's been helping a lot.",
    author: "productivity_guru",
    community: "productivity",
    upvotes: 156,
    downvotes: 12,
    comments: 34,
    timeAgo: "4 hours ago"
  },
  {
    id: "3",
    title: "Beautiful sunset from my backyard",
    content: "Nature never fails to amaze me. Thought I'd share this peaceful moment with everyone here.",
    author: "nature_lover",
    community: "photography",
    upvotes: 89,
    downvotes: 3,
    comments: 15,
    timeAgo: "6 hours ago"
  },
  {
    id: "4",
    title: "Anyone else excited about the new AI developments?",
    content: "The pace of innovation in AI is incredible. What are your thoughts on where we're heading? The possibilities seem endless.",
    author: "tech_enthusiast",
    community: "technology",
    upvotes: 234,
    downvotes: 18,
    comments: 67,
    timeAgo: "1 day ago"
  },
  {
    id: "5",
    title: "Recipe: Best chocolate chip cookies ever!",
    content: "After years of experimentation, I've finally perfected my chocolate chip cookie recipe. The secret is browning the butter first...",
    author: "baking_master",
    community: "cooking",
    upvotes: 445,
    downvotes: 7,
    comments: 89,
    timeAgo: "1 day ago"
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-card">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Welcome Card */}
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Welcome to Humm
                </h2>
                <p className="text-muted-foreground">
                  Discover communities, share your thoughts, and engage in meaningful discussions.
                  Join the conversation and connect with like-minded people.
                </p>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {mockPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center py-8">
              <Button variant="outline" size="lg">
                Load More Posts
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}