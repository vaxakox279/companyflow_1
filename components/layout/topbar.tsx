'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Search, Bell, Plus, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Sidebar } from './sidebar';
import { navSections } from './nav-config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/auth/auth-provider';
import { useRouter } from 'next/navigation';

const notifications = [
  { title: 'GSTR-3B due in 2 days', tone: 'warning', company: 'Acme Pvt Ltd' },
  { title: 'ROC Annual filing overdue', tone: 'danger', company: 'Bluepeak Inc' },
  { title: 'TDS payment confirmed', tone: 'success', company: 'Nimbus Tech' },
  { title: 'New document uploaded', tone: 'primary', company: 'Vertex Labs' },
];

export function Topbar() {
  const { setTheme, theme } = useTheme();
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  React.useEffect(() => setMounted(true), []);

  const currentPage =
    navSections
      .flatMap((s) => s.items)
      .find((i) => (i.href === '/' ? pathname === '/' : pathname.startsWith(i.href)))
      ?.title ?? 'Dashboard';

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="px-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
          </SheetHeader>
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="hidden md:block">
        <h1 className="font-display text-lg font-semibold tracking-tight">
          {currentPage}
        </h1>
      </div>

      <div className="relative ml-auto w-full max-w-md hidden sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search companies, filings, documents…"
          className="h-9 rounded-lg border-border bg-muted/50 pl-9 pr-16 text-sm focus-visible:bg-background"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 select-none items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground md:flex">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:ml-3 sm:gap-2">
        <Button
          size="sm"
          className="hidden sm:inline-flex h-9 gap-1.5 rounded-lg shadow-soft"
        >
          <Plus className="h-4 w-4" />
          Create
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
              <p className="text-sm font-semibold">Notifications</p>
              <span className="text-xs text-muted-foreground">4 new</span>
            </div>
            <div className="max-h-80 overflow-y-auto scrollbar-thin">
              {notifications.map((n, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 border-b border-border/60 px-3 py-2.5 last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <span
                    className={cn(
                      'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                      n.tone === 'warning' && 'bg-warning',
                      n.tone === 'danger' && 'bg-destructive',
                      n.tone === 'success' && 'bg-success',
                      n.tone === 'primary' && 'bg-primary'
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-tight">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.company}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/portal/alerts"
              className="block border-t border-border px-3 py-2.5 text-center text-xs font-medium text-primary hover:bg-muted/50"
            >
              View all notifications
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted ? (
            theme === 'dark' ? (
              <Sun className="h-4.5 w-4.5" />
            ) : (
              <Moon className="h-4.5 w-4.5" />
            )
          ) : (
            <Sun className="h-4.5 w-4.5" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg border border-border bg-background p-1 pr-2 transition-colors hover:bg-muted/50">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                  {(user?.email ?? 'AR').slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left leading-none md:block">
                <p className="text-xs font-semibold">{user?.email?.split('@')[0] ?? 'Aarav Reddy'}</p>
                <p className="text-[10px] text-muted-foreground">Super Admin</p>
              </div>
              <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground md:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Aarav Reddy</span>
                <span className="text-xs font-normal text-muted-foreground">
                  aarav@complyflow.io
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/portal/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/portal/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/portal/leads')}>
              Leads
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => signOut()}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
