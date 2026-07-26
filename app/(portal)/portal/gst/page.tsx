'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/dashboard/stat-card';
import { Receipt, Upload, Download, Calculator, FileCheck2, Clock, AlertTriangle } from 'lucide-react';
import { companies } from '@/lib/mock-data';

const returns = [
  { form: 'GSTR-1', desc: 'Outward supplies', due: '11 Aug 2026', status: 'upcoming' as const, filed: 'Jul 2026' },
  { form: 'GSTR-3B', desc: 'Monthly summary', due: '20 Aug 2026', status: 'upcoming' as const, filed: 'Jul 2026' },
  { form: 'GSTR-9', desc: 'Annual return', due: '31 Dec 2026', status: 'upcoming' as const, filed: 'FY 2024-25' },
];

const history = [
  { period: 'Jun 2026', form: 'GSTR-1', ack: 'ACK272612345', date: '10 Jul 2026', status: 'completed' as const },
  { period: 'Jun 2026', form: 'GSTR-3B', ack: 'ACK272612346', date: '18 Jul 2026', status: 'completed' as const },
  { period: 'May 2026', form: 'GSTR-1', ack: 'ACK272523901', date: '09 Jun 2026', status: 'completed' as const },
  { period: 'May 2026', form: 'GSTR-3B', ack: 'ACK272523902', date: '17 Jun 2026', status: 'completed' as const },
  { period: 'Apr 2026', form: 'GSTR-1', ack: 'ACK272411234', date: '11 May 2026', status: 'completed' as const },
];

export default function GstPage() {
  const [lateDays, setLateDays] = React.useState(5);
  const lateFee = lateDays * 50;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="GST Module" description="File, track, and reconcile GST returns across all companies.">
        <Button variant="outline" size="sm" className="gap-1.5"><Upload className="h-4 w-4" />Upload JSON</Button>
        <Button size="sm" className="gap-1.5"><Download className="h-4 w-4" />Download Report</Button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Returns Filed (FY)" value="42" icon={FileCheck2} tone="success" />
        <StatCard label="Pending This Month" value="3" icon={Clock} tone="warning" />
        <StatCard label="Overdue" value="1" icon={AlertTriangle} tone="danger" />
        <StatCard label="Tax Liability" value="₹4.82L" icon={Receipt} tone="primary" />
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="history">Return History</TabsTrigger>
          <TabsTrigger value="calculator">Late Fee Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {returns.map((r) => (
              <Card key={r.form} className="group hover:shadow-elevated transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Receipt className="h-5 w-5" />
                    </div>
                    <StatusBadge tone="warning">Upcoming</StatusBadge>
                  </div>
                  <CardTitle className="mt-3 text-lg">{r.form}</CardTitle>
                  <CardDescription className="text-xs">{r.desc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Due date</span>
                    <span className="font-medium">{r.due}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last filed</span>
                    <span className="font-medium">{r.filed}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Prepare Filing</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Company-wise GST Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {companies.filter((c) => c.status === 'active').map((c) => (
                  <div key={c.id} className="flex items-center gap-3 rounded-lg border border-border/60 p-3 hover:bg-muted/30">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-xs font-semibold">{c.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{c.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{c.gstin}</p>
                    </div>
                    <StatusBadge tone={c.complianceScore >= 80 ? 'success' : 'warning'}>{c.complianceScore >= 80 ? 'On track' : 'Attention'}</StatusBadge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Period</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Form</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Acknowledgement</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Filed Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((h, i) => (
                      <tr key={i} className="border-b border-border/60 last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{h.period}</td>
                        <td className="px-4 py-3">{h.form}</td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{h.ack}</td>
                        <td className="px-4 py-3">{h.date}</td>
                        <td className="px-4 py-3"><StatusBadge tone="success">Completed</StatusBadge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator">
          <Card className="max-w-md">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10 text-warning"><Calculator className="h-5 w-5" /></div>
              <CardTitle className="mt-3">Late Fee Calculator</CardTitle>
              <CardDescription>Estimate the late filing fee for GSTR-3B (₹50/day, max ₹5,000).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Number of days late</label>
                <input type="range" min={0} max={100} value={lateDays} onChange={(e) => setLateDays(Number(e.target.value))} className="mt-2 w-full accent-primary" />
                <div className="flex justify-between text-xs text-muted-foreground"><span>0</span><span>{lateDays} days</span><span>100</span></div>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground">Estimated late fee</p>
                <p className="font-display text-3xl font-bold text-warning">₹{Math.min(lateFee, 5000).toLocaleString('en-IN')}</p>
                <p className="mt-1 text-xs text-muted-foreground">Capped at ₹5,000 per return</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
