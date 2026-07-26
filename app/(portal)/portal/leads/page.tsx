'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/components/auth/auth-provider';
import { Inbox, Loader2, Search, UserCog, CheckCircle2, XCircle, FileText, Building2, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Application = {
  id: string;
  application_no: string | null;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  gstin: string | null;
  pan: string | null;
  cin: string | null;
  state: string | null;
  address: string | null;
  services: string[];
  documents: Record<string, string>;
  remarks: string | null;
  status: string;
  assigned_ca: string | null;
  assigned_cs: string | null;
  created_at: string;
};

const statusOrder: Record<string, 'neutral' | 'primary' | 'warning' | 'danger' | 'success'> = {
  new: 'primary',
  contacted: 'warning',
  documents_pending: 'warning',
  in_progress: 'warning',
  completed: 'success',
  approved: 'success',
  rejected: 'danger',
};

const statusLabels: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  documents_pending: 'Documents Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  approved: 'Approved',
  rejected: 'Rejected',
};

const statusFlow = ['new', 'contacted', 'documents_pending', 'in_progress', 'approved', 'rejected'];

export default function LeadsPage() {
  const { user } = useAuth();
  const [apps, setApps] = React.useState<Application[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState<string>('all');
  const [selected, setSelected] = React.useState<Application | null>(null);

  const fetchApps = React.useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });
    setLoading(false);
    if (error) {
      toast.error('Could not load applications', { description: error.message });
      return;
    }
    setApps((data as Application[]) ?? []);
  }, []);

  React.useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('applications').update({ status }).eq('id', id);
    if (error) {
      toast.error('Update failed', { description: error.message });
      return;
    }
    toast.success(`Status updated to ${statusLabels[status] ?? status}`);
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  };

  const assign = async (id: string, field: 'assigned_ca' | 'assigned_cs', value: string) => {
    const { error } = await supabase.from('applications').update({ [field]: value }).eq('id', id);
    if (error) {
      toast.error('Assignment failed', { description: error.message });
      return;
    }
    toast.success('Assignment saved');
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
    setSelected((prev) => (prev && prev.id === id ? { ...prev, [field]: value } : prev));
  };

  const filtered = apps.filter((a) => {
    const matchesFilter = filter === 'all' || a.status === filter;
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      a.company_name.toLowerCase().includes(q) ||
      a.contact_name.toLowerCase().includes(q) ||
      (a.application_no ?? '').toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  const counts = React.useMemo(() => {
    const c: Record<string, number> = { all: apps.length };
    apps.forEach((a) => {
      c[a.status] = (c[a.status] ?? 0) + 1;
    });
    return c;
  }, [apps]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader
        title="Leads"
        description="Review applications submitted from the public site. Assign experts and approve to create client accounts."
      >
        <Button variant="outline" size="sm" onClick={fetchApps} className="gap-1.5">
          <Inbox className="h-4 w-4" /> Refresh
        </Button>
      </PageHeader>

      {/* Status filter chips */}
      <div className="flex flex-wrap gap-2">
        <FilterChip label="All" count={counts.all} active={filter === 'all'} onClick={() => setFilter('all')} />
        {statusFlow.map((s) => (
          <FilterChip
            key={s}
            label={statusLabels[s]}
            count={counts[s] ?? 0}
            active={filter === s}
            onClick={() => setFilter(s)}
            tone={statusOrder[s]}
          />
        ))}
      </div>

      <div className="relative w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by company, contact, ID…" className="h-9 rounded-lg bg-muted/50 pl-9 text-sm" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Inbox className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-3 text-sm font-medium">No applications yet</p>
            <p className="text-xs text-muted-foreground">Leads from the public Apply form will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <Card key={a.id} className="transition-all hover:shadow-soft">
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{a.company_name}</p>
                      <span className="font-mono text-xs text-muted-foreground">{a.application_no}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {a.contact_name} · {a.email} · {a.phone}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {a.services.map((s) => (
                        <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge tone={statusOrder[a.status] ?? 'neutral'}>{statusLabels[a.status] ?? a.status}</StatusBadge>
                  <Button variant="outline" size="sm" onClick={() => setSelected(a)}>Review</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Review Dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto scrollbar-thin">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  Application {selected.application_no}
                  <StatusBadge tone={statusOrder[selected.status] ?? 'neutral'}>{statusLabels[selected.status] ?? selected.status}</StatusBadge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5">
                {/* Company info */}
                <section>
                  <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold"><Building2 className="h-4 w-4" /> Company Information</h3>
                  <div className="grid gap-2 rounded-lg border border-border bg-muted/30 p-3 text-sm sm:grid-cols-2">
                    <Info label="Company" value={selected.company_name} />
                    <Info label="Contact" value={selected.contact_name} />
                    <Info label="Email" value={selected.email} />
                    <Info label="Phone" value={selected.phone} />
                    <Info label="GSTIN" value={selected.gstin} mono />
                    <Info label="PAN" value={selected.pan} mono />
                    <Info label="CIN" value={selected.cin} mono />
                    <Info label="State" value={selected.state} />
                    <div className="sm:col-span-2"><Info label="Address" value={selected.address} /></div>
                  </div>
                </section>

                {/* Services */}
                <section>
                  <h3 className="mb-2 text-sm font-semibold">Requested Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.services.map((s) => (
                      <span key={s} className="rounded-lg border border-border bg-card px-3 py-1 text-sm font-medium">{s}</span>
                    ))}
                  </div>
                </section>

                {/* Documents */}
                <section>
                  <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold"><FileText className="h-4 w-4" /> Documents Marked Ready</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(selected.documents).length === 0 ? (
                      <p className="text-sm text-muted-foreground">No documents marked.</p>
                    ) : (
                      Object.keys(selected.documents).map((d) => (
                        <span key={d} className="inline-flex items-center gap-1.5 rounded-lg border border-success/20 bg-success/10 px-3 py-1 text-sm text-success">
                          <CheckCircle2 className="h-3.5 w-3.5" /> {d}
                        </span>
                      ))
                    )}
                  </div>
                </section>

                {selected.remarks && (
                  <section>
                    <h3 className="mb-2 text-sm font-semibold">Remarks</h3>
                    <p className="rounded-lg border border-border bg-muted/30 p-3 text-sm">{selected.remarks}</p>
                  </section>
                )}

                {/* Assignment */}
                <section>
                  <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold"><UserCog className="h-4 w-4" /> Assign Team</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Assigned CA</label>
                      <Input
                        defaultValue={selected.assigned_ca ?? ''}
                        onBlur={(e) => assign(selected.id, 'assigned_ca', e.target.value)}
                        placeholder="CA name"
                        className="mt-1 h-9"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Assigned CS</label>
                      <Input
                        defaultValue={selected.assigned_cs ?? ''}
                        onBlur={(e) => assign(selected.id, 'assigned_cs', e.target.value)}
                        placeholder="CS name"
                        className="mt-1 h-9"
                      />
                    </div>
                  </div>
                </section>

                {/* Status actions */}
                <section>
                  <h3 className="mb-2 text-sm font-semibold">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {statusFlow.map((s) => (
                      <Button
                        key={s}
                        variant={selected.status === s ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateStatus(selected.id, s)}
                        className={cn(
                          s === 'approved' && 'border-success text-success hover:bg-success hover:text-success-foreground',
                          s === 'rejected' && 'border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground'
                        )}
                      >
                        {s === 'approved' && <CheckCircle2 className="mr-1 h-3.5 w-3.5" />}
                        {s === 'rejected' && <XCircle className="mr-1 h-3.5 w-3.5" />}
                        {statusLabels[s]}
                      </Button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Approving creates a client account and sends login credentials. Rejecting closes the lead.
                  </p>
                </section>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
  tone,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  tone?: 'neutral' | 'primary' | 'warning' | 'danger' | 'success';
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border bg-card text-muted-foreground hover:bg-muted/40'
      )}
    >
      {tone && tone !== 'neutral' && (
        <span className={cn(
          'h-1.5 w-1.5 rounded-full',
          tone === 'primary' && 'bg-primary',
          tone === 'warning' && 'bg-warning',
          tone === 'danger' && 'bg-destructive',
          tone === 'success' && 'bg-success'
        )} />
      )}
      {label}
      <span className={cn('rounded-full px-1.5 text-[10px]', active ? 'bg-primary/20' : 'bg-muted')}>{count}</span>
    </button>
  );
}

function Info({ label, value, mono }: { label: string; value: string | null; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn('font-medium', mono && 'font-mono text-xs')}>{value || '—'}</p>
    </div>
  );
}
