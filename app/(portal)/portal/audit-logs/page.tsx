'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { auditLogs } from '@/lib/mock-data';
import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const actionTone: Record<string, 'success' | 'danger' | 'primary' | 'warning' | 'neutral'> = {
  login: 'success',
  logout: 'neutral',
  'document.upload': 'primary',
  'document.delete': 'danger',
  'compliance.update': 'warning',
  'user.create': 'primary',
  'permission.change': 'warning',
};

export default function AuditLogsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Audit Logs" description="Immutable trail of every action across your workspace.">
        <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" />Filter</Button>
        <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" />Export</Button>
      </PageHeader>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Timestamp</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">User</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Target</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">IP Address</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Browser</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((l) => (
                  <tr key={l.id} className="border-b border-border/60 last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{l.timestamp}</td>
                    <td className="px-4 py-3 font-medium">{l.user}</td>
                    <td className="px-4 py-3"><StatusBadge tone={actionTone[l.action] ?? 'neutral'}>{l.action}</StatusBadge></td>
                    <td className="px-4 py-3 text-muted-foreground">{l.target}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{l.ip}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{l.browser}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
