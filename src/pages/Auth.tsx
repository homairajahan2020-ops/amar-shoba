import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Wallet, Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().trim().email({ message: "Invalid email address" });
const passwordSchema = z.string().min(6, { message: "Password must be at least 6 characters" });
const nameSchema = z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100);

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const validateForm = () => {
    try {
      emailSchema.parse(formData.email);
      passwordSchema.parse(formData.password);
      if (!isLogin) {
        nameSchema.parse(formData.fullName);
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
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('ভুল ইমেইল বা পাসওয়ার্ড / Invalid email or password');
          } else {
            toast.error(error.message);
          }
          return;
        }

        if (data.user) {
          toast.success('সফলভাবে লগইন হয়েছে / Successfully logged in');
          navigate('/wallet');
        }
      } else {
        const redirectUrl = `${window.location.origin}/wallet`;
        
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: formData.fullName,
            },
          },
        });

        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('এই ইমেইল ইতিমধ্যে নিবন্ধিত / Email already registered');
          } else {
            toast.error(error.message);
          }
          return;
        }

        if (data.user) {
          toast.success('অ্যাকাউন্ট তৈরি হয়েছে! / Account created successfully!');
          navigate('/wallet');
        }
      }
    } catch (error) {
      toast.error('একটি ত্রুটি ঘটেছে / An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-subtle">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">
            <span className="font-bengali">{isLogin ? 'লগইন করুন' : 'নিবন্ধন করুন'}</span>
          </CardTitle>
          <CardDescription>
            {isLogin ? 'Login to your account' : 'Create a new account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="font-bengali">পূর্ণ নাম / Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="আপনার নাম লিখুন / Enter your name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required={!isLogin}
                  disabled={loading}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bengali">ইমেইল / Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-bengali">পাসওয়ার্ড / Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="font-bengali">অপেক্ষা করুন... / Loading...</span>
              ) : (
                <span className="font-bengali">{isLogin ? 'লগইন' : 'নিবন্ধন'} / {isLogin ? 'Login' : 'Sign Up'}</span>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground font-bengali">
              {isLogin ? 'অ্যাকাউন্ট নেই?' : 'ইতিমধ্যে অ্যাকাউন্ট আছে?'}
            </span>
            {' '}
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
              onClick={() => setIsLogin(!isLogin)}
              disabled={loading}
            >
              <span className="font-bengali">{isLogin ? 'নিবন্ধন করুন' : 'লগইন করুন'}</span>
              {' / '}
              {isLogin ? 'Sign Up' : 'Login'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
