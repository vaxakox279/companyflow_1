import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { pricingPlans } from '@/lib/services-data';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Pricing</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
          Plans that scale with your business
        </h1>
        <p className="mt-4 text-muted-foreground">
          Start free for 14 days. No credit card required. Upgrade, downgrade, or cancel anytime.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((p) => (
          <Card
            key={p.name}
            className={cn('relative flex flex-col', p.highlighted && 'border-primary shadow-glow lg:-translate-y-2')}
          >
            {p.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Most Popular
              </div>
            )}
            <CardContent className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-lg font-bold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild variant={p.highlighted ? 'default' : 'outline'} className="mt-6 w-full">
                <Link href={p.href}>{p.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground">Need a custom plan for your CA / CS firm?</p>
        <Button asChild variant="link" className="mt-1">
          <Link href="/contact">Talk to our sales team →</Link>
        </Button>
      </div>
    </div>
  );
}
