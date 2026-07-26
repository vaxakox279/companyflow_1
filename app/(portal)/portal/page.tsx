'use client';

import * as React from 'react';
import {
  Building2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Landmark,
  CalendarClock,
  ArrowUpRight,
  Upload,
  FileBarChart,
  UserPlus,
  FilePlus2,
  ChevronRight,
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  monthlyCompliance,
  gstFilingTrend,
  complianceCompletion,
  compliances,
  companies,
  recentActivities,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const quickActions = [
  { label: 'Add Compliance', icon: FilePlus2, tone: 'primary' as const },
  { label: 'Upload Document', icon: Upload, tone: 'neutral' as const },
  { label: 'Generate Report', icon: FileBarChart, tone: 'neutral' as const },
  { label: 'Invite User', icon: UserPlus, tone: 'neutral' as const },
];

export default function DashboardPage() {
  const upcoming = compliances
    .filter((c) => c.status !== 'completed')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader
        title="Dashboard"
        description="Compliance health across all your companies — updated live."
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          Last 30 days
          <ChevronRight className="h-3.5 w-3.5 rotate-90" />
        </Button>
        <Button size="sm" className="gap-1.5">
          <FilePlus2 className="h-4 w-4" />
          New Compliance
        </Button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Companies" value={companies.length} icon={Building2} tone="primary" trend="up" trendLabel="+2" />
        <StatCard label="Pending" value={compliances.filter((c) => c.status !== 'completed').length} icon={Clock} tone="warning" trend="down" trendLabel="-3" />
        <StatCard label="Completed" value={compliances.filter((c) => c.status === 'completed').length} icon={CheckCircle2} tone="success" trend="up" trendLabel="+8" />
        <StatCard label="Overdue" value={compliances.filter((c) => c.status === 'overdue').length} icon={AlertTriangle} tone="danger" trend="up" trendLabel="+1" />
        <StatCard label="GST Due" value="3" icon={Receipt} tone="primary" />
        <StatCard label="ROC Due" value="2" icon={Landmark} tone="danger" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Monthly Compliance Status</CardTitle>
              <CardDescription className="text-xs">
                Filings completed vs pending vs overdue
              </CardDescription>
            </div>
            <Tabs defaultValue="6m">
              <TabsList className="h-8">
                <TabsTrigger value="3m" className="text-xs">3M</TabsTrigger>
                <TabsTrigger value="6m" className="text-xs">6M</TabsTrigger>
                <TabsTrigger value="1y" className="text-xs">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyCompliance} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                  cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                />
                <Bar dataKey="completed" stackId="a" fill="hsl(var(--chart-2))" radius={[0, 0, 4, 4]} maxBarSize={36} />
                <Bar dataKey="pending" stackId="a" fill="hsl(var(--chart-3))" maxBarSize={36} />
                <Bar dataKey="overdue" stackId="a" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Completion %</CardTitle>
            <CardDescription className="text-xs">By department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={complianceCompletion}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {complianceCompletion.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">GST Filing Trend</CardTitle>
            <CardDescription className="text-xs">
              On-time filing rate across GSTR-1, 3B and 9
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={gstFilingTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="gstr1" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#g1)" name="GSTR-1" />
                <Area type="monotone" dataKey="gstr3b" stroke="hsl(var(--chart-2))" strokeWidth={2} fill="url(#g2)" name="GSTR-3B" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
            <CardDescription className="text-xs">Next 5 due items</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {upcoming.map((c) => {
              const company = companies.find((co) => co.id === c.companyId);
              return (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-lg border border-border/60 p-2.5 transition-colors hover:bg-muted/40"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {company?.name} · {c.department}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge tone={c.status === 'overdue' ? 'danger' : 'warning'}>
                      {new Date(c.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </StatusBadge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {quickActions.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.label}
                  className={cn(
                    'group flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-primary/40 hover:shadow-soft'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg',
                      a.tone === 'primary'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium">{a.label}</span>
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {recentActivities.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/40"
              >
                <span
                  className={cn(
                    'h-2 w-2 shrink-0 rounded-full',
                    a.tone === 'danger' && 'bg-destructive',
                    a.tone === 'success' && 'bg-success',
                    a.tone === 'primary' && 'bg-primary'
                  )}
                />
                <p className="flex-1 text-sm">
                  <span className="font-medium">{a.user}</span>{' '}
                  <span className="text-muted-foreground">{a.action}</span>{' '}
                  <span className="font-medium">{a.target}</span>
                </p>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
