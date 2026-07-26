import * as React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/services-data';
import { CheckCircle2, ArrowRight, FileText, Clock, IndianRupee, HelpCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
      <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All Services
      </Link>

      {/* Hero */}
      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className={cn('flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl', service.color)}>
          <Icon className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{service.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{service.tagline}</p>
          <p className="mt-4 max-w-2xl text-muted-foreground">{service.overview}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="shadow-glow">
              <Link href={`/apply?service=${service.slug}`}>Apply Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Request Demo</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">Benefits</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {service.benefits.map((b) => (
            <div key={b} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              <p className="text-sm">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">Process Timeline</h2>
        <div className="mt-6 space-y-4">
          {service.timeline.map((t, i) => (
            <div key={t.step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </div>
                {i < service.timeline.length - 1 && <div className="my-1 w-px flex-1 bg-border" />}
              </div>
              <div className="flex-1 pb-6">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold">{t.step}</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    <Clock className="h-3 w-3" /> {t.days}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Required Documents */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">Required Documents</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {service.documents.map((d) => (
            <div key={d} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <FileText className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">Pricing</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {service.pricing.map((p) => (
            <Card key={p.plan} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-bold">{p.plan}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  <span className="font-display text-3xl font-bold">{p.price.replace('₹', '')}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-5 w-full">
                  <Link href={`/apply?service=${service.slug}`}>Apply Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">FAQ</h2>
        <div className="mt-6 space-y-4">
          {service.faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-border bg-card p-5">
              <h3 className="flex items-center gap-2 font-semibold">
                <HelpCircle className="h-4 w-4 text-primary" /> {f.q}
              </h3>
              <p className="mt-2 pl-6 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground">
          <h2 className="font-display text-2xl font-bold">Ready to get started?</h2>
          <p className="mt-2 text-primary-foreground/80">Apply in minutes. A compliance expert will reach out within 24 hours.</p>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link href={`/apply?service=${service.slug}`}>Apply Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
