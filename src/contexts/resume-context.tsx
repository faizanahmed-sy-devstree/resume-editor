"use client";

import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { initialResumeData, templateColors } from '@/lib/constants';
import type { ResumeData, TemplateId } from '@/lib/types';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
  selectedTemplate: TemplateId;
  setSelectedTemplate: Dispatch<SetStateAction<TemplateId>>;
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('modern');
  const [selectedColor, setSelectedColor] = useState<string>(templateColors[0]);

  const value = {
    resumeData,
    setResumeData,
    selectedTemplate,
    setSelectedTemplate,
    selectedColor,
    setSelectedColor,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
