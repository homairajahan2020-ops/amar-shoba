import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';

interface SendMoneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  currentBalance: number;
}

const amountSchema = z.number().positive({ message: "Amount must be greater than 0" }).max(1000000);
const emailSchema = z.string().trim().email({ message: "Invalid email address" });

export default function SendMoneyDialog({ open, onOpenChange, onSuccess, currentBalance }: SendMoneyDialogProps) {
  const [loading, setLoading] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');

  const validateForm = () => {
    try {
      emailSchema.parse(recipientEmail);
      const numAmount = parseFloat(amount);
      amountSchema.parse(numAmount);
      
      if (numAmount > currentBalance) {
        toast.error('অপর্যাপ্ত ব্যালেন্স / Insufficient balance');
        return false;
      }
      
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      // First, find the recipient user ID by email
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', recipientEmail)
        .maybeSingle();

      if (profileError) {
        toast.error('ত্রুটি ঘটেছে / Error occurred');
        return;
      }

      if (!profiles) {
        toast.error('প্রাপক পাওয়া যায়নি / Recipient not found');
        return;
      }

      // Call the transfer_money function
      const { data, error } = await supabase.rpc('transfer_money', {
        p_to_user_id: profiles.id,
        p_amount: parseFloat(amount),
      });

      if (error) {
        toast.error('লেনদেন ব্যর্থ / Transaction failed');
        return;
      }

      const result = data as { success: boolean; error?: string };

      if (result.success) {
        toast.success('টাকা সফলভাবে পাঠানো হয়েছে / Money sent successfully');
        setRecipientEmail('');
        setAmount('');
        onOpenChange(false);
        onSuccess();
      } else {
        toast.error(result.error || 'লেনদেন ব্যর্থ / Transaction failed');
      }
    } catch (error) {
      toast.error('ত্রুটি ঘটেছে / Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bengali">টাকা পাঠান / Send Money</DialogTitle>
          <DialogDescription>
            প্রাপকের ইমেইল এবং পরিমাণ লিখুন / Enter recipient's email and amount
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient" className="font-bengali">প্রাপকের ইমেইল / Recipient Email</Label>
            <Input
              id="recipient"
              type="email"
              placeholder="recipient@example.com"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="font-bengali">পরিমাণ / Amount (BDT)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              disabled={loading}
              min="0.01"
              max={currentBalance}
            />
            <p className="text-xs text-muted-foreground">
              <span className="font-bengali">উপলব্ধ ব্যালেন্স:</span> ৳{currentBalance.toFixed(2)}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="flex-1"
            >
              <span className="font-bengali">বাতিল / Cancel</span>
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  <span className="font-bengali">পাঠানো হচ্ছে...</span>
                </>
              ) : (
                <span className="font-bengali">পাঠান / Send</span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
