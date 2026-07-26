'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileBarChart, FileText, Download, FileSpreadsheet, FileDown } from 'lucide-react';

const reports = [
  { name: 'GST Report', desc: 'All GST returns filed across companies', icon: FileText, tone: 'primary' as const },
  { name: 'ROC Report', desc: 'MCA and annual filings summary', icon: FileBarChart, tone: 'warning' as const },
  { name: 'Compliance Report', desc: 'Overall compliance health by company', icon: FileBarChart, tone: 'success' as const },
  { name: 'Pending Report', desc: 'All pending and upcoming filings', icon: FileText, tone: 'warning' as const },
  { name: 'Completed Report', desc: 'Successfully filed compliances', icon: FileText, tone: 'success' as const },
  { name: 'User Activity Report', desc: 'Audit trail and user actions', icon: FileBarChart, tone: 'primary' as const },
];

const toneClasses: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-destructive/10 text-destructive',
};

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Reports" description="Generate and export compliance reports in PDF, Excel, or CSV." />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((r) => {
          const Icon = r.icon;
          return (
            <Card key={r.name} className="group hover:shadow-elevated transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClasses[r.tone]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <CardTitle className="mt-3 text-base">{r.name}</CardTitle>
                <CardDescription className="text-xs">{r.desc}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5 flex-1"><FileDown className="h-3.5 w-3.5" />PDF</Button>
                <Button variant="outline" size="sm" className="gap-1.5 flex-1"><FileSpreadsheet className="h-3.5 w-3.5" />Excel</Button>
                <Button variant="outline" size="sm" className="gap-1.5 flex-1"><Download className="h-3.5 w-3.5" />CSV</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
