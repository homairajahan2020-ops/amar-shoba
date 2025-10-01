import { Search, Phone, Video, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const mockChats = [
  {
    id: 1,
    name: "পরিবার",
    nameEn: "Family",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=family",
    lastMessage: "আগামীকাল দেখা হবে",
    lastMessageEn: "See you tomorrow",
    time: "১০:৩০",
    unread: 3,
    online: true
  },
  {
    id: 2,
    name: "অফিস টিম",
    nameEn: "Office Team",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=office",
    lastMessage: "মিটিং ৩টায় শুরু হবে",
    lastMessageEn: "Meeting starts at 3pm",
    time: "০৯:১৫",
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: "সাদিয়া",
    nameEn: "Sadia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sadia",
    lastMessage: "ধন্যবাদ!",
    lastMessageEn: "Thank you!",
    time: "গতকাল",
    unread: 0,
    online: true
  },
  {
    id: 4,
    name: "রহিম",
    nameEn: "Rahim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahim",
    lastMessage: "প্রজেক্ট কেমন চলছে?",
    lastMessageEn: "How's the project going?",
    time: "গতকাল",
    unread: 1,
    online: false
  }
];

export default function Messages() {
  const handleChatClick = (chatName: string) => {
    toast(`${chatName} এর সাথে চ্যাট খোলা হচ্ছে / Opening chat with ${chatName}`);
  };

  const handleCall = (chatName: string) => {
    toast(`${chatName} কে কল করা হচ্ছে / Calling ${chatName}`);
  };

  const handleVideoCall = (chatName: string) => {
    toast(`${chatName} এর সাথে ভিডিও কল / Video calling ${chatName}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold font-bengali">বার্তা</h2>
        <p className="text-sm text-muted-foreground">Messages</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="খুঁজুন... / Search..." 
          className="pl-10 font-bengali"
        />
      </div>

      {/* Chat List */}
      <div className="space-y-2">
        {mockChats.map((chat) => (
          <Card 
            key={chat.id} 
            onClick={() => handleChatClick(chat.nameEn)}
            className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                {chat.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-card" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold font-bengali">{chat.name}</h3>
                    <p className="text-xs text-muted-foreground">{chat.nameEn}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {chat.time}
                    </span>
                    {chat.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground h-5 min-w-5 rounded-full p-1 text-xs">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-1">
                  <p className="text-sm text-muted-foreground font-bengali truncate">
                    {chat.lastMessage}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {chat.lastMessageEn}
                  </p>
                </div>
              </div>

              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCall(chat.nameEn);
                  }}
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoCall(chat.nameEn);
                  }}
                >
                  <Video className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast("বিকল্প শীঘ্রই আসছে / Options coming soon");
                  }}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
