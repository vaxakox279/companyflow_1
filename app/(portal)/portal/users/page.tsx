'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { DataTable, type Column } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { users } from '@/lib/mock-data';
import { Plus, Shield, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const roleTone: Record<string, 'primary' | 'success' | 'warning' | 'neutral'> = {
  'Super Admin': 'primary',
  'Company Admin': 'success',
  CA: 'warning',
  CS: 'warning',
  Manager: 'neutral',
  Employee: 'neutral',
};

type User = (typeof users)[number];

const columns: Column<User>[] = [
  {
    key: 'name',
    header: 'User',
    sortable: true,
    cell: (u) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">{u.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback></Avatar>
        <div>
          <p className="font-medium">{u.name}</p>
          <p className="text-xs text-muted-foreground">{u.email}</p>
        </div>
      </div>
    ),
  },
  { key: 'role', header: 'Role', sortable: true, cell: (u) => <StatusBadge tone={roleTone[u.role] ?? 'neutral'} dot={false}>{u.role}</StatusBadge> },
  { key: 'status', header: 'Status', cell: (u) => <StatusBadge tone={u.status === 'active' ? 'success' : 'warning'}>{u.status === 'active' ? 'Active' : 'Invited'}</StatusBadge> },
  { key: 'lastActive', header: 'Last Active', cell: (u) => <span className="text-muted-foreground">{u.lastActive}</span> },
  {
    key: 'actions',
    header: '',
    align: 'right',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit role</DropdownMenuItem>
          <DropdownMenuItem>Resend invite</DropdownMenuItem>
          <DropdownMenuItem>Reset password</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const roles = [
  { name: 'Super Admin', desc: 'Full access to all companies and settings', perms: 24 },
  { name: 'Company Admin', desc: 'Manage one company and its users', perms: 16 },
  { name: 'CA', desc: 'File GST, audit, and tax compliances', perms: 12 },
  { name: 'CS', desc: 'File ROC and MCA compliances', perms: 12 },
  { name: 'Manager', desc: 'Assign tasks and review filings', perms: 8 },
  { name: 'Employee', desc: 'View and upload documents', perms: 4 },
];

export default function UsersPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Users & Roles" description="Role-based access control for your entire team.">
        <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />Invite User</Button>
      </PageHeader>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((r) => (
          <div key={r.name} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><Shield className="h-4 w-4" /></div>
              <p className="font-medium">{r.name}</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{r.desc}</p>
            <p className="mt-3 text-xs font-medium text-muted-foreground">{r.perms} permissions</p>
          </div>
        ))}
      </div>

      <DataTable data={users} columns={columns} searchPlaceholder="Search users by name or email…" />
    </div>
  );
}
