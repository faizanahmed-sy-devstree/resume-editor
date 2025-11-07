"use client";

import { useResume } from '@/contexts/resume-context';
import TemplateClassic from './templates/template-classic';
import TemplateModern from './templates/template-modern';
import TemplateCreative from './templates/template-creative';
import { cn } from '@/lib/utils';

export default function ResumePreview() {
  const { resumeData, selectedTemplate, selectedColor } = useResume();

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return <TemplateClassic data={resumeData} color={selectedColor} />;
      case 'modern':
        return <TemplateModern data={resumeData} color={selectedColor} />;
      case 'creative':
        return <TemplateCreative data={resumeData} color={selectedColor} />;
      default:
        return <TemplateModern data={resumeData} color={selectedColor} />;
    }
  };

  return (
    <div className="flex justify-center items-start">
        <div 
          id="resume-preview" 
          className={cn(
            "w-full max-w-[8.5in] aspect-[8.5/11] bg-card text-foreground p-8 shadow-lg transition-transform duration-300 origin-top transform-gpu scale-[0.7] sm:scale-[0.8] md:scale-[0.6] lg:scale-[0.7] xl:scale-[0.8] 2xl:scale-90",
            "print:!scale-100 print:!shadow-none print:!max-w-full"
          )}
          style={{ '--resume-color': selectedColor } as React.CSSProperties}
        >
        {renderTemplate()}
      </div>
    </div>
  );
}
