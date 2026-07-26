'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Smartphone, Bell, Calendar, Palette, Globe, Lock, KeyRound } from 'lucide-react';

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = React.useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${on ? 'bg-primary' : 'bg-muted'}`}
    >
      <span className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${on ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-4 last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Settings" description="Configure notifications, branding, security, and integrations." />

      <Tabs defaultValue="notifications">
        <TabsList className="flex-wrap">
          <TabsTrigger value="notifications" className="gap-1.5"><Bell className="h-3.5 w-3.5" />Notifications</TabsTrigger>
          <TabsTrigger value="calendar" className="gap-1.5"><Calendar className="h-3.5 w-3.5" />Calendar</TabsTrigger>
          <TabsTrigger value="branding" className="gap-1.5"><Palette className="h-3.5 w-3.5" />Branding</TabsTrigger>
          <TabsTrigger value="localization" className="gap-1.5"><Globe className="h-3.5 w-3.5" />Localization</TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5"><Lock className="h-3.5 w-3.5" />Security</TabsTrigger>
          <TabsTrigger value="api" className="gap-1.5"><KeyRound className="h-3.5 w-3.5" />API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card className="max-w-2xl">
            <CardHeader><CardTitle className="text-base">Notification Channels</CardTitle><CardDescription className="text-xs">Choose how reminders are delivered.</CardDescription></CardHeader>
            <CardContent>
              <Field label="Email notifications" hint="Send reminders via SMTP"><Toggle defaultOn /></Field>
              <Field label="SMS notifications" hint="Send reminders via SMS gateway"><Toggle defaultOn /></Field>
              <Field label="WhatsApp Business" hint="Ready to connect"><Toggle /></Field>
              <Field label="Push notifications" hint="Browser push alerts"><Toggle defaultOn /></Field>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card className="max-w-2xl">
            <CardHeader><CardTitle className="text-base">Working Days & Holidays</CardTitle><CardDescription className="text-xs">Deadline calculations skip non-working days.</CardDescription></CardHeader>
            <CardContent>
              <Field label="Monday – Friday" hint="Standard working days"><Toggle defaultOn /></Field>
              <Field label="Saturday" hint="Half-day working"><Toggle /></Field>
              <Field label="Sunday" hint="Non-working"><Toggle /></Field>
              <Field label="Public holidays" hint="Indian holiday calendar auto-applied"><Toggle defaultOn /></Field>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card className="max-w-2xl">
            <CardHeader><CardTitle className="text-base">Company Branding</CardTitle><CardDescription className="text-xs">Customize how ComplyFlow looks for your team.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Workspace name</label>
                <Input defaultValue="ComplyFlow" className="mt-1.5" />
              </div>
              <div>
                <label className="text-sm font-medium">Primary color</label>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg border border-border bg-primary" />
                  <Input defaultValue="#2563EB" className="max-w-[140px] font-mono" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Theme</label>
                <div className="mt-1.5 flex gap-2">
                  <div className="flex-1 rounded-lg border-2 border-primary bg-white p-3 text-center text-xs font-medium">Light</div>
                  <div className="flex-1 rounded-lg border border-border bg-zinc-900 p-3 text-center text-xs font-medium text-white">Dark</div>
                  <div className="flex-1 rounded-lg border border-border bg-gradient-to-br from-white to-zinc-900 p-3 text-center text-xs font-medium">System</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="localization">
          <Card className="max-w-2xl">
            <CardHeader><CardTitle className="text-base">Language & Region</CardTitle></CardHeader>
            <CardContent>
              <Field label="Language" hint="Interface language"><select className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm"><option>English (India)</option><option>हिन्दी</option><option>தமிழ்</option></select></Field>
              <Field label="Time zone" hint="Used for all deadline calculations"><select className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm"><option>Asia/Kolkata (IST)</option><option>Asia/Dubai (GST)</option><option>Asia/Singapore (SGT)</option></select></Field>
              <Field label="Date format" hint="How dates appear across the app"><select className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm"><option>DD MMM YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></Field>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="max-w-2xl">
            <CardHeader><CardTitle className="text-base">Security</CardTitle><CardDescription className="text-xs">Protect your workspace and user accounts.</CardDescription></CardHeader>
            <CardContent>
              <Field label="Enable MFA" hint="Require two-factor for all admins"><Toggle defaultOn /></Field>
              <Field label="Password policy" hint="Min 12 chars, 1 special, 1 number"><Toggle defaultOn /></Field>
              <Field label="Session timeout" hint="Auto sign-out after 30 min idle"><Toggle defaultOn /></Field>
              <Field label="CSRF protection" hint="Cross-site request forgery tokens"><Toggle defaultOn /></Field>
              <Field label="Rate limiting" hint="Throttle API requests per user"><Toggle defaultOn /></Field>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="max-w-2xl">
            <CardHeader><CardTitle className="text-base">API Keys</CardTitle><CardDescription className="text-xs">Generate keys to integrate with MCA, GST, and Income Tax portals.</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {['Production', 'Sandbox'].map((env) => (
                <div key={env} className="flex items-center justify-between rounded-xl border border-border p-3">
                  <div>
                    <p className="text-sm font-medium">{env}</p>
                    <p className="font-mono text-xs text-muted-foreground">cf_{env === 'Production' ? 'live' : 'test'}_••••••••••••••••3f9a</p>
                  </div>
                  <Button variant="outline" size="sm">Rotate</Button>
                </div>
              ))}
              <Button size="sm" className="gap-1.5"><KeyRound className="h-4 w-4" />Generate New Key</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
