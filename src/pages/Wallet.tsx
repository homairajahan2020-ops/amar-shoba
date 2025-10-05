import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDownLeft, CreditCard, Smartphone, Wallet as WalletIcon, History, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import SendMoneyDialog from '@/components/SendMoneyDialog';
import { Skeleton } from '@/components/ui/skeleton';

interface WalletData {
  balance: number;
  currency: string;
}

interface Transaction {
  id: string;
  from_user_id: string | null;
  to_user_id: string | null;
  amount: number;
  transaction_type: string;
  status: string;
  description: string | null;
  created_at: string;
}

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

export default function Wallet() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [profiles, setProfiles] = useState<Record<string, { full_name: string; email: string }>>({});
  const [loading, setLoading] = useState(true);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const fetchWalletData = async () => {
    if (!user) return;

    try {
      // Fetch wallet data
      const { data: walletData, error: walletError } = await supabase
        .from('wallets')
        .select('balance, currency')
        .eq('user_id', user.id)
        .maybeSingle();

      if (walletError) throw walletError;

      if (walletData) {
        setWallet(walletData);
      }

      // Fetch transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .or(`from_user_id.eq.${user.id},to_user_id.eq.${user.id}`)
        .order('created_at', { ascending: false })
        .limit(10);

      if (transactionsError) throw transactionsError;

      if (transactionsData) {
        setTransactions(transactionsData);
        
        // Fetch profiles for all users in transactions
        const userIds = new Set<string>();
        transactionsData.forEach(t => {
          if (t.from_user_id) userIds.add(t.from_user_id);
          if (t.to_user_id) userIds.add(t.to_user_id);
        });
        
        if (userIds.size > 0) {
          const { data: profilesData } = await supabase
            .from('profiles')
            .select('id, full_name, email')
            .in('id', Array.from(userIds));
          
          if (profilesData) {
            const profilesMap: Record<string, { full_name: string; email: string }> = {};
            profilesData.forEach(p => {
              profilesMap[p.id] = { full_name: p.full_name || '', email: p.email || '' };
            });
            setProfiles(profilesMap);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      toast.error('ডেটা লোড করতে ব্যর্থ / Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWalletData();
    }
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
    toast.success('লগআউট সফল / Logged out successfully');
  };

  const handlePaymentMethod = (method: string) => {
    toast(`${method} দিয়ে পেমেন্ট শীঘ্রই আসছে / Payment with ${method} coming soon`);
  };

  const handleQuickAction = (action: string) => {
    toast(`${action} বৈশিষ্ট্য শীঘ্রই আসছে / ${action} feature coming soon`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'আজ / Today';
    if (diffDays === 1) return 'গতকাল / Yesterday';
    return `${diffDays} দিন আগে / ${diffDays} days ago`;
  };

  if (authLoading || loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!user || !wallet) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-bengali">ওয়ালেট</h2>
          <p className="text-sm text-muted-foreground">Wallet</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
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
            <p className="text-4xl font-bold font-bengali mb-1">৳ {wallet.balance.toFixed(2)}</p>
            <p className="text-lg opacity-90">{wallet.currency} {wallet.balance.toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => setSendDialogOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white border-0"
            >
              <ArrowUpRight className="h-4 w-4 mr-2" />
              <span className="font-bengali">পাঠান</span>
            </Button>
            <Button 
              onClick={() => toast('টাকা গ্রহণের বৈশিষ্ট্য শীঘ্রই আসছে / Receive money feature coming soon')}
              className="bg-white/20 hover:bg-white/30 text-white border-0"
            >
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
              onClick={() => handlePaymentMethod(method.name)}
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
          <Card 
            onClick={() => handleQuickAction("Mobile Recharge")}
            className="cursor-pointer hover:shadow-card transition-shadow"
          >
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
          <Card 
            onClick={() => handleQuickAction("Bill Payment")}
            className="cursor-pointer hover:shadow-card transition-shadow"
          >
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
          {transactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              <span className="font-bengali">কোনো লেনদেন নেই</span> / No transactions yet
            </p>
          ) : (
            transactions.map((transaction) => {
              const isSent = transaction.from_user_id === user.id;
              const otherUserId = isSent ? transaction.to_user_id : transaction.from_user_id;
              const otherUser = otherUserId ? profiles[otherUserId] : null;
              const displayName = otherUser?.full_name || otherUser?.email || 'Unknown';
              
              return (
                <div 
                  key={transaction.id} 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      isSent
                        ? 'bg-destructive/10 text-destructive' 
                        : 'bg-success/10 text-success'
                    }`}>
                      {isSent
                        ? <ArrowUpRight className="h-5 w-5" />
                        : <ArrowDownLeft className="h-5 w-5" />
                      }
                    </div>
                    <div>
                      <p className="font-medium">{displayName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(transaction.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold font-bengali ${
                      isSent ? 'text-destructive' : 'text-success'
                    }`}>
                      {isSent ? '-' : '+'}৳ {transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {wallet.currency} {transaction.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      <SendMoneyDialog 
        open={sendDialogOpen} 
        onOpenChange={setSendDialogOpen}
        onSuccess={fetchWalletData}
        currentBalance={wallet.balance}
      />
    </div>
  );
}
