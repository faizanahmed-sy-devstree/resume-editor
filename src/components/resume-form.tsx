"use client";

import React, { useState } from 'react';
import { useResume } from '@/contexts/resume-context';
import type { Experience, Education, Skill } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, BrainCircuit, Loader2 } from 'lucide-react';
import { getSuggestions } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

export default function ResumeForm() {
  const { resumeData, setResumeData } = useResume();
  const { toast } = useToast();
  const [suggestion, setSuggestion] = useState('');
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: string, index?: number) => {
    const { name, value } = e.target;
    setResumeData(prev => {
      if (section === 'personalDetails' || section === 'summary') {
        return {
          ...prev,
          [section]: typeof prev[section] === 'string' ? value : { ...prev[section], [name]: value }
        };
      }
      const sectionData = prev[section as keyof typeof prev] as any[];
      const updatedSection = [...sectionData];
      if (index !== undefined) {
        updatedSection[index] = { ...updatedSection[index], [name]: value };
      }
      return { ...prev, [section]: updatedSection };
    });
  };

  const handleAddItem = (section: 'experience' | 'education' | 'skills') => {
    const newItem: Experience | Education | Skill =
      section === 'experience' ? { id: crypto.randomUUID(), company: '', role: '', startDate: '', endDate: '', description: '' } :
      section === 'education' ? { id: crypto.randomUUID(), institution: '', degree: '', startDate: '', endDate: '', description: '' } :
      { id: crypto.randomUUID(), name: '' };
    
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const handleRemoveItem = (section: 'experience' | 'education' | 'skills', id: string) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const handleSuggestion = async (field: 'summary' | 'description', index?: number) => {
    setIsSuggestionLoading(true);
    setIsSuggestionOpen(true);
    let content = '';
    if (field === 'summary') content = resumeData.summary;
    if (field === 'description' && index !== undefined) content = resumeData.experience[index].description;
    
    try {
      const result = await getSuggestions(content);
      setSuggestion(result);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "AI Suggestion Error",
        description: "Could not fetch suggestions. Please try again.",
      });
      setIsSuggestionOpen(false);
    } finally {
      setIsSuggestionLoading(false);
    }
  };

  const applySuggestion = (field: 'summary' | 'description', index?: number) => {
    setResumeData(prev => {
      let newData = { ...prev };
      if (field === 'summary') {
        newData.summary = suggestion;
      } else if (field === 'description' && index !== undefined) {
        const newExperience = [...newData.experience];
        newExperience[index].description = suggestion;
        newData.experience = newExperience;
      }
      return newData;
    });
    setIsSuggestionOpen(false);
  };

  return (
    <>
      <Accordion type="multiple" defaultValue={['personal', 'summary']} className="w-full">
        <AccordionItem value="personal">
          <AccordionTrigger className="px-6">Personal Details</AccordionTrigger>
          <AccordionContent className="px-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label htmlFor="name">Full Name</Label><Input id="name" name="name" value={resumeData.personalDetails.name} onChange={(e) => handleChange(e, 'personalDetails')} /></div>
              <div><Label htmlFor="title">Title</Label><Input id="title" name="title" value={resumeData.personalDetails.title} onChange={(e) => handleChange(e, 'personalDetails')} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" value={resumeData.personalDetails.email} onChange={(e) => handleChange(e, 'personalDetails')} /></div>
              <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" value={resumeData.personalDetails.phone} onChange={(e) => handleChange(e, 'personalDetails')} /></div>
            </div>
            <div><Label htmlFor="location">Location</Label><Input id="location" name="location" value={resumeData.personalDetails.location} onChange={(e) => handleChange(e, 'personalDetails')} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label htmlFor="website">Website</Label><Input id="website" name="website" value={resumeData.personalDetails.website} onChange={(e) => handleChange(e, 'personalDetails')} /></div>
              <div><Label htmlFor="linkedin">LinkedIn</Label><Input id="linkedin" name="linkedin" value={resumeData.personalDetails.linkedin} onChange={(e) => handleChange(e, 'personalDetails')} /></div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="summary">
          <AccordionTrigger className="px-6">Professional Summary</AccordionTrigger>
          <AccordionContent className="px-6 space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="summary">Summary</Label>
              <Button variant="ghost" size="sm" onClick={() => handleSuggestion('summary')}>
                <BrainCircuit className="w-4 h-4 mr-2" />
                AI Suggest
              </Button>
            </div>
            <Textarea id="summary" name="summary" value={resumeData.summary} onChange={(e) => handleChange(e, 'summary')} rows={5} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger className="px-6">Work Experience</AccordionTrigger>
          <AccordionContent className="px-6">
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="space-y-4 border-b py-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Position {index + 1}</p>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveItem('experience', exp.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor={`role-${index}`}>Role</Label><Input id={`role-${index}`} name="role" value={exp.role} onChange={(e) => handleChange(e, 'experience', index)} /></div>
                  <div><Label htmlFor={`company-${index}`}>Company</Label><Input id={`company-${index}`} name="company" value={exp.company} onChange={(e) => handleChange(e, 'experience', index)} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor={`startDate-exp-${index}`}>Start Date</Label><Input id={`startDate-exp-${index}`} name="startDate" value={exp.startDate} onChange={(e) => handleChange(e, 'experience', index)} /></div>
                  <div><Label htmlFor={`endDate-exp-${index}`}>End Date</Label><Input id={`endDate-exp-${index}`} name="endDate" value={exp.endDate} onChange={(e) => handleChange(e, 'experience', index)} /></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`description-exp-${index}`}>Description</Label>
                    <Button variant="ghost" size="sm" onClick={() => handleSuggestion('description', index)}>
                      <BrainCircuit className="w-4 h-4 mr-2" />
                      AI Suggest
                    </Button>
                  </div>
                  <Textarea id={`description-exp-${index}`} name="description" value={exp.description} onChange={(e) => handleChange(e, 'experience', index)} rows={4} />
                </div>
              </div>
            ))}
            <Button variant="outline" className="mt-4 w-full" onClick={() => handleAddItem('experience')}><Plus className="mr-2 h-4 w-4" /> Add Experience</Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger className="px-6">Education</AccordionTrigger>
          <AccordionContent className="px-6">
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="space-y-4 border-b py-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Entry {index + 1}</p>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveItem('education', edu.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor={`institution-${index}`}>Institution</Label><Input id={`institution-${index}`} name="institution" value={edu.institution} onChange={(e) => handleChange(e, 'education', index)} /></div>
                  <div><Label htmlFor={`degree-${index}`}>Degree/Field</Label><Input id={`degree-${index}`} name="degree" value={edu.degree} onChange={(e) => handleChange(e, 'education', index)} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor={`startDate-edu-${index}`}>Start Date</Label><Input id={`startDate-edu-${index}`} name="startDate" value={edu.startDate} onChange={(e) => handleChange(e, 'education', index)} /></div>
                  <div><Label htmlFor={`endDate-edu-${index}`}>End Date</Label><Input id={`endDate-edu-${index}`} name="endDate" value={edu.endDate} onChange={(e) => handleChange(e, 'education', index)} /></div>
                </div>
                <div><Label htmlFor={`description-edu-${index}`}>Description</Label><Textarea id={`description-edu-${index}`} name="description" value={edu.description} onChange={(e) => handleChange(e, 'education', index)} rows={2} /></div>
              </div>
            ))}
            <Button variant="outline" className="mt-4 w-full" onClick={() => handleAddItem('education')}><Plus className="mr-2 h-4 w-4" /> Add Education</Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills" className="border-b-0">
          <AccordionTrigger className="px-6">Skills</AccordionTrigger>
          <AccordionContent className="px-6">
            {resumeData.skills.map((skill, index) => (
              <div key={skill.id} className="flex items-center gap-2 mb-2">
                <Input id={`skill-${index}`} name="name" value={skill.name} onChange={(e) => handleChange(e, 'skills', index)} placeholder={`Skill ${index+1}`} />
                <Button variant="ghost" size="icon" onClick={() => handleRemoveItem('skills', skill.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            ))}
            <Button variant="outline" className="mt-2 w-full" onClick={() => handleAddItem('skills')}><Plus className="mr-2 h-4 w-4" /> Add Skill</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Dialog open={isSuggestionOpen} onOpenChange={setIsSuggestionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Suggestions</DialogTitle>
            <DialogDescription>
              Here are some AI-powered suggestions. You can edit them before applying.
            </DialogDescription>
          </DialogHeader>
          {isSuggestionLoading ? (
            <div className="flex items-center justify-center p-8"><Loader2 className="w-8 h-8 animate-spin" /></div>
          ) : (
            <Textarea value={suggestion} onChange={(e) => setSuggestion(e.target.value)} rows={8} />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSuggestionOpen(false)}>Cancel</Button>
            <Button onClick={() => applySuggestion('summary')}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
