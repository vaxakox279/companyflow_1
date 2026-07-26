import Link from 'next/link';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Product: [
    { href: '/services', label: 'Services' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/industries', label: 'Industries' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
    { href: '/login', label: 'Client Login' },
  ],
  Services: [
    { href: '/services/gst-compliance', label: 'GST Compliance' },
    { href: '/services/roc-compliance', label: 'ROC Compliance' },
    { href: '/services/tds-compliance', label: 'TDS Compliance' },
    { href: '/services/income-tax', label: 'Income Tax' },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold">ComplyFlow</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              India's smart legal compliance platform. Manage GST, ROC, TDS, Labour Law, and
              Company Secretarial compliance from a single dashboard.
            </p>
            <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4" />hello@complyflow.io</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4" />+91 98765 43210</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />Mumbai, India</p>
            </div>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="mb-3 text-sm font-semibold">{heading}</p>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">© 2026 ComplyFlow Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <Link href="/security" className="hover:text-foreground">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
