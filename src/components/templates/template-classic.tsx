import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, GraduationCap, Award } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

export default function TemplateClassic({ data, color }: TemplateProps) {
  const { personalDetails, summary, experience, education, skills } = data;

  return (
    <div className="font-body text-sm text-gray-800">
      <header className="text-center border-b-2 pb-4" style={{ borderColor: color }}>
        <h1 className="text-4xl font-bold font-headline" style={{ color: color }}>{personalDetails.name}</h1>
        <h2 className="text-xl font-semibold text-gray-600 mt-1">{personalDetails.title}</h2>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-3 flex-wrap">
          <span className="flex items-center gap-1.5"><Mail className="w-3 h-3"/> {personalDetails.email}</span>
          <span className="flex items-center gap-1.5"><Phone className="w-3 h-3"/> {personalDetails.phone}</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3"/> {personalDetails.location}</span>
          <span className="flex items-center gap-1.5"><Globe className="w-3 h-3"/> {personalDetails.website}</span>
          <span className="flex items-center gap-1.5"><Linkedin className="w-3 h-3"/> {personalDetails.linkedin}</span>
        </div>
      </header>
      
      <main className="mt-6">
        <section>
          <h3 className="text-lg font-bold font-headline border-b mb-2" style={{ color: color }}>
            <Briefcase className="w-4 h-4 inline-block mr-2 mb-0.5" /> Professional Summary
          </h3>
          <p className="text-gray-700">{summary}</p>
        </section>

        <section className="mt-6">
          <h3 className="text-lg font-bold font-headline border-b mb-2" style={{ color: color }}>
            <Briefcase className="w-4 h-4 inline-block mr-2 mb-0.5" /> Work Experience
          </h3>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h4 className="text-base font-bold">{exp.role}</h4>
                <span className="text-xs font-medium text-gray-500">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">{exp.company}</p>
              <ul className="list-disc list-inside mt-1 text-gray-700 text-xs space-y-1">
                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-6">
          <h3 className="text-lg font-bold font-headline border-b mb-2" style={{ color: color }}>
            <GraduationCap className="w-4 h-4 inline-block mr-2 mb-0.5" /> Education
          </h3>
          {education.map(edu => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h4 className="text-base font-bold">{edu.degree}</h4>
                <span className="text-xs font-medium text-gray-500">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">{edu.institution}</p>
              <p className="text-xs text-gray-700">{edu.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-6">
          <h3 className="text-lg font-bold font-headline border-b mb-2" style={{ color: color }}>
            <Award className="w-4 h-4 inline-block mr-2 mb-0.5" /> Skills
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map(skill => (
              <span key={skill.id} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-md">{skill.name}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
