'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navSections } from './nav-config';
import { ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex h-screen sticky top-0 w-64 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center gap-2.5 px-5 border-b border-sidebar-border">
        <Link href="/portal" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-105">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-tight">
              ComplyFlow
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Compliance Cloud
            </span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.label} className="space-y-1">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {section.label}
            </p>
            {section.items.map((item) => {
              const active =
                item.href === '/portal'
                  ? pathname === '/portal'
                  : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-colors',
                      active
                        ? 'text-primary'
                        : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  />
                  <span className="flex-1">{item.title}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        'h-5 px-1.5 text-[10px] font-semibold',
                        item.badgeTone === 'warning' &&
                          'bg-warning/15 text-warning border-warning/20',
                        item.badgeTone === 'danger' &&
                          'bg-destructive/15 text-destructive border-destructive/20',
                        item.badgeTone === 'primary' &&
                          'bg-primary/15 text-primary border-primary/20',
                        item.badgeTone === 'success' &&
                          'bg-success/15 text-success border-success/20'
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {active && (
                    <span className="absolute left-0 h-5 w-0.5 rounded-r-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-3">
          <p className="text-xs font-semibold">Compliance Score</p>
          <p className="text-2xl font-bold font-display text-primary">87%</p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
            <div className="h-1.5 rounded-full bg-primary" style={{ width: '87%' }} />
          </div>
          <p className="mt-1.5 text-[10px] text-muted-foreground">
            3 items need attention
          </p>
        </div>
      </div>
    </aside>
  );
}
