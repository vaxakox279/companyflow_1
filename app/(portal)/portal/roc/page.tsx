'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/dashboard/stat-card';
import { Landmark, FileCheck2, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { companies } from '@/lib/mock-data';

const forms = [
  { code: 'AOC-4', name: 'Financial Statements', due: '30 Jul 2026', status: 'overdue' as const, company: 'Bluepeak Inc' },
  { code: 'MGT-7', name: 'Annual Return', due: '28 Nov 2026', status: 'upcoming' as const, company: 'Bluepeak Inc' },
  { code: 'DIR-3 KYC', name: 'Director KYC', due: '30 Sep 2026', status: 'upcoming' as const, company: 'Vertex Labs' },
  { code: 'INC-22', name: 'Notice of Situation', due: '—', status: 'completed' as const, company: 'Acme Pvt Ltd' },
  { code: 'CHG-1', name: 'Charge Creation', due: '15 Oct 2026', status: 'upcoming' as const, company: 'Nimbus Tech LLP' },
  { code: 'ADT-1', name: 'Auditor Appointment', due: '—', status: 'completed' as const, company: 'Acme Pvt Ltd' },
];

const checklist = [
  { item: 'Board meeting held', done: true },
  { item: 'Auditor report signed', done: true },
  { item: 'Financial statements approved', done: true },
  { item: 'AOC-4 filed on MCA', done: false },
  { item: 'MGT-7 filed on MCA', done: false },
  { item: 'DSC affixed', done: false },
];

export default function RocPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="ROC Module" description="Manage MCA filings, company master data, and annual compliance.">
        <Button size="sm" className="gap-1.5">New Filing</Button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Filings Filed (FY)" value="18" icon={FileCheck2} tone="success" />
        <StatCard label="Pending" value="4" icon={Clock} tone="warning" />
        <StatCard label="Overdue" value="1" icon={AlertTriangle} tone="danger" />
        <StatCard label="Active Companies" value="4" icon={Landmark} tone="primary" />
      </div>

      <Tabs defaultValue="filings">
        <TabsList>
          <TabsTrigger value="filings">Annual Filings</TabsTrigger>
          <TabsTrigger value="master">Company Master</TabsTrigger>
          <TabsTrigger value="checklist">Compliance Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="filings" className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {forms.map((f) => (
              <Card key={f.code} className="hover:shadow-elevated transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-display text-base font-semibold">{f.code}</p>
                      <p className="text-xs text-muted-foreground">{f.name}</p>
                    </div>
                    <StatusBadge tone={f.status === 'completed' ? 'success' : f.status === 'overdue' ? 'danger' : 'warning'}>
                      {f.status === 'completed' ? 'Filed' : f.status === 'overdue' ? 'Overdue' : 'Upcoming'}
                    </StatusBadge>
                  </div>
                  <div className="mt-3 space-y-1 text-xs">
                    <p><span className="text-muted-foreground">Company: </span>{f.company}</p>
                    <p><span className="text-muted-foreground">Due: </span>{f.due}</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 w-full">Open Filing</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="master">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Company</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">CIN</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Incorporated</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Industry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((c) => (
                      <tr key={c.id} className="border-b border-border/60 last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{c.name}</td>
                        <td className="px-4 py-3 font-mono text-xs">{c.cin}</td>
                        <td className="px-4 py-3">{new Date(c.incorporationDate).toLocaleDateString('en-IN')}</td>
                        <td className="px-4 py-3">{c.businessType}</td>
                        <td className="px-4 py-3 text-muted-foreground">{c.industry}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist">
          <Card className="max-w-lg">
            <CardHeader>
              <CardTitle className="text-base">Annual Filing Checklist</CardTitle>
              <CardDescription className="text-xs">Bluepeak Inc · FY 2025-26</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {checklist.map((c) => (
                <div key={c.item} className="flex items-center gap-3 rounded-lg border border-border/60 p-3">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${c.done ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground'}`}>
                    {c.done ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-3.5 w-3.5" />}
                  </div>
                  <span className={`text-sm ${c.done ? 'text-muted-foreground line-through' : 'font-medium'}`}>{c.item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
