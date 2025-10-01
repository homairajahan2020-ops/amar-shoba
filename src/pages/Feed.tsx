import { Heart, MessageCircle, Share2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

const mockPosts = [
  {
    id: 1,
    author: "রহিম আহমেদ",
    authorEn: "Rahim Ahmed",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahim",
    time: "২ ঘন্টা আগে",
    timeEn: "2 hours ago",
    content: "ঢাকায় আজকের সুন্দর সন্ধ্যা! 🌆",
    contentEn: "Beautiful evening in Dhaka today!",
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&h=600&fit=crop",
    likes: 245,
    comments: 32,
    shares: 12
  },
  {
    id: 2,
    author: "সাদিয়া খান",
    authorEn: "Sadia Khan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sadia",
    time: "৫ ঘন্টা আগে",
    timeEn: "5 hours ago",
    content: "নতুন রেসিপি চেষ্টা করলাম! কাচ্চি বিরিয়ানি 🍛",
    contentEn: "Tried a new recipe! Kacchi Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop",
    likes: 389,
    comments: 54,
    shares: 23
  },
  {
    id: 3,
    author: "করিম মিয়া",
    authorEn: "Karim Mia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karim",
    time: "১ দিন আগে",
    timeEn: "1 day ago",
    content: "আমাদের নতুন স্টার্টআপ লঞ্চ হয়েছে! 🚀",
    contentEn: "Our new startup has launched!",
    likes: 567,
    comments: 89,
    shares: 45
  }
];

export default function Feed() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const handleLike = (postId: number) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
      toast("লাইক সরানো হয়েছে / Like removed");
    } else {
      newLiked.add(postId);
      toast("লাইক করা হয়েছে / Post liked");
    }
    setLikedPosts(newLiked);
  };

  const handleComment = (postId: number) => {
    toast("মন্তব্য বৈশিষ্ট্য শীঘ্রই আসছে / Comment feature coming soon");
  };

  const handleShare = (postId: number) => {
    toast("শেয়ার বৈশিষ্ট্য শীঘ্রই আসছে / Share feature coming soon");
  };

  const handleCreatePost = () => {
    toast("পোস্ট তৈরি বৈশিষ্ট্য শীঘ্রই আসছে / Create post feature coming soon");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-bengali">আপনার ফিড</h2>
        <p className="text-sm text-muted-foreground">Your Feed</p>
      </div>

      {/* Create Post Card */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
              <AvatarFallback>আপ</AvatarFallback>
            </Avatar>
            <button 
              onClick={handleCreatePost}
              className="flex-1 text-left px-4 py-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              আপনার মনে কি আছে? / What's on your mind?
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      {mockPosts.map((post) => (
        <Card key={post.id} className="shadow-card overflow-hidden">
          <CardHeader className="p-4 pb-3">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src={post.avatar} />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold font-bengali">{post.author}</h3>
                  <p className="text-xs text-muted-foreground">{post.authorEn}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="font-bengali">{post.time}</span> • {post.timeEn}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="px-4 pb-3">
              <p className="font-bengali text-base mb-1">{post.content}</p>
              <p className="text-sm text-muted-foreground">{post.contentEn}</p>
            </div>
            {post.image && (
              <img 
                src={post.image} 
                alt="Post content" 
                className="w-full object-cover max-h-96"
              />
            )}
          </CardContent>

          <CardFooter className="p-4 pt-3 flex-col gap-3">
            <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
              <span>{post.likes} লাইক • {post.likes} Likes</span>
              <span>{post.comments} মন্তব্য • {post.comments} Comments</span>
            </div>
            <div className="grid grid-cols-3 gap-2 w-full">
              <Button 
                variant="ghost" 
                onClick={() => handleLike(post.id)}
                className={`gap-2 hover:bg-primary/10 hover:text-primary ${
                  likedPosts.has(post.id) ? 'text-primary' : ''
                }`}
              >
                <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                <span className="text-sm">লাইক</span>
              </Button>
              <Button 
                variant="ghost"
                onClick={() => handleComment(post.id)}
                className="gap-2 hover:bg-primary/10 hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">মন্তব্য</span>
              </Button>
              <Button 
                variant="ghost"
                onClick={() => handleShare(post.id)}
                className="gap-2 hover:bg-primary/10 hover:text-primary"
              >
                <Share2 className="h-4 w-4" />
                <span className="text-sm">শেয়ার</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
