"use client";

import { ResumeProvider } from '@/contexts/resume-context';
import Header from '@/components/header';
import ResumeControls from '@/components/resume-controls';
import ResumePreview from '@/components/resume-preview';
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProResumeArchitectPage() {
  return (
    <ResumeProvider>
      <div className="flex flex-col h-screen max-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-[450px,1fr] lg:overflow-hidden">
          <ScrollArea className="h-full">
            <ResumeControls />
          </ScrollArea>
          <ScrollArea className="h-full bg-muted/50 p-4 sm:p-8 lg:p-12">
            <ResumePreview />
          </ScrollArea>
        </main>
      </div>
    </ResumeProvider>
  );
}
