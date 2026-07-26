'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/auth/auth-provider';
import { ShieldCheck, Mail, Lock, User, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password too short', { description: 'Use at least 6 characters.' });
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error) {
      toast.error('Sign up failed', { description: error });
      return;
    }
    toast.success('Account created!', { description: 'Check your email to confirm, then sign in.' });
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <span className="font-display text-xl font-bold">ComplyFlow</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl">Create your account</CardTitle>
          <CardDescription>Start your 14-day free trial. No credit card required.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative mt-1.5">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="pl-9" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.in" className="pl-9" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" className="pl-9" />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full gap-1.5">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating account…</> : 'Create Account'}
            </Button>
          </form>

          <ul className="mt-5 space-y-2">
            {['14-day free trial', 'No credit card required', 'Cancel anytime'].map((b) => (
              <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {b}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary">Sign in</Link>
          </p>
        </CardContent>
      </Card>

      <Link href="/" className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
    </div>
  );
}
