'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/dashboard/stat-card';
import { FileText, Clock, AlertTriangle, IndianRupee, Bell } from 'lucide-react';

const quarters = [
  { q: 'Q1 (Apr–Jun)', form: '24Q', due: '31 Jul 2026', status: 'in-progress' as const, deduction: '₹1.24L' },
  { q: 'Q2 (Jul–Sep)', form: '24Q', due: '31 Oct 2026', status: 'upcoming' as const, deduction: '—' },
  { q: 'Q3 (Oct–Dec)', form: '24Q', due: '31 Jan 2027', status: 'upcoming' as const, deduction: '—' },
  { q: 'Q4 (Jan–Mar)', form: '24Q', due: '31 May 2027', status: 'upcoming' as const, deduction: '—' },
];

const challans = [
  { id: 'CHQ2406123', date: '07 Jul 2026', amount: '₹42,500', bank: 'HDFC Bank', status: 'completed' as const },
  { id: 'CHQ2405234', date: '07 Jun 2026', amount: '₹38,200', bank: 'ICICI Bank', status: 'completed' as const },
  { id: 'CHQ2404345', date: '07 May 2026', amount: '₹41,000', bank: 'SBI', status: 'completed' as const },
];

const register = [
  { vendor: 'TechCorp Solutions', pan: 'AABCT1234C', section: '194J', amount: '₹50,000', rate: '10%', deduction: '₹5,000' },
  { vendor: 'Meta Digital Ltd', pan: 'AAMDM5678D', section: '194C', amount: '₹1,20,000', rate: '1%', deduction: '₹1,200' },
  { vendor: 'Cloudify Services', pan: 'AACLK9012E', section: '194J', amount: '₹80,000', rate: '10%', deduction: '₹8,000' },
  { vendor: 'Bright Consulting', pan: 'AABRC3456F', section: '194C', amount: '₹2,00,000', rate: '1%', deduction: '₹2,000' },
];

export default function TdsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="TDS Module" description="Quarterly returns, challans, deduction registers, and reminders.">
        <Button size="sm" className="gap-1.5"><Bell className="h-4 w-4" />Set Reminder</Button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Quarterly Returns" value="4" icon={FileText} tone="primary" />
        <StatCard label="Payment Due" value="₹1.24L" icon={IndianRupee} tone="warning" />
        <StatCard label="Pending Filing" value="1" icon={Clock} tone="warning" />
        <StatCard label="Late Interest" value="₹2,400" icon={AlertTriangle} tone="danger" />
      </div>

      <Tabs defaultValue="returns">
        <TabsList>
          <TabsTrigger value="returns">Quarterly Returns</TabsTrigger>
          <TabsTrigger value="challans">Challan Details</TabsTrigger>
          <TabsTrigger value="register">Deduction Register</TabsTrigger>
        </TabsList>

        <TabsContent value="returns" className="space-y-3">
          {quarters.map((q) => (
            <Card key={q.q}>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><FileText className="h-5 w-5" /></div>
                  <div>
                    <p className="font-medium">{q.q} · Form {q.form}</p>
                    <p className="text-xs text-muted-foreground">Due {q.due} · Deduction: {q.deduction}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge tone={q.status === 'in-progress' ? 'primary' : 'warning'}>
                    {q.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                  </StatusBadge>
                  <Button variant="outline" size="sm">Prepare</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="challans">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Challan ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Bank</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {challans.map((c) => (
                      <tr key={c.id} className="border-b border-border/60 last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-3 font-mono text-xs">{c.id}</td>
                        <td className="px-4 py-3">{c.date}</td>
                        <td className="px-4 py-3 font-medium">{c.amount}</td>
                        <td className="px-4 py-3 text-muted-foreground">{c.bank}</td>
                        <td className="px-4 py-3"><StatusBadge tone="success">Paid</StatusBadge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Vendor</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">PAN</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Section</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Rate</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">TDS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {register.map((r, i) => (
                      <tr key={i} className="border-b border-border/60 last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{r.vendor}</td>
                        <td className="px-4 py-3 font-mono text-xs">{r.pan}</td>
                        <td className="px-4 py-3"><span className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium">{r.section}</span></td>
                        <td className="px-4 py-3">{r.amount}</td>
                        <td className="px-4 py-3 text-muted-foreground">{r.rate}</td>
                        <td className="px-4 py-3 font-medium">{r.deduction}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
