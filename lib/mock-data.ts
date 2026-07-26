export type ComplianceStatus =
  | 'completed'
  | 'in-progress'
  | 'upcoming'
  | 'overdue';

export type Priority = 'low' | 'medium' | 'high' | 'critical';

export type Company = {
  id: string;
  name: string;
  gstin: string;
  pan: string;
  cin: string;
  incorporationDate: string;
  businessType: 'Private Limited' | 'Public Limited' | 'LLP' | 'Partnership' | 'Proprietorship';
  industry: string;
  city: string;
  status: 'active' | 'inactive';
  complianceScore: number;
};

export type Compliance = {
  id: string;
  name: string;
  department: 'GST' | 'ROC' | 'TDS' | 'Income Tax' | 'Labour' | 'MCA';
  law: string;
  dueDate: string;
  priority: Priority;
  responsible: string;
  status: ComplianceStatus;
  remarks?: string;
  companyId: string;
};

export const companies: Company[] = [
  {
    id: 'c1',
    name: 'Acme Pvt Ltd',
    gstin: '27ABCDE1234F1Z5',
    pan: 'ABCDE1234F',
    cin: 'U72200MH2019PTC123456',
    incorporationDate: '2019-04-12',
    businessType: 'Private Limited',
    industry: 'Information Technology',
    city: 'Mumbai',
    status: 'active',
    complianceScore: 92,
  },
  {
    id: 'c2',
    name: 'Bluepeak Inc',
    gstin: '29FGHIJ5678K1Z2',
    pan: 'FGHIJ5678K',
    cin: 'U72200KA2020PTC987654',
    incorporationDate: '2020-01-23',
    businessType: 'Private Limited',
    industry: 'SaaS',
    city: 'Bengaluru',
    status: 'active',
    complianceScore: 78,
  },
  {
    id: 'c3',
    name: 'Nimbus Tech LLP',
    gstin: '07KLMNO9012P1Z9',
    pan: 'KLMNO9012P',
    cin: 'AAA-1234',
    incorporationDate: '2021-06-15',
    businessType: 'LLP',
    industry: 'Cloud Services',
    city: 'Delhi',
    status: 'active',
    complianceScore: 85,
  },
  {
    id: 'c4',
    name: 'Vertex Labs',
    gstin: '33PQRST3456U1Z4',
    pan: 'PQRST3456U',
    cin: 'U72900TN2018PTC112233',
    incorporationDate: '2018-09-30',
    businessType: 'Private Limited',
    industry: 'AI / ML',
    city: 'Chennai',
    status: 'active',
    complianceScore: 64,
  },
  {
    id: 'c5',
    name: 'Orbit Retail',
    gstin: '24VWXYZ7890A1Z7',
    pan: 'VWXYZ7890A',
    cin: 'U52100GJ2017PTC556677',
    incorporationDate: '2017-03-08',
    businessType: 'Partnership',
    industry: 'Retail',
    city: 'Ahmedabad',
    status: 'inactive',
    complianceScore: 45,
  },
];

export const compliances: Compliance[] = [
  {
    id: 'cm1',
    name: 'GSTR-1 Filing',
    department: 'GST',
    law: 'CGST Act, 2017',
    dueDate: '2026-08-11',
    priority: 'high',
    responsible: 'Priya Sharma',
    status: 'upcoming',
    remarks: 'Awaiting sales data reconciliation',
    companyId: 'c1',
  },
  {
    id: 'cm2',
    name: 'GSTR-3B Filing',
    department: 'GST',
    law: 'CGST Act, 2017',
    dueDate: '2026-08-20',
    priority: 'high',
    responsible: 'Priya Sharma',
    status: 'upcoming',
    companyId: 'c1',
  },
  {
    id: 'cm3',
    name: 'AOC-4 Annual Filing',
    department: 'ROC',
    law: 'Companies Act, 2013',
    dueDate: '2026-07-30',
    priority: 'critical',
    responsible: 'Rohan Mehta',
    status: 'overdue',
    remarks: 'Board resolution pending',
    companyId: 'c2',
  },
  {
    id: 'cm4',
    name: 'MGT-7 Annual Return',
    department: 'ROC',
    law: 'Companies Act, 2013',
    dueDate: '2026-11-28',
    priority: 'medium',
    responsible: 'Rohan Mehta',
    status: 'upcoming',
    companyId: 'c2',
  },
  {
    id: 'cm5',
    name: 'TDS Q1 Return (24Q)',
    department: 'TDS',
    law: 'Income Tax Act, 1961',
    dueDate: '2026-07-31',
    priority: 'critical',
    responsible: 'Anita Desai',
    status: 'in-progress',
    companyId: 'c3',
  },
  {
    id: 'cm6',
    name: 'DIR-3 KYC',
    department: 'ROC',
    law: 'Companies Act, 2013',
    dueDate: '2026-09-30',
    priority: 'medium',
    responsible: 'Rohan Mehta',
    status: 'upcoming',
    companyId: 'c4',
  },
  {
    id: 'cm7',
    name: 'GSTR-9 Annual Return',
    department: 'GST',
    law: 'CGST Act, 2017',
    dueDate: '2026-12-31',
    priority: 'medium',
    responsible: 'Priya Sharma',
    status: 'upcoming',
    companyId: 'c1',
  },
  {
    id: 'cm8',
    name: 'TDS Payment Challan',
    department: 'TDS',
    law: 'Income Tax Act, 1961',
    dueDate: '2026-07-07',
    priority: 'high',
    responsible: 'Anita Desai',
    status: 'completed',
    companyId: 'c3',
  },
  {
    id: 'cm9',
    name: 'PF Monthly Return',
    department: 'Labour',
    law: 'EPF Act, 1952',
    dueDate: '2026-07-25',
    priority: 'high',
    responsible: 'Karan Singh',
    status: 'completed',
    companyId: 'c4',
  },
  {
    id: 'cm10',
    name: 'Professional Tax',
    department: 'Labour',
    law: 'State PT Act',
    dueDate: '2026-08-15',
    priority: 'low',
    responsible: 'Karan Singh',
    status: 'upcoming',
    companyId: 'c5',
  },
];

