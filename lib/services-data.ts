import type { LucideIcon } from 'lucide-react';
import {
  Receipt,
  Landmark,
  FileText,
  IndianRupee,
  Users,
  HardHat,
  Building2,
} from 'lucide-react';

export type Service = {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
  color: string;
  tagline: string;
  overview: string;
  benefits: string[];
  timeline: { step: string; desc: string; days: string }[];
  documents: string[];
  pricing: { plan: string; price: string; desc: string; features: string[] }[];
  faqs: { q: string; a: string }[];
  checklist: string[];
};

export const services: Service[] = [
  {
    slug: 'gst-compliance',
    name: 'GST Compliance',
    short: 'GSTR-1, GSTR-3B, GSTR-9, Registration & Amendments',
    icon: Receipt,
    color: 'bg-primary/10 text-primary',
    tagline: 'File every GST return on time, every time.',
    overview:
      'End-to-end GST compliance covering monthly, quarterly, and annual returns. We handle data reconciliation, filing on the GST portal, amendment applications, and refund claims — so you never miss a due date or pay a late fee.',
    benefits: [
      '100% on-time filing across GSTR-1, 3B and 9',
      'Automated reconciliation with sales & purchase data',
      'Late-fee tracking and alerts before due dates',
      'GST registration and amendment support',
      'Refund claim preparation and follow-up',
      'Dedicated CA assigned to your account',
    ],
    timeline: [
      { step: 'Data Collection', desc: 'Upload sales/purchase JSON or connect accounting', days: 'Day 1-2' },
      { step: 'Reconciliation', desc: 'Match GSTR-2A/2B, identify mismatches', days: 'Day 3-5' },
      { step: 'Return Preparation', desc: 'Draft GSTR-1 and 3B for your review', days: 'Day 6-8' },
      { step: 'Filing & Acknowledgement', desc: 'File on portal, share ARN', days: 'Day 9-10' },
    ],
    documents: ['PAN Card', 'GST Certificate', 'Sales Register', 'Purchase Register', 'Bank Statements', 'Previous Returns'],
    pricing: [
      { plan: 'Monthly', price: '₹1,499', desc: 'Per month, per GSTIN', features: ['GSTR-1 & 3B filing', 'Reconciliation', 'Due-date alerts'] },
      { plan: 'Quarterly', price: '₹3,999', desc: 'Per quarter, per GSTIN', features: ['All monthly filings', '2A/2B matching', 'Quarterly review call'] },
      { plan: 'Annual', price: '₹12,999', desc: 'Per year, per GSTIN', features: ['All monthly filings', 'GSTR-9 annual return', 'Refund support', 'Dedicated CA'] },
    ],
    faqs: [
      { q: 'What happens if I miss a GST due date?', a: 'Late fees of ₹50/day apply (capped at ₹5,000 per return). We send reminders 7, 3, and 1 day before each due date so you never miss one.' },
      { q: 'Can you file for multiple GSTINs?', a: 'Yes. Each GSTIN is tracked separately, and you get a consolidated dashboard view across all your business units.' },
      { q: 'Do you handle GST registration?', a: 'Yes — new registrations, amendments, and cancellation are all included as add-on services.' },
    ],
    checklist: ['GSTR-1', 'GSTR-3B', 'GSTR-9', 'GST Registration', 'GST Amendment'],
  },
  {
    slug: 'roc-compliance',
    name: 'ROC Compliance',
    short: 'Annual Filing, AOC-4, MGT-7, DIR-3 KYC, Incorporation',
    icon: Landmark,
    color: 'bg-warning/10 text-warning',
    tagline: 'Stay MCA-compliant without the paperwork headache.',
    overview:
      'Full Registrar of Companies (ROC) compliance — from annual filings (AOC-4, MGT-7) to director KYC, charge forms, and fresh incorporations. We prepare, review, and file every form on the MCA portal with DSC support.',
    benefits: [
      'On-time AOC-4 and MGT-7 annual filings',
      'DIR-3 KYC for all directors',
      'Company incorporation end-to-end',
      'Charge form filing (CHG-1, CHG-9)',
      'DSC procurement and renewal',
      'Board resolution drafting',
    ],
    timeline: [
      { step: 'Document Collection', desc: 'Financials, board minutes, KYC docs', days: 'Day 1-3' },
      { step: 'Form Preparation', desc: 'AOC-4 / MGT-7 drafted for review', days: 'Day 4-7' },
      { step: 'DSC & Signing', desc: 'Director signs with digital signature', days: 'Day 8-9' },
      { step: 'MCA Filing', desc: 'Filed on portal, SRN shared', days: 'Day 10' },
    ],
    documents: ['Certificate of Incorporation', 'Financial Statements', 'Board Resolution', 'Director KYC', 'DSC Token', 'Auditor Report'],
    pricing: [
      { plan: 'AOC-4', price: '₹4,999', desc: 'Per filing', features: ['Form preparation', 'MCA filing', 'SRN acknowledgement'] },
      { plan: 'MGT-7', price: '₹5,999', desc: 'Per filing', features: ['Form preparation', 'MCA filing', 'SRN acknowledgement'] },
      { plan: 'Annual Bundle', price: '₹14,999', desc: 'Per year', features: ['AOC-4 + MGT-7', 'DIR-3 KYC (2 directors)', 'DSC support', 'Dedicated CS'] },
    ],
    faqs: [
      { q: 'What is the penalty for late ROC filing?', a: '₹100 per day of delay per form, with no upper cap. Filing on time is critical — we track every due date for you.' },
      { q: 'Do I need a Digital Signature Certificate (DSC)?', a: 'Yes, all ROC forms require a DSC of a director. We help procure and renew DSCs as part of the service.' },
      { q: 'Can you handle a new company incorporation?', a: 'Absolutely — from name reservation to DIN, DSC, drafting MOA/AOA, and final COI.' },
    ],
    checklist: ['Annual Filing', 'AOC-4', 'MGT-7', 'DIR-3 KYC', 'Company Incorporation'],
  },
  {
    slug: 'tds-compliance',
    name: 'TDS Compliance',
    short: 'TDS Return, Challan, Form 16, Vendor Compliance',
    icon: FileText,
    color: 'bg-success/10 text-success',
    tagline: 'TDS deducted, deposited, and filed — correctly.',
    overview:
      'Complete TDS compliance covering quarterly returns (24Q, 26Q, 27Q), challan payments, Form 16/16A generation, and vendor compliance tracking. We ensure correct deduction rates, timely deposit, and penalty-free filing.',
    benefits: [
      'Quarterly TDS returns (24Q, 26Q, 27Q)',
      'Challan preparation and payment tracking',
      'Form 16 and 16A generation for employees & vendors',
      'Vendor PAN-ADR compliance',
      'Late interest calculation and payment',
      'TDS correction returns when needed',
    ],
    timeline: [
      { step: 'Deduction Register', desc: 'Compile monthly deduction data', days: 'Day 1-3' },
      { step: 'Challan Payment', desc: 'Pay TDS via challan before 7th', days: 'Day 4-6' },
      { step: 'Return Preparation', desc: 'Draft 24Q/26Q for review', days: 'Day 7-25' },
      { step: 'Filing & Form 16', desc: 'File return, generate Form 16/16A', days: 'Day 26-31' },
    ],
    documents: ['PAN of deductor', 'PAN of deductees', 'Salary Details', 'Vendor Invoices', 'Challan Receipts', 'Previous Returns'],
    pricing: [
      { plan: 'Per Quarter', price: '₹2,499', desc: 'Per quarter, per TAN', features: ['One return (24Q/26Q)', 'Challan tracking', 'Form 16A'] },
      { plan: 'Annual', price: '₹8,999', desc: 'Per year, per TAN', features: ['All 4 quarters', 'Form 16 for employees', 'Correction returns', 'Dedicated CA'] },
      { plan: 'Vendor Compliance', price: '₹1,499', desc: 'Per month', features: ['Vendor PAN checks', 'Low-PAN deduction alerts', 'Monthly register'] },
    ],
    faqs: [
      { q: 'When is TDS return due?', a: 'Quarterly — by the last day of the month following each quarter end (31 July, 31 Oct, 31 Jan, 31 May). We track all four.' },
      { q: 'What is the late filing fee?', a: '₹200 per day of delay (capped at the TDS amount). Plus 1% interest per month on late deposit.' },
      { q: 'Do you generate Form 16?', a: 'Yes, Form 16 for employees and Form 16A for vendors are generated automatically after each filing.' },
    ],
    checklist: ['TDS Return', 'Challan', 'Form 16', 'Vendor Compliance'],
  },
  {
    slug: 'income-tax',
    name: 'Income Tax',
    short: 'ITR Filing, Tax Audit, Advance Tax',
    icon: IndianRupee,
    color: 'bg-primary/10 text-primary',
    tagline: 'Accurate income tax filing with audit-ready precision.',
    overview:
      'Comprehensive income tax compliance — ITR filing for individuals and companies, tax audit under section 44AB, advance tax estimation, and assessment handling. We optimize your tax position while staying fully compliant.',
    benefits: [
      'ITR-1 to ITR-7 filing for all entity types',
      'Tax audit (Section 44AB) with CA certification',
      'Advance tax calculation and reminders',
      'TDS reconciliation with Form 26AS',
      'Notice and assessment response handling',
      'Tax planning recommendations',
    ],
    timeline: [
      { step: 'Data Gathering', desc: 'Collect financials, 26AS, AIS', days: 'Day 1-4' },
      { step: 'Computation', desc: 'Tax liability computed, reviewed', days: 'Day 5-8' },
      { step: 'Filing', desc: 'ITR filed, acknowledgement shared', days: 'Day 9-10' },
      { step: 'Audit (if applicable)', desc: 'Tax audit report filed u/s 44AB', days: 'Day 11-30' },
    ],
    documents: ['PAN', 'Aadhaar', 'Financial Statements', 'Form 26AS / AIS', 'Bank Statements', 'Investment Proofs'],
    pricing: [
      { plan: 'ITR (Individual)', price: '₹999', desc: 'Per return', features: ['ITR-1/2/3 filing', 'Basic tax computation', 'Acknowledgement'] },
      { plan: 'ITR (Company)', price: '₹4,999', desc: 'Per return', features: ['ITR-6 filing', 'Computation', 'Tax optimization'] },
      { plan: 'Tax Audit', price: '₹15,999', desc: 'Per audit', features: ['44AB audit', 'CA certification', 'Audit report filing', 'Dedicated CA'] },
    ],
    faqs: [
      { q: 'What is the due date for ITR filing?', a: 'Individuals: 31 July. Companies (non-audit): 31 October. Companies (audit): 31 October. We send reminders well in advance.' },
      { q: 'When is a tax audit required?', a: 'If turnover exceeds ₹1 crore (business) or ₹50 lakh (profession), or under presumptive taxation limits. We assess this for you.' },
      { q: 'Can you handle tax notices?', a: 'Yes — we draft responses to notices under 143(2), 142(1), and 148, and represent you in assessments.' },
    ],
    checklist: ['ITR Filing', 'Tax Audit', 'Advance Tax'],
  },
  {
    slug: 'payroll',
    name: 'Payroll',
    short: 'PF, ESI, Professional Tax',
    icon: Users,
    color: 'bg-warning/10 text-warning',
    tagline: 'Payroll compliance that pays itself off in peace of mind.',
    overview:
      'Statutory payroll compliance covering Provident Fund (PF), Employee State Insurance (ESI), and Professional Tax (PT). We handle monthly returns, challan payments, and employee onboarding/exits — accurately and on time.',
    benefits: [
      'Monthly PF returns and ECR filing',
      'ESI returns and challan payment',
      'Professional Tax registration and filing',
      'Employee onboarding and exit processing',
      'Pay slip generation support',
      'Labour welfare fund compliance',
    ],
    timeline: [
      { step: 'Payroll Data', desc: 'Collect attendance, salary changes', days: 'Day 1-2' },
      { step: 'PF/ESI Calculation', desc: 'Compute contributions, generate ECR', days: 'Day 3-4' },
      { step: 'Challan Payment', desc: 'Pay before 15th (PF) / 21st (ESI)', days: 'Day 5-10' },
      { step: 'Return Filing', desc: 'File ECR, PT return, share receipts', days: 'Day 11-15' },
    ],
    documents: ['PAN of company', 'PF Registration', 'ESI Registration', 'Employee List', 'Salary Sheet', 'Bank Details'],
    pricing: [
      { plan: 'Up to 20 employees', price: '₹2,999', desc: 'Per month', features: ['PF + ESI + PT', 'ECR filing', 'Challan payment'] },
      { plan: '21-50 employees', price: '₹5,999', desc: 'Per month', features: ['PF + ESI + PT', 'ECR filing', 'Challan payment', 'Pay slip support'] },
      { plan: '51+ employees', price: 'Custom', desc: 'Tailored quote', features: ['All statutory compliance', 'Dedicated payroll manager', 'Exit processing', 'Custom reports'] },
    ],
    faqs: [
      { q: 'Is PF mandatory for my company?', a: 'If you have 20 or more employees, PF is mandatory. ESI applies at 10+ employees. We assess your liability and handle registration.' },
      { q: 'What are the PF and ESI due dates?', a: 'PF challan + ECR by the 15th, ESI challan by the 21st of each month. We track both automatically.' },
      { q: 'Do you handle Professional Tax?', a: 'Yes — registration, monthly/annual returns, and challan payment, state-wise.' },
    ],
    checklist: ['PF', 'ESI', 'Professional Tax'],
  },
  {
    slug: 'labour-law',
    name: 'Labour Law',
    short: 'Shops & Establishment, Factory License, Labour Welfare',
    icon: HardHat,
    color: 'bg-destructive/10 text-destructive',
    tagline: 'Every licence, registration, and return — handled.',
    overview:
      'Comprehensive labour law compliance including Shops & Establishment registration, Factory Licence, Building & Other Construction Workers (BOCW) compliance, and Labour Welfare Fund. We keep your registrations current and filings on schedule.',
    benefits: [
      'Shops & Establishment registration & renewal',
      'Factory Licence application and amendment',
      'BOCW registration and returns',
      'Labour Welfare Fund deductions and deposits',
      'Inspection support and documentation',
      'Compliance calendar for all labour laws',
    ],
    timeline: [
      { step: 'Eligibility Check', desc: 'Determine applicable laws', days: 'Day 1-2' },
      { step: 'Document Prep', desc: 'Collect proofs, draft applications', days: 'Day 3-5' },
      { step: 'Submission', desc: 'File with labour department', days: 'Day 6-8' },
      { step: 'Licence Issued', desc: 'Certificate shared, renewal scheduled', days: 'Day 9-30' },
    ],
    documents: ['PAN of company', 'Address Proof', 'Rent/Lease Agreement', 'Employee Count', 'Safety Equipment List', 'Previous Licences'],
    pricing: [
      { plan: 'Shops & Est.', price: '₹3,999', desc: 'One-time + renewal', features: ['Registration', 'Renewal tracking', 'Amendment support'] },
      { plan: 'Factory Licence', price: '₹9,999', desc: 'One-time', features: ['Application', 'Plan approval support', 'Licence procurement'] },
      { plan: 'Annual Compliance', price: '₹14,999', desc: 'Per year', features: ['All labour returns', 'LWF deposits', 'Inspection support', 'Dedicated advisor'] },
    ],
    faqs: [
      { q: 'Which labour laws apply to my business?', a: 'It depends on your industry, employee count, and state. We run a free applicability check and build your compliance calendar.' },
      { q: 'Do you handle factory licence?', a: 'Yes — new applications, renewals, plan approvals, and amendments, end-to-end with the factory inspectorate.' },
      { q: 'What is the Labour Welfare Fund?', a: 'A state-level statutory deduction from employee and employer, deposited half-yearly. We compute, deduct, and deposit it for you.' },
    ],
    checklist: ['Shops & Establishment', 'Factory License', 'Labour Welfare'],
  },
  {
    slug: 'company-incorporation',
    name: 'Company Incorporation',
    short: 'Private Limited, LLP, OPC — start your company right',
    icon: Building2,
    color: 'bg-primary/10 text-primary',
    tagline: 'From idea to incorporation certificate in days.',
    overview:
      'Complete company incorporation services — Private Limited, LLP, One Person Company (OPC), or Partnership. We handle name reservation, DIN, DSC, MOA/AOA drafting, and final filing with the MCA to get your Certificate of Incorporation.',
    benefits: [
      'Private Limited, LLP, OPC, Partnership',
      'Name reservation (RUN/SPICe+)',
      'DIN and DSC procurement',
      'MOA and AOA drafting',
      'PAN, TAN, GST, bank account setup',
      'Post-incorporation compliance kit',
    ],
    timeline: [
      { step: 'Name Approval', desc: 'Reserve your company name via RUN', days: 'Day 1-2' },
      { step: 'DSC & DIN', desc: 'Digital signatures and director IDs', days: 'Day 3-4' },
      { step: 'MOA/AOA Drafting', desc: 'Charter documents prepared', days: 'Day 5-6' },
      { step: 'Filing & COI', desc: 'SPICe+ filed, Certificate issued', days: 'Day 7-12' },
    ],
    documents: ['Director PAN', 'Director Aadhaar', 'Address Proof', 'Registered Office Proof', 'Utility Bill', 'Passport-size Photo'],
    pricing: [
      { plan: 'Private Limited', price: '₹7,999', desc: 'All-inclusive (govt. fees extra)', features: ['Name reservation', 'DIN + DSC', 'MOA/AOA', 'PAN + TAN', 'COI'] },
      { plan: 'LLP', price: '₹6,499', desc: 'All-inclusive (govt. fees extra)', features: ['Name reservation', 'DPIN + DSC', 'LLP agreement', 'PAN + TAN'] },
      { plan: 'OPC', price: '₹6,999', desc: 'All-inclusive (govt. fees extra)', features: ['Single director setup', 'DIN + DSC', 'MOA/AOA', 'PAN + TAN'] },
    ],
    faqs: [
      { q: 'How long does incorporation take?', a: 'Typically 10-15 working days from document submission, subject to MCA processing. We expedite where possible.' },
      { q: 'Which company type should I choose?', a: 'Private Limited for startups raising funding, LLP for professional firms, OPC for solo founders. We advise based on your goals.' },
      { q: 'Do you help with post-incorporation compliance?', a: 'Yes — you get a compliance kit covering ROC filings, GST registration, and a first-year compliance calendar.' },
    ],
    checklist: ['Company Incorporation', 'PAN', 'TAN', 'GST Registration'],
  },
];

