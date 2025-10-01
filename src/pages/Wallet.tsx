import { ArrowUpRight, ArrowDownLeft, CreditCard, Smartphone, Wallet as WalletIcon, History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const paymentMethods = [
  {
    id: 1,
    name: "bKash",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO5VfQOE4rLjl-ZfWE3_ihx-WJLZSEqPQ0jA&s",
    color: "bg-[#E2136E]"
  },
  {
    id: 2,
    name: "Nagad",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUd_XEVPPECqjvkCJJzDXMpFZ8YiIqz52HLg&s",
    color: "bg-[#ED1C24]"
  },
  {
    id: 3,
    name: "Rocket",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTthFYIH4lMLJmLVz_t5f_x5sOnHlUQ46kFgg&s",
    color: "bg-[#8B2EE2]"
  }
];

const recentTransactions = [
  {
    id: 1,
    type: "send",
    recipient: "রহিম আহমেদ",
    recipientEn: "Rahim Ahmed",
    amount: "৫০০",
    amountEn: "500",
    date: "আজ",
    dateEn: "Today"
  },
  {
    id: 2,
    type: "receive",
    recipient: "সাদিয়া খান",
    recipientEn: "Sadia Khan",
    amount: "১,২০০",
    amountEn: "1,200",
    date: "গতকাল",
    dateEn: "Yesterday"
  },
  {
    id: 3,
    type: "send",
    recipient: "বিদ্যুৎ বিল",
    recipientEn: "Electricity Bill",
    amount: "২,৫০০",
    amountEn: "2,500",
    date: "২ দিন আগে",
    dateEn: "2 days ago"
  }
];

export default function Wallet() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-bengali">ওয়ালেট</h2>
        <p className="text-sm text-muted-foreground">Wallet</p>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <WalletIcon className="h-5 w-5" />
            <p className="text-sm opacity-90 font-bengali">মোট ব্যালেন্স</p>
            <p className="text-xs opacity-75">Total Balance</p>
          </div>
          <div className="mb-6">
            <p className="text-4xl font-bold font-bengali mb-1">৳ ১৫,৪৫০</p>
            <p className="text-lg opacity-90">BDT 15,450</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-white/20 hover:bg-white/30 text-white border-0">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              <span className="font-bengali">পাঠান</span>
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 text-white border-0">
              <ArrowDownLeft className="h-4 w-4 mr-2" />
              <span className="font-bengali">গ্রহণ</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="font-bengali">পেমেন্ট মাধ্যম</span>
          <span className="text-sm text-muted-foreground">Payment Methods</span>
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {paymentMethods.map((method) => (
            <Card 
              key={method.id} 
              className="cursor-pointer hover:shadow-card transition-shadow"
            >
              <CardContent className="p-4 text-center">
                <div className={`${method.color} h-12 w-12 rounded-lg mx-auto mb-2 flex items-center justify-center overflow-hidden`}>
                  <img 
                    src={method.icon} 
                    alt={method.name}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <p className="text-sm font-medium">{method.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="font-bengali">দ্রুত অ্যাকশন</span>
          <span className="text-sm text-muted-foreground">Quick Actions</span>
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Card className="cursor-pointer hover:shadow-card transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium font-bengali">মোবাইল রিচার্জ</p>
                <p className="text-xs text-muted-foreground">Mobile Recharge</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-card transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium font-bengali">বিল পেমেন্ট</p>
                <p className="text-xs text-muted-foreground">Bill Payment</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            <span className="font-bengali">সাম্প্রতিক লেনদেন</span>
            <span className="text-sm text-muted-foreground font-normal">Recent Transactions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'send' 
                    ? 'bg-destructive/10 text-destructive' 
                    : 'bg-success/10 text-success'
                }`}>
                  {transaction.type === 'send' 
                    ? <ArrowUpRight className="h-5 w-5" />
                    : <ArrowDownLeft className="h-5 w-5" />
                  }
                </div>
                <div>
                  <p className="font-medium font-bengali">{transaction.recipient}</p>
                  <p className="text-xs text-muted-foreground">{transaction.recipientEn}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <span className="font-bengali">{transaction.date}</span> • {transaction.dateEn}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold font-bengali ${
                  transaction.type === 'send' ? 'text-destructive' : 'text-success'
                }`}>
                  {transaction.type === 'send' ? '-' : '+'}৳ {transaction.amount}
                </p>
                <p className="text-xs text-muted-foreground">
                  BDT {transaction.amountEn}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