export const recentActivities = [
  { id: 'a1', user: 'Priya Sharma', action: 'uploaded', target: 'GSTR-1 JSON file', time: '2h ago', tone: 'primary' as const },
  { id: 'a2', user: 'Rohan Mehta', action: 'marked overdue', target: 'AOC-4 filing', time: '5h ago', tone: 'danger' as const },
  { id: 'a3', user: 'Anita Desai', action: 'completed', target: 'TDS challan payment', time: '1d ago', tone: 'success' as const },
  { id: 'a4', user: 'Karan Singh', action: 'created task', target: 'PF reconciliation', time: '1d ago', tone: 'primary' as const },
  { id: 'a5', user: 'Aarav Reddy', action: 'invited', target: 'new CA user', time: '2d ago', tone: 'primary' as const },
];

export const auditLogs = [
  { id: 'l1', user: 'Aarav Reddy', action: 'login', target: 'session', timestamp: '2026-07-26 09:14', ip: '103.21.58.42', browser: 'Chrome 126 / macOS' },
  { id: 'l2', user: 'Priya Sharma', action: 'document.upload', target: 'GSTR-1-Q1.json', timestamp: '2026-07-26 11:02', ip: '49.36.22.10', browser: 'Chrome 126 / Windows' },
  { id: 'l3', user: 'Rohan Mehta', action: 'compliance.update', target: 'AOC-4 status → overdue', timestamp: '2026-07-26 12:30', ip: '157.34.12.8', browser: 'Safari 17 / macOS' },
  { id: 'l4', user: 'Anita Desai', action: 'document.delete', target: 'old-challan.pdf', timestamp: '2026-07-25 16:45', ip: '103.21.58.42', browser: 'Firefox 127 / Linux' },
  { id: 'l5', user: 'Aarav Reddy', action: 'user.create', target: 'karan@vertex.io', timestamp: '2026-07-25 14:10', ip: '103.21.58.42', browser: 'Chrome 126 / macOS' },
  { id: 'l6', user: 'Aarav Reddy', action: 'permission.change', target: 'Anita → Manager', timestamp: '2026-07-24 10:22', ip: '103.21.58.42', browser: 'Chrome 126 / macOS' },
  { id: 'l7', user: 'Priya Sharma', action: 'logout', target: 'session', timestamp: '2026-07-24 18:55', ip: '49.36.22.10', browser: 'Chrome 126 / Windows' },
];

export const users = [
  { id: 'u1', name: 'Aarav Reddy', email: 'aarav@complyflow.io', role: 'Super Admin', status: 'active', lastActive: 'Just now' },
  { id: 'u2', name: 'Priya Sharma', email: 'priya@complyflow.io', role: 'CA', status: 'active', lastActive: '2h ago' },
  { id: 'u3', name: 'Rohan Mehta', email: 'rohan@complyflow.io', role: 'CS', status: 'active', lastActive: '5h ago' },
  { id: 'u4', name: 'Anita Desai', email: 'anita@complyflow.io', role: 'Manager', status: 'active', lastActive: '1d ago' },
  { id: 'u5', name: 'Karan Singh', email: 'karan@vertex.io', role: 'Employee', status: 'active', lastActive: '2d ago' },
  { id: 'u6', name: 'Neha Gupta', email: 'neha@bluepeak.io', role: 'Company Admin', status: 'invited', lastActive: '—' },
];