export const industries = [
  { name: 'Manufacturing', icon: HardHat, desc: 'Factory licences, PF, ESI, GST input credit' },
  { name: 'IT Companies', icon: Receipt, desc: 'GST, TDS, ESOP compliance, ROC filings' },
  { name: 'Hospitals', icon: Users, desc: 'PF, ESI, professional tax, GST on services' },
  { name: 'Schools', icon: Building2, desc: 'Trust compliance, TDS, GST, labour laws' },
  { name: 'Hotels', icon: Building2, desc: 'GST, shops & establishment, FSSAI' },
  { name: 'NGOs', icon: Users, desc: '12A/80G, FCRA, audit, ROC for section 8' },
  { name: 'Construction', icon: HardHat, desc: 'BOCW, PF, contract labour, GST' },
  { name: 'Retail', icon: Receipt, desc: 'GST, shops & establishment, professional tax' },
];

export const testimonials = [
  { name: 'Vikram Patel', role: 'Founder, Bluepeak Inc', quote: 'ComplyFlow replaced three CA firms and a spreadsheet. Our ROC filings have been on time every single quarter.', rating: 5 },
  { name: 'Sneha Iyer', role: 'CFO, Nimbus Tech LLP', quote: 'The compliance calendar alone is worth it. We can see every deadline across 5 GSTINs in one view.', rating: 5 },
  { name: 'Arjun Malhotra', role: 'Managing Partner, Malhotra & Associates CA', quote: 'As a CA firm, ComplyFlow lets us manage 40+ clients from a single dashboard. Our team productivity has doubled.', rating: 5 },
];

