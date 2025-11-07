"use client";

import { useResume } from '@/contexts/resume-context';
import TemplateClassic from './templates/template-classic';
import TemplateModern from './templates/template-modern';
import TemplateCreative from './templates/template-creative';

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
          className="w-[8.5in] h-[11in] bg-card text-foreground p-8 shadow-lg origin-top-left"
          style={{ '--resume-color': selectedColor, transform: 'scale(var(--preview-scale, 0.8))' } as React.CSSProperties}
        >
        {renderTemplate()}
      </div>
    </div>
  );
}
