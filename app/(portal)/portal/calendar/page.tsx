'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { cn } from '@/lib/utils';
import { compliances, companies, statusTone, statusLabel, type ComplianceStatus } from '@/lib/mock-data';
import { ChevronLeft, ChevronRight, Plus, CalendarDays } from 'lucide-react';

const statusColor: Record<ComplianceStatus, string> = {
  completed: 'bg-success',
  'in-progress': 'bg-primary',
  upcoming: 'bg-warning',
  overdue: 'bg-destructive',
};

const legend = [
  { label: 'Completed', color: 'bg-success' },
  { label: 'Upcoming', color: 'bg-warning' },
  { label: 'Overdue', color: 'bg-destructive' },
  { label: 'Today', color: 'bg-primary' },
];

function buildMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function CalendarPage() {
  const [cursor, setCursor] = React.useState(new Date(2026, 6, 1));
  const [selected, setSelected] = React.useState<Date | null>(new Date(2026, 6, 26));
  const cells = buildMonth(cursor.getFullYear(), cursor.getMonth());
  const today = new Date(2026, 6, 26);

  const eventsFor = (date: Date) =>
    compliances.filter((c) => {
      const d = new Date(c.dueDate);
      return d.toDateString() === date.toDateString();
    });

  const selectedEvents = selected ? eventsFor(selected) : [];
  const monthEvents = compliances.filter((c) => {
    const d = new Date(c.dueDate);
    return d.getMonth() === cursor.getMonth() && d.getFullYear() === cursor.getFullYear();
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader
        title="Compliance Calendar"
        description="Track every filing deadline across companies in one view."
      >
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </PageHeader>

      <div className="flex flex-wrap items-center gap-3">
        {legend.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className={cn('h-2.5 w-2.5 rounded-full', l.color)} />
            <span className="text-xs font-medium text-muted-foreground">{l.label}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">
                {cursor.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8" onClick={() => { setCursor(new Date(2026, 6, 1)); setSelected(today); }}>
                  Today
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="pb-2 text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {d}
                </div>
              ))}
              {cells.map((date, i) => {
                if (!date) return <div key={i} className="min-h-[84px] rounded-lg" />;
                const events = eventsFor(date);
                const isToday = date.toDateString() === today.toDateString();
                const isSelected = selected && date.toDateString() === selected.toDateString();
                return (
                  <button
                    key={i}
                    onClick={() => setSelected(date)}
                    className={cn(
                      'min-h-[84px] rounded-lg border p-1.5 text-left transition-all',
                      isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary/30' : 'border-border hover:border-border hover:bg-muted/40',
                      isToday && !isSelected && 'border-primary/40'
                    )}
                  >
                    <span className={cn(
                      'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium',
                      isToday ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                    )}>
                      {date.getDate()}
                    </span>
                    <div className="mt-1 space-y-1">
                      {events.slice(0, 2).map((e) => (
                        <div
                          key={e.id}
                          className={cn(
                            'truncate rounded px-1.5 py-0.5 text-[10px] font-medium text-white',
                            statusColor[e.status]
                          )}
                        >
                          {e.name}
                        </div>
                      ))}
                      {events.length > 2 && (
                        <p className="px-1.5 text-[10px] text-muted-foreground">+{events.length - 2} more</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {selected ? selected.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Select a date'}
              </p>
              <h3 className="font-display text-lg font-semibold">
                {selectedEvents.length} {selectedEvents.length === 1 ? 'event' : 'events'}
              </h3>
            </div>
            <div className="space-y-2.5">
              {selectedEvents.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center">
                  <CalendarDays className="h-8 w-8 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">No events on this day</p>
                </div>
              )}
              {selectedEvents.map((e) => {
                const company = companies.find((c) => c.id === e.companyId);
                return (
                  <div key={e.id} className="rounded-xl border border-border p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{e.name}</p>
                        <p className="text-xs text-muted-foreground">{company?.name} · {e.department}</p>
                      </div>
                      <StatusBadge tone={statusTone(e.status)}>{statusLabel(e.status)}</StatusBadge>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                      <p><span className="text-muted-foreground">Law: </span>{e.law}</p>
                      <p><span className="text-muted-foreground">Priority: </span><span className="font-medium capitalize">{e.priority}</span></p>
                      <p><span className="text-muted-foreground">Owner: </span>{e.responsible}</p>
                      <p><span className="text-muted-foreground">Due: </span>{new Date(e.dueDate).toLocaleDateString('en-IN')}</p>
                    </div>
                    {e.remarks && <p className="mt-2 rounded-md bg-muted/50 px-2 py-1 text-xs text-muted-foreground">{e.remarks}</p>}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <h3 className="mb-3 font-display text-base font-semibold">All events this month</h3>
          <div className="space-y-2">
            {monthEvents.map((e) => {
              const company = companies.find((c) => c.id === e.companyId);
              return (
                <div key={e.id} className="flex items-center gap-3 rounded-lg border border-border/60 p-2.5 hover:bg-muted/30">
                  <span className={cn('h-2 w-2 rounded-full', statusColor[e.status])} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{e.name}</p>
                    <p className="text-xs text-muted-foreground">{company?.name} · {e.department} · {e.law}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(e.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                  <StatusBadge tone={statusTone(e.status)}>{statusLabel(e.status)}</StatusBadge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
