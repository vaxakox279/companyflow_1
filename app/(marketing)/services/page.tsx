import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { services } from '@/lib/services-data';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Our Services</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
          Compliance services for every need
        </h1>
        <p className="mt-4 text-muted-foreground">
          Choose from our full suite of statutory compliance services. Each comes with a
          dedicated expert, clear timeline, and transparent pricing.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.slug} href={`/services/${s.slug}`}>
              <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-floating">
                <CardContent className="p-6">
                  <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', s.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
                  <ul className="mt-4 space-y-1.5">
                    {s.checklist.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    View details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