export const pricingPlans = [
  {
    name: 'Starter',
    price: '₹999',
    period: '/month',
    desc: 'For small companies getting started with compliance',
    features: ['Up to 1 company', 'GST + TDS compliance', 'Compliance calendar', 'Email reminders', 'Document storage (1 GB)', 'Community support'],
    cta: 'Start Free Trial',
    href: '/register',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '₹2,999',
    period: '/month',
    desc: 'For growing businesses managing multiple compliances',
    features: ['Up to 5 companies', 'All compliance modules', 'Advanced calendar & alerts', 'Email + SMS reminders', 'Document storage (10 GB)', 'Dedicated CA support', 'Audit logs & reports', 'Up to 10 users'],
    cta: 'Start Free Trial',
    href: '/register',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For CA firms, CS firms & large enterprises',
    features: ['Unlimited companies', 'All modules + API access', 'WhatsApp + push alerts', 'Unlimited storage', 'Dedicated account manager', 'Custom workflows & RBAC', 'SLA-backed support', 'SSO & MFA enforcement'],
    cta: 'Contact Sales',
    href: '/contact',
    highlighted: false,
  },
];

export const faqs = [
  { q: 'What compliances does ComplyFlow cover?', a: 'GST, ROC, TDS, Income Tax, Payroll (PF/ESI/PT), Labour Law, and Company Incorporation — all from one dashboard.' },
  { q: 'Is my data secure?', a: 'Yes. We use row-level security, encryption at rest and in transit, MFA, and full audit trails. Your data is never shared with third parties.' },
  { q: 'Can I use ComplyFlow for multiple companies?', a: 'Absolutely. The Professional plan supports up to 5 companies and Enterprise supports unlimited, each with its own compliance profile.' },
  { q: 'Do you assign a CA or CS to my account?', a: 'Yes. On the Professional and Enterprise plans, a dedicated compliance expert is assigned and visible in your dashboard.' },
  { q: 'How do reminders work?', a: 'Automated reminders go out 7, 3, and 1 day before each deadline, on the due day, and daily once overdue — via email, SMS, WhatsApp, and push.' },
  { q: 'Can I cancel anytime?', a: 'Yes, no lock-in. Cancel from Settings and your data remains exportable for 90 days.' },
];
