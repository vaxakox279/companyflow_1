'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { tasks, priorityTone, type Priority } from '@/lib/mock-data';
import { Plus, MessageSquare, Paperclip, CheckCircle2, Circle, Clock, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

const columns: { key: string; label: string; color: string }[] = [
  { key: 'todo', label: 'To Do', color: 'text-muted-foreground' },
  { key: 'in-progress', label: 'In Progress', color: 'text-primary' },
  { key: 'review', label: 'Review', color: 'text-warning' },
  { key: 'done', label: 'Done', color: 'text-success' },
];

const statusIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  todo: Circle,
  'in-progress': Loader,
  review: Clock,
  done: CheckCircle2,
};

export default function TasksPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Tasks" description="Kanban board for compliance tasks across your team.">
        <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />New Task</Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={cn('h-2 w-2 rounded-full', col.color.replace('text-', 'bg-'))} />
                  <p className="text-sm font-semibold">{col.label}</p>
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{colTasks.length}</span>
              </div>
              <div className="space-y-2.5">
                {colTasks.map((t) => (
                  <Card key={t.id} className="cursor-pointer hover:shadow-elevated transition-shadow">
                    <CardContent className="p-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-snug">{t.title}</p>
                        <StatusBadge tone={priorityTone(t.priority as Priority)} dot={false}>
                          <span className="capitalize">{t.priority}</span>
                        </StatusBadge>
                      </div>
                      <p className="mt-1.5 text-xs text-muted-foreground">{t.company}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                            {t.assignee.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <span className="text-xs text-muted-foreground">{t.assignee.split(' ')[0]}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-0.5"><MessageSquare className="h-3 w-3" />3</span>
                          <span className="inline-flex items-center gap-0.5"><Paperclip className="h-3 w-3" />2</span>
                          <span className="inline-flex items-center gap-0.5"><Clock className="h-3 w-3" />{new Date(t.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {colTasks.length === 0 && (
                  <div className="rounded-xl border border-dashed border-border py-8 text-center text-xs text-muted-foreground">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
