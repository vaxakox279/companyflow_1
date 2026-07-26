import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  Receipt,
  Landmark,
  FileText,
  FolderOpen,
  ListTodo,
  Bell,
  ScrollText,
  FileBarChart,
  Users,
  Settings,
  UserCircle,
  Inbox,
} from 'lucide-react';

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  badgeTone?: 'primary' | 'warning' | 'danger' | 'success';
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const navSections: NavSection[] = [
  {
    label: 'Overview',
    items: [
      { title: 'Dashboard', href: '/portal', icon: LayoutDashboard },
      { title: 'Companies', href: '/portal/companies', icon: Building2 },
      {
        title: 'Compliance Calendar',
        href: '/portal/calendar',
        icon: CalendarDays,
      },
    ],
  },
  {
    label: 'Compliance Modules',
    items: [
      {
        title: 'GST',
        href: '/portal/gst',
        icon: Receipt,
        badge: '3',
        badgeTone: 'warning',
      },
      {
        title: 'ROC',
        href: '/portal/roc',
        icon: Landmark,
        badge: '2',
        badgeTone: 'danger',
      },
      { title: 'TDS', href: '/portal/tds', icon: FileText },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { title: 'Documents', href: '/portal/documents', icon: FolderOpen },
      { title: 'Tasks', href: '/portal/tasks', icon: ListTodo, badge: '12', badgeTone: 'primary' },
      { title: 'Alerts', href: '/portal/alerts', icon: Bell, badge: '5', badgeTone: 'danger' },
      { title: 'Audit Logs', href: '/portal/audit-logs', icon: ScrollText },
      { title: 'Reports', href: '/portal/reports', icon: FileBarChart },
      { title: 'Leads', href: '/portal/leads', icon: Inbox, badge: 'New', badgeTone: 'primary' },
    ],
  },
  {
    label: 'Administration',
    items: [
      { title: 'Users', href: '/portal/users', icon: Users },
      { title: 'Settings', href: '/portal/settings', icon: Settings },
      { title: 'Profile', href: '/portal/profile', icon: UserCircle },
    ],
  },
];
