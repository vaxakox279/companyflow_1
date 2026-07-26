import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/components/auth/auth-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://complyflow.io'),
  title: {
    default: 'ComplyFlow — India\'s Smart Legal Compliance Platform',
    template: '%s · ComplyFlow',
  },
  description:
    'Manage GST, ROC, TDS, Labour Law, Company Secretarial and Annual Compliance from one dashboard. Built for companies, CAs, CSs, and compliance agencies.',
  keywords: [
    'compliance management',
    'GST filing',
    'ROC filing',
    'TDS',
    'legal compliance',
    'India compliance',
    'CA software',
    'CS software',
  ],
  openGraph: {
    title: 'ComplyFlow — India\'s Smart Legal Compliance Platform',
    description:
      'Manage GST, ROC, TDS, Labour Law, Company Secretarial and Annual Compliance from one dashboard.',
    type: 'website',
    siteName: 'ComplyFlow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ComplyFlow — India\'s Smart Legal Compliance Platform',
    description:
      'Manage GST, ROC, TDS, Labour Law, Company Secretarial and Annual Compliance from one dashboard.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ComplyFlow',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Enterprise-grade legal compliance management for GST, ROC, TDS, and corporate filings.',
  offers: { '@type': 'Offer', price: '999', priceCurrency: 'INR' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jakarta.variable} ${mono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
