import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar, Bell, FileText, Users, TrendingUp, Lock,
  ShieldCheck, Zap, BarChart3, FolderOpen, Mail, Globe,
} from 'lucide-react';

const features = [
  { icon: Calendar, title: 'Compliance Calendar', desc: 'Every deadline across GST, ROC, TDS & Labour in one color-coded view — monthly, weekly, or daily.' },
  { icon: Bell, title: 'Smart Reminders', desc: 'Automated alerts 7, 3, 1 day before each deadline, on the due day, and daily once overdue — email, SMS, WhatsApp & push.' },
  { icon: FolderOpen, title: 'Document Vault', desc: 'Drag-and-drop upload, version history, PDF/image/Office preview, OCR search, and document expiry reminders.' },
  { icon: Users, title: 'Team & RBAC', desc: 'Role-based access for Super Admin, Company Admin, CA, CS, Manager, and Employee — with granular permissions.' },
  { icon: TrendingUp, title: 'Live Analytics', desc: 'Compliance score, filing trends, overdue risk, and department-wise completion — visualized in real time.' },
  { icon: Lock, title: 'Bank-grade Security', desc: 'Encryption, MFA, audit trail, CSRF & XSS protection, rate limiting, and session management built in.' },
  { icon: BarChart3, title: 'Reports & Export', desc: 'Generate GST, ROC, compliance, pending, completed, and user activity reports — export to PDF, Excel, or CSV.' },
  { icon: Zap, title: 'Quick Actions', desc: 'Add compliance, upload documents, generate reports, and invite users — all from dashboard quick actions.' },
  { icon: Mail, title: 'Multi-Channel Alerts', desc: 'Email, SMS, WhatsApp Business, and web push — configured and ready, with per-channel toggles.' },
  { icon: Globe, title: 'Multi-Company', desc: 'Manage unlimited companies with separate GSTIN, PAN, CIN, and compliance profiles under one login.' },
  { icon: ShieldCheck, title: 'Audit Trail', desc: 'Every login, upload, delete, status change, and permission update logged with timestamp, IP, and browser.' },
  { icon: FileText, title: 'Task Management', desc: 'Kanban board with assignees, priorities, due dates, checklists, comments, attachments, and recurring tasks.' },
];

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Features</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
          Everything you need to stay compliant
        </h1>
        <p className="mt-4 text-muted-foreground">
          A complete compliance operating system — calendar, reminders, documents,
          tasks, reports, and analytics, all in one place.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <Card key={f.title} className="h-full transition-all hover:-translate-y-1 hover:shadow-floating">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <Button asChild size="lg">
          <Link href="/register">Start your free trial</Link>
        </Button>
      </div>
    </div>
  );
}
