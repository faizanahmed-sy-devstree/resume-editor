import { FileText } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center gap-3 px-4 sm:px-6 h-16 border-b shrink-0">
      <FileText className="w-6 h-6 text-primary" />
      <h1 className="text-xl font-bold font-headline tracking-tight">
        ProResume Architect
      </h1>
    </header>
  );
}
