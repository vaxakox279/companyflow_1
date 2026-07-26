'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase-client';
import { services } from '@/lib/services-data';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Building2,
  ListChecks,
  Upload,
  ClipboardCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileText,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { Suspense } from 'react';

const allServices = [
  'GST Return',
  'ROC Filing',
  'TDS Return',
  'Payroll',
  'Income Tax',
  'Labour Compliance',
  'Company Incorporation',
];

const docList = [
  'PAN',
  'GST Certificate',
  'COI',
  'MOA',
  'AOA',
  'Previous Returns',
  'Other Documents',
];

const steps = [
  { label: 'Company', icon: Building2 },
  { label: 'Services', icon: ListChecks },
  { label: 'Documents', icon: Upload },
  { label: 'Review', icon: ClipboardCheck },
];

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <ApplyForm />
    </Suspense>
  );
}

function ApplyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const presetSlug = searchParams.get('service');
  const preset = services.find((s) => s.slug === presetSlug);

  const [step, setStep] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);
  const [appNo, setAppNo] = React.useState<string | null>(null);

  const [form, setForm] = React.useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    gstin: '',
    pan: '',
    cin: '',
    state: '',
    address: '',
    services: preset ? [preset.name] : [] as string[],
    documents: {} as Record<string, string>,
    remarks: '',
  });

  const update = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const toggleService = (s: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }));

  const toggleDoc = (d: string) =>
    setForm((f) => ({
      ...f,
      documents: { ...f.documents, [d]: f.documents[d] ? '' : 'uploaded' },
    }));

  const canNext = () => {
    if (step === 0) return form.company_name && form.contact_name && form.email && form.phone;
    if (step === 1) return form.services.length > 0;
    return true;
  };

  const submit = async () => {
    setSubmitting(true);
    const { data, error } = await supabase
      .from('applications')
      .insert({
        company_name: form.company_name,
        contact_name: form.contact_name,
        email: form.email,
        phone: form.phone,
        gstin: form.gstin || null,
        pan: form.pan || null,
        cin: form.cin || null,
        state: form.state || null,
        address: form.address || null,
        services: form.services,
        documents: form.documents,
        remarks: form.remarks || null,
      })
      .select('application_no')
      .maybeSingle();

    setSubmitting(false);
    if (error) {
      toast.error('Could not submit application', { description: error.message });
      return;
    }
    setAppNo(data?.application_no ?? 'CF-2026-000000');
  };

  if (appNo) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success animate-scale-in">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Thank You!</h1>
        <p className="mt-2 text-lg text-muted-foreground">Your application has been submitted successfully.</p>
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Your Application ID</p>
          <p className="mt-1 font-mono text-2xl font-bold text-primary">{appNo}</p>
        </div>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          Our compliance expert will contact you shortly. Please keep your Application ID
          for future reference.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline">
            <a href="/">Back to Home</a>
          </Button>
          <Button asChild>
            <a href="/services">Explore More Services</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight">Apply for Compliance Service</h1>
        <p className="mt-2 text-muted-foreground">
          {preset ? `Applying for: ${preset.name}` : 'Complete the 4-step form to get started.'}
        </p>
      </div>

      {/* Stepper */}
      <div className="mt-10 flex items-center justify-between">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const done = i < step;
          const active = i === step;
          return (
            <React.Fragment key={s.label}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                    done && 'border-success bg-success text-success-foreground',
                    active && 'border-primary bg-primary text-primary-foreground shadow-glow',
                    !done && !active && 'border-border bg-card text-muted-foreground'
                  )}
                >
                  {done ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={cn('text-xs font-medium', active ? 'text-primary' : 'text-muted-foreground')}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn('mx-2 h-0.5 flex-1 rounded-full', i < step ? 'bg-success' : 'bg-border')} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          {/* Step 1: Company Info */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold">Company Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Company Name *"><Input value={form.company_name} onChange={(e) => update('company_name', e.target.value)} placeholder="Acme Pvt Ltd" /></Field>
                <Field label="Contact Person *"><Input value={form.contact_name} onChange={(e) => update('contact_name', e.target.value)} placeholder="Rahul Sharma" /></Field>
                <Field label="Email *"><Input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="rahul@acme.in" /></Field>
                <Field label="Phone *"><Input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98765 43210" /></Field>
                <Field label="GSTIN"><Input value={form.gstin} onChange={(e) => update('gstin', e.target.value)} placeholder="27ABCDE1234F1Z5" className="font-mono" /></Field>
                <Field label="PAN"><Input value={form.pan} onChange={(e) => update('pan', e.target.value)} placeholder="ABCDE1234F" className="font-mono" /></Field>
                <Field label="CIN"><Input value={form.cin} onChange={(e) => update('cin', e.target.value)} placeholder="U72200MH2019PTC123456" className="font-mono" /></Field>
                <Field label="State"><Input value={form.state} onChange={(e) => update('state', e.target.value)} placeholder="Maharashtra" /></Field>
                <div className="sm:col-span-2">
                  <Field label="Address"><Input value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Registered office address" /></Field>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Choose Services */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold">Choose Services</h2>
              <p className="text-sm text-muted-foreground">Select all the compliance services you need.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {allServices.map((s) => {
                  const checked = form.services.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleService(s)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl border p-4 text-left transition-all',
                        checked ? 'border-primary bg-primary/5 ring-1 ring-primary/30' : 'border-border hover:bg-muted/40'
                      )}
                    >
                      <div className={cn('flex h-5 w-5 items-center justify-center rounded-md border-2', checked ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}>
                        {checked && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>
                      <span className="text-sm font-medium">{s}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Upload Documents */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold">Upload Documents</h2>
              <p className="text-sm text-muted-foreground">Mark the documents you have ready. You can share them securely after submission.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {docList.map((d) => {
                  const checked = !!form.documents[d];
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDoc(d)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl border p-4 text-left transition-all',
                        checked ? 'border-success bg-success/5' : 'border-border hover:bg-muted/40'
                      )}
                    >
                      <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', checked ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground')}>
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{d}</span>
                      {checked && <CheckCircle2 className="ml-auto h-4 w-4 text-success" />}
                    </button>
                  );
                })}
              </div>
              <div>
                <label className="text-sm font-medium">Remarks (optional)</label>
                <textarea
                  value={form.remarks}
                  onChange={(e) => update('remarks', e.target.value)}
                  placeholder="Anything specific our team should know?"
                  className="mt-1.5 w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold">Review & Submit</h2>
              <div className="space-y-3">
                <ReviewRow label="Company" value={form.company_name} />
                <ReviewRow label="Contact" value={`${form.contact_name} · ${form.email} · ${form.phone}`} />
                <ReviewRow label="GSTIN / PAN / CIN" value={`${form.gstin || '—'} / ${form.pan || '—'} / ${form.cin || '—'}`} />
                <ReviewRow label="State / Address" value={`${form.state || '—'} · ${form.address || '—'}`} />
                <ReviewRow label="Services" value={form.services.join(', ') || '—'} />
                <ReviewRow label="Documents" value={Object.keys(form.documents).join(', ') || 'None marked'} />
                {form.remarks && <ReviewRow label="Remarks" value={form.remarks} />}
              </div>
              <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                By submitting, you agree to be contacted by our compliance team. Your data is encrypted and never shared.
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => (step === 0 ? router.push('/services') : setStep((s) => s - 1))}
              className="gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" /> {step === 0 ? 'Cancel' : 'Back'}
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()} className="gap-1.5">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={submit} disabled={submitting} className="gap-1.5">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : <>Submit Application <ArrowRight className="h-4 w-4" /></>}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/60 py-2.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-medium">{value}</span>
    </div>
  );
}
