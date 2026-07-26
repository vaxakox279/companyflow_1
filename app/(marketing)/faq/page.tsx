'use client';

import * as React from 'react';
import { faqs } from '@/lib/services-data';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FaqPage() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">FAQ</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
          Frequently asked questions
        </h1>
        <p className="mt-4 text-muted-foreground">
          Everything you need to know about ComplyFlow. Can't find an answer?{' '}
          <a href="/contact" className="font-medium text-primary">Contact us</a>.
        </p>
      </div>

      <div className="mt-10 space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold">{f.q}</span>
                <ChevronDown className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform', isOpen && 'rotate-180')} />
              </button>
              <div className={cn('grid transition-all', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
