'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/ui/status-badge';
import { Mail, Phone, Building2, Shield, Smartphone, KeyRound, LogOut } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Profile" description="Your personal account and security settings." />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Avatar className="h-20 w-20"><AvatarFallback className="bg-primary/10 text-xl font-bold text-primary">AR</AvatarFallback></Avatar>
            <h2 className="mt-4 font-display text-xl font-bold">Aarav Reddy</h2>
            <p className="text-sm text-muted-foreground">Super Admin</p>
            <StatusBadge tone="success" className="mt-2">Active</StatusBadge>
            <div className="mt-5 w-full space-y-2 text-left text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" />aarav@complyflow.io</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" />+91 98765 43210</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Building2 className="h-4 w-4" />ComplyFlow HQ, Mumbai</div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div><label className="text-sm font-medium">Full name</label><input defaultValue="Aarav Reddy" className="mt-1.5 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm" /></div>
              <div><label className="text-sm font-medium">Email</label><input defaultValue="aarav@complyflow.io" className="mt-1.5 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm" /></div>
              <div><label className="text-sm font-medium">Phone</label><input defaultValue="+91 98765 43210" className="mt-1.5 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm" /></div>
              <div><label className="text-sm font-medium">Designation</label><input defaultValue="Compliance Head" className="mt-1.5 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm" /></div>
              <div className="sm:col-span-2"><Button size="sm">Save Changes</Button></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Security</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10 text-success"><Shield className="h-4.5 w-4.5" /></div><div><p className="text-sm font-medium">Two-factor authentication</p><p className="text-xs text-muted-foreground">Enabled via authenticator app</p></div></div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Smartphone className="h-4.5 w-4.5" /></div><div><p className="text-sm font-medium">Connected devices</p><p className="text-xs text-muted-foreground">3 active sessions</p></div></div>
                <Button variant="outline" size="sm">View</Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10 text-warning"><KeyRound className="h-4.5 w-4.5" /></div><div><p className="text-sm font-medium">Password</p><p className="text-xs text-muted-foreground">Last changed 42 days ago</p></div></div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive"><LogOut className="h-4 w-4" />Sign out of all sessions</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
