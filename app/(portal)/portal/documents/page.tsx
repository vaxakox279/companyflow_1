'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { documents } from '@/lib/mock-data';
import { FileText, FileSpreadsheet, FileImage, FileJson, Upload, Search, FolderOpen, MoreHorizontal, Download, Share2, Eye, Clock } from 'lucide-react';

const folders = ['All', 'GST', 'ROC', 'TDS', 'Labour', 'Audit'];

function fileIcon(type: string) {
  switch (type) {
    case 'pdf': return FileText;
    case 'xlsx': return FileSpreadsheet;
    case 'image': return FileImage;
    case 'json': return FileJson;
    default: return FileText;
  }
}

function iconColor(type: string) {
  switch (type) {
    case 'pdf': return 'bg-destructive/10 text-destructive';
    case 'xlsx': return 'bg-success/10 text-success';
    case 'image': return 'bg-primary/10 text-primary';
    case 'json': return 'bg-warning/10 text-warning';
    default: return 'bg-muted text-muted-foreground';
  }
}

export default function DocumentsPage() {
  const [active, setActive] = React.useState('All');
  const [query, setQuery] = React.useState('');

  const filtered = documents.filter((d) => {
    const matchesFolder = active === 'All' || d.folder.toLowerCase().includes(active.toLowerCase());
    const matchesQuery = !query || d.name.toLowerCase().includes(query.toLowerCase());
    return matchesFolder && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Documents" description="Central repository for filings, certificates, and compliance records.">
        <Button size="sm" className="gap-1.5"><Upload className="h-4 w-4" />Upload</Button>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Folders</p>
            <div className="space-y-1">
              {folders.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active === f ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  <FolderOpen className="h-4 w-4" />
                  {f}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-dashed border-border p-4 text-center">
              <Upload className="mx-auto h-6 w-6 text-muted-foreground/50" />
              <p className="mt-2 text-xs text-muted-foreground">Drag & drop files here</p>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documents, OCR content…"
              className="h-9 w-full rounded-lg border border-border bg-muted/50 pl-9 pr-3 text-sm outline-none focus:bg-background"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((d) => {
              const Icon = fileIcon(d.type);
              return (
                <Card key={d.id} className="group hover:shadow-elevated transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconColor(d.type)}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Share2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                    <p className="mt-3 truncate text-sm font-medium">{d.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{d.folder}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{d.size}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{d.uploaded}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
