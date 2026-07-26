'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, MessageSquare, Smartphone, Bell, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

const alerts = [
  { id: 'n1', title: 'AOC-4 filing is overdue', company: 'Bluepeak Inc', channel: 'email', time: '2h ago', tone: 'danger' as const, read: false },
  { id: 'n2', title: 'GSTR-3B due in 3 days', company: 'Acme Pvt Ltd', channel: 'email', time: '5h ago', tone: 'warning' as const, read: false },
  { id: 'n3', title: 'TDS challan payment confirmed', company: 'Nimbus Tech LLP', channel: 'sms', time: '1d ago', tone: 'success' as const, read: false },
  { id: 'n4', title: 'GSTR-1 due in 2 days', company: 'Acme Pvt Ltd', channel: 'push', time: '1d ago', tone: 'warning' as const, read: true },
  { id: 'n5', title: 'New document uploaded', company: 'Vertex Labs', channel: 'email', time: '2d ago', tone: 'primary' as const, read: true },
];

const schedule = [
  { days: '7 days before', desc: 'Initial reminder sent', enabled: true },
  { days: '3 days before', desc: 'Follow-up reminder', enabled: true },
  { days: '1 day before', desc: 'Urgent reminder', enabled: true },
  { days: 'Due today', desc: 'Final reminder', enabled: true },
  { days: 'Overdue', desc: 'Daily escalation', enabled: true },
];

const channels = [
  { name: 'Email', icon: Mail, desc: 'SMTP configured', status: 'connected' as const },
  { name: 'SMS', icon: Smartphone, desc: 'Gateway connected', status: 'connected' as const },
  { name: 'WhatsApp', icon: MessageSquare, desc: 'Business API ready', status: 'ready' as const },
  { name: 'Push', icon: Bell, desc: 'Web push enabled', status: 'connected' as const },
];

export default function AlertsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Alerts & Notifications" description="Automated reminders across email, SMS, WhatsApp, and push." />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {channels.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.name}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4.5 w-4.5" /></div>
                  <StatusBadge tone={c.status === 'connected' ? 'success' : 'warning'}>{c.status === 'connected' ? 'Active' : 'Ready'}</StatusBadge>
                </div>
                <p className="mt-3 text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="center">
        <TabsList>
          <TabsTrigger value="center">Notification Center</TabsTrigger>
          <TabsTrigger value="schedule">Reminder Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="center">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {alerts.map((a) => (
                  <div key={a.id} className={`flex items-start gap-3 p-4 transition-colors hover:bg-muted/30 ${!a.read ? 'bg-primary/[0.03]' : ''}`}>
                    <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${a.tone === 'danger' ? 'bg-destructive/10 text-destructive' : a.tone === 'warning' ? 'bg-warning/10 text-warning' : a.tone === 'success' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                      {a.tone === 'danger' ? <AlertTriangle className="h-4.5 w-4.5" /> : a.tone === 'success' ? <CheckCircle2 className="h-4.5 w-4.5" /> : <Bell className="h-4.5 w-4.5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.company} · via {a.channel}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
                    {!a.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="max-w-lg">
            <CardContent className="space-y-2 p-5">
              {schedule.map((s) => (
                <div key={s.days} className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{s.days}</p>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                  <div className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${s.enabled ? 'bg-primary' : 'bg-muted'}`}>
                    <span className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${s.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