export const documents = [
  { id: 'd1', name: 'GSTR-1-Q1-2026.json', folder: 'GST / Acme', size: '242 KB', uploaded: '2h ago', type: 'json' },
  { id: 'd2', name: 'Board-Resolution-2026.pdf', folder: 'ROC / Bluepeak', size: '1.2 MB', uploaded: '1d ago', type: 'pdf' },
  { id: 'd3', name: 'TDS-Challan-Q1.pdf', folder: 'TDS / Nimbus', size: '480 KB', uploaded: '2d ago', type: 'pdf' },
  { id: 'd4', name: 'Certificate-of-Incorporation.pdf', folder: 'ROC / Vertex', size: '2.1 MB', uploaded: '3d ago', type: 'pdf' },
  { id: 'd5', name: 'Salary-Register-Jun.xlsx', folder: 'Labour / Vertex', size: '88 KB', uploaded: '4d ago', type: 'xlsx' },
  { id: 'd6', name: 'GST-Registration.png', folder: 'GST / Acme', size: '3.4 MB', uploaded: '1w ago', type: 'image' },
];

export const tasks = [
  { id: 't1', title: 'Reconcile GSTR-1 sales data', assignee: 'Priya Sharma', dueDate: '2026-08-10', priority: 'high' as Priority, status: 'in-progress', company: 'Acme Pvt Ltd' },
  { id: 't2', title: 'Prepare board resolution for AOC-4', assignee: 'Rohan Mehta', dueDate: '2026-07-28', priority: 'critical' as Priority, status: 'todo', company: 'Bluepeak Inc' },
  { id: 't3', title: 'Verify TDS deduction register', assignee: 'Anita Desai', dueDate: '2026-07-30', priority: 'high' as Priority, status: 'in-progress', company: 'Nimbus Tech LLP' },
  { id: 't4', title: 'Collect DIR-3 KYC documents', assignee: 'Karan Singh', dueDate: '2026-09-15', priority: 'medium' as Priority, status: 'todo', company: 'Vertex Labs' },
  { id: 't5', title: 'File Professional Tax return', assignee: 'Karan Singh', dueDate: '2026-08-15', priority: 'low' as Priority, status: 'todo', company: 'Orbit Retail' },
  { id: 't6', title: 'Upload signed audit report', assignee: 'Priya Sharma', dueDate: '2026-07-29', priority: 'high' as Priority, status: 'review', company: 'Acme Pvt Ltd' },
];

export const monthlyCompliance = [
  { month: 'Jan', completed: 18, pending: 2, overdue: 1 },
  { month: 'Feb', completed: 22, pending: 1, overdue: 0 },
  { month: 'Mar', completed: 25, pending: 3, overdue: 2 },
  { month: 'Apr', completed: 20, pending: 2, overdue: 1 },
  { month: 'May', completed: 24, pending: 1, overdue: 0 },
  { month: 'Jun', completed: 28, pending: 4, overdue: 1 },
  { month: 'Jul', completed: 19, pending: 6, overdue: 3 },
];

export const gstFilingTrend = [
  { month: 'Jan', gstr1: 100, gstr3b: 100, gstr9: 0 },
  { month: 'Feb', gstr1: 100, gstr3b: 100, gstr9: 0 },
  { month: 'Mar', gstr1: 95, gstr3b: 100, gstr9: 0 },
  { month: 'Apr', gstr1: 100, gstr3b: 90, gstr9: 0 },
  { month: 'May', gstr1: 100, gstr3b: 100, gstr9: 0 },
  { month: 'Jun', gstr1: 100, gstr3b: 100, gstr9: 0 },
  { month: 'Jul', gstr1: 60, gstr3b: 40, gstr9: 0 },
];

export const complianceCompletion = [
  { name: 'GST', value: 88, fill: 'hsl(var(--chart-1))' },
  { name: 'ROC', value: 72, fill: 'hsl(var(--chart-3))' },
  { name: 'TDS', value: 95, fill: 'hsl(var(--chart-2))' },
  { name: 'Labour', value: 80, fill: 'hsl(var(--chart-5))' },
];

export function statusTone(status: ComplianceStatus): 'success' | 'warning' | 'danger' | 'primary' | 'neutral' {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in-progress':
      return 'primary';
    case 'upcoming':
      return 'warning';
    case 'overdue':
      return 'danger';
  }
}

export function statusLabel(status: ComplianceStatus): string {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in-progress':
      return 'In Progress';
    case 'upcoming':
      return 'Upcoming';
    case 'overdue':
      return 'Overdue';
  }
}

export function priorityTone(p: Priority): 'neutral' | 'primary' | 'warning' | 'danger' {
  switch (p) {
    case 'low':
      return 'neutral';
    case 'medium':
      return 'primary';
    case 'high':
      return 'warning';
    case 'critical':
      return 'danger';
  }
}
