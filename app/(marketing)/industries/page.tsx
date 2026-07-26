import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { industries } from '@/lib/services-data';
import { ArrowRight } from 'lucide-react';

export default function IndustriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Industries</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
          Compliance tailored to your industry
        </h1>
        <p className="mt-4 text-muted-foreground">
          Different industries face different regulatory burdens. ComplyFlow adapts its
          compliance calendar, reminders, and filings to your sector.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((ind) => {
          const Icon = ind.icon;
          return (
            <Card key={ind.name} className="group h-full transition-all hover:-translate-y-1 hover:shadow-floating">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{ind.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{ind.desc}</p>
                <Link href="/apply" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Get started <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
