import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Target, Users, Award, Heart, Zap } from 'lucide-react';

const values = [
  { icon: ShieldCheck, title: 'Compliance First', desc: 'We believe compliance should be effortless, not exhausting. Every feature is designed to reduce your risk.' },
  { icon: Target, title: 'Customer Obsessed', desc: '12,000+ businesses trust us because we treat their deadlines like our own. We do not miss.' },
  { icon: Zap, title: 'Built for Speed', desc: 'From application to filing in days, not weeks. Our platform automates the busywork so experts focus on judgment.' },
  { icon: Users, title: 'Expert Network', desc: 'A nationwide network of CAs, CSs, and tax consultants — vetted, assigned, and accountable.' },
  { icon: Award, title: 'Audit-Ready', desc: 'Every action is logged. Every document versioned. You are always ready for inspection.' },
  { icon: Heart, title: 'Made in India', desc: 'Built in Mumbai for Indian businesses. We understand MCA, GSTN, and the Income Tax portal intimately.' },
];

const team = [
  { name: 'Aarav Reddy', role: 'Founder & CEO', bio: 'Ex-CA firm partner. 15 years in corporate compliance.' },
  { name: 'Priya Sharma', role: 'Head of GST', bio: 'Former GST auditor. Chartered Accountant.' },
  { name: 'Rohan Mehta', role: 'Head of ROC', bio: 'Practising Company Secretary. MCA specialist.' },
  { name: 'Anita Desai', role: 'Head of Tax', bio: 'Tax consultant. Income tax & TDS expert.' },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">About Us</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
          We make compliance effortless for Indian businesses
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          ComplyFlow was born out of a simple frustration: compliance in India is
          fragmented, manual, and error-prone. We built one platform to bring GST, ROC,
          TDS, Labour Law, and corporate filings under a single, intelligent dashboard.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { v: '12,000+', l: 'Companies' },
          { v: '50,000+', l: 'Filings completed' },
          { v: '99.8%', l: 'On-time rate' },
          { v: '4.9/5', l: 'Rating' },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="font-display text-3xl font-bold text-primary">{s.v}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <section className="mt-20">
        <h2 className="text-center font-display text-3xl font-bold">Our Values</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="rounded-xl border border-border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className="mt-20">
        <h2 className="text-center font-display text-3xl font-bold">Leadership</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t) => (
            <Card key={t.name}>
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h3 className="mt-4 font-semibold">{t.name}</h3>
                <p className="text-sm text-primary">{t.role}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{t.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 text-center">
        <h2 className="font-display text-2xl font-bold">Join the compliance revolution</h2>
        <p className="mt-2 text-muted-foreground">Start free today. No credit card required.</p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/register">Get Started</Link>
        </Button>
      </section>
    </div>
  );
}
