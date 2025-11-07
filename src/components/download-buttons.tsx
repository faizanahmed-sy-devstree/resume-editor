"use client";

import { useResume } from "@/contexts/resume-context";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileCode, FileType } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DownloadButtons() {
  const { resumeData } = useResume();
  const { toast } = useToast();

  const handlePdfDownload = () => {
    toast({
      title: "Preparing PDF...",
      description: "Your PDF will be ready to print/save shortly.",
    });
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const generateLatex = () => {
    const { personalDetails, summary, experience, education, skills } = resumeData;
    const escapeLatex = (str: string) => str.replace(/&/g, '\\&').replace(/%/g, '\\%').replace(/\$/g, '\\$').replace(/#/g, '\\#').replace(/_/g, '\\_').replace(/{/g, '\\{').replace(/}/g, '\\}').replace(/~/g, '\\textasciitilde{}').replace(/\^/g, '\\textasciicircum{}').replace(/\\/g, '\\textbackslash{}');

    return `
\\documentclass[a4paper,10pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{a4paper, margin=1in}
\\usepackage{hyperref}

\\begin{document}

\\begin{center}
    {\\Huge ${escapeLatex(personalDetails.name)}} \\\\
    \\vspace{1em}
    ${escapeLatex(personalDetails.title)} \\\\
    ${escapeLatex(personalDetails.email)} | ${escapeLatex(personalDetails.phone)} | ${escapeLatex(personalDetails.location)} \\\\
    \\href{https://${escapeLatex(personalDetails.website)}}{${escapeLatex(personalDetails.website)}} | \\href{https://${escapeLatex(personalDetails.linkedin)}}{${escapeLatex(personalDetails.linkedin)}}
\\end{center}

\\section*{Summary}
${escapeLatex(summary)}

\\section*{Experience}
${experience.map(exp => `
\\textbf{${escapeLatex(exp.role)}} at ${escapeLatex(exp.company)} \\hfill ${escapeLatex(exp.startDate)} - ${escapeLatex(exp.endDate)}
\\begin{itemize}
    \\item ${escapeLatex(exp.description.replace(/\n/g, '\n\\item '))}
\\end{itemize}
`).join('')}

\\section*{Education}
${education.map(edu => `
\\textbf{${escapeLatex(edu.degree)}}, ${escapeLatex(edu.institution)} \\hfill ${escapeLatex(edu.startDate)} - ${escapeLatex(edu.endDate)}
`).join('')}

\\section*{Skills}
${skills.map(skill => skill.name).join(', ')}

\\end{document}
    `;
  };
  
  const generateTxt = () => {
    const { personalDetails, summary, experience, education, skills } = resumeData;
    return `
${personalDetails.name}
${personalDetails.title}
${personalDetails.email} | ${personalDetails.phone} | ${personalDetails.location}
${personalDetails.website} | ${personalDetails.linkedin}

SUMMARY
${summary}

EXPERIENCE
${experience.map(exp => `
${exp.role} at ${exp.company} (${exp.startDate} - ${exp.endDate})
${exp.description}
`).join('\n')}

EDUCATION
${education.map(edu => `
${edu.degree}, ${edu.institution} (${edu.startDate} - ${edu.endDate})
`).join('\n')}

SKILLS
${skills.map(skill => skill.name).join(', ')}
    `;
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLatexDownload = () => {
    const content = generateLatex();
    downloadFile(content, 'resume.tex', 'application/x-latex');
    toast({ title: "LaTeX file downloaded." });
  };
  
  const handleWordDownload = () => {
    const content = generateTxt();
    downloadFile(content, 'resume.txt', 'text/plain');
    toast({ title: "TXT file for Word downloaded." });
  };

  return (
    <div className="p-4 bg-card rounded-lg border">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2"><Download className="w-5 h-5"/> Download Resume</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Button onClick={handlePdfDownload}><FileText className="mr-2 h-4 w-4" /> PDF</Button>
        <Button onClick={handleLatexDownload} variant="outline"><FileCode className="mr-2 h-4 w-4" /> LaTeX</Button>
        <Button onClick={handleWordDownload} variant="outline"><FileType className="mr-2 h-4 w-4" /> Word</Button>
      </div>
    </div>
  );
}
