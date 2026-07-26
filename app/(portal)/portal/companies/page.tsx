'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { DataTable, type Column } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Badge } from '@/components/ui/badge';
import { Building2, Plus, MoreHorizontal, MapPin } from 'lucide-react';
import { companies } from '@/lib/mock-data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Company = (typeof companies)[number];

const columns: Column<Company>[] = [
  {
    key: 'name',
    header: 'Company',
    sortable: true,
    cell: (c) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Building2 className="h-4 w-4" />
        </div>
        <div>
          <p className="font-medium">{c.name}</p>
          <p className="text-xs text-muted-foreground">{c.businessType}</p>
        </div>
      </div>
    ),
  },
  { key: 'gstin', header: 'GSTIN', sortable: true, cell: (c) => <span className="font-mono text-xs">{c.gstin}</span> },
  { key: 'cin', header: 'CIN', cell: (c) => <span className="font-mono text-xs">{c.cin}</span> },
  { key: 'city', header: 'Location', sortable: true, cell: (c) => <span className="inline-flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" />{c.city}</span> },
  {
    key: 'score',
    header: 'Score',
    sortable: true,
    cell: (c) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-16 rounded-full bg-muted">
          <div
            className={`h-full rounded-full ${c.complianceScore >= 80 ? 'bg-success' : c.complianceScore >= 60 ? 'bg-warning' : 'bg-destructive'}`}
            style={{ width: `${c.complianceScore}%` }}
          />
        </div>
        <span className="text-xs font-semibold">{c.complianceScore}%</span>
      </div>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    cell: (c) => (
      <StatusBadge tone={c.status === 'active' ? 'success' : 'neutral'}>
        {c.status === 'active' ? 'Active' : 'Inactive'}
      </StatusBadge>
    ),
  },
  {
    key: 'actions',
    header: '',
    align: 'right',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View details</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Manage users</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function CompaniesPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader
        title="Companies"
        description="Manage all your client companies and their compliance profiles."
      >
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add Company
        </Button>
      </PageHeader>
      <DataTable
        data={companies}
        columns={columns}
        searchPlaceholder="Search companies by name, GSTIN, CIN…"
      />
    </div>
  );
}
