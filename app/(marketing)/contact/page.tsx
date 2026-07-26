'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [submitting, setSubmitting] = React.useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Message sent!', { description: 'Our team will get back to you within 24 hours.' });
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Contact</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">Let's talk compliance</h1>
        <p className="mt-4 text-muted-foreground">
          Questions about a service, a custom plan for your firm, or a demo? We're here to help.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4">
          {[
            { icon: Mail, label: 'Email', value: 'hello@complyflow.io' },
            { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
            { icon: MapPin, label: 'Office', value: 'Mumbai, India' },
            { icon: Clock, label: 'Hours', value: 'Mon–Sat, 9 AM – 7 PM IST' },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="text-sm font-medium">{c.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input required className="mt-1.5" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input required type="email" className="mt-1.5" placeholder="you@company.in" />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input className="mt-1.5" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="text-sm font-medium">Company</label>
                  <Input className="mt-1.5" placeholder="Company name" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can we help?"
                  className="mt-1.5 w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <Button type="submit" disabled={submitting} className="gap-1.5">
                {submitting ? 'Sending…' : <><Send className="h-4 w-4" /> Send Message</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
