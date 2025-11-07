import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, GraduationCap, Award } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

export default function TemplateModern({ data, color }: TemplateProps) {
  const { personalDetails, summary, experience, education, skills } = data;

  return (
    <div className="font-body text-sm text-gray-800 flex h-full">
      <aside className="w-1/3 bg-gray-100 p-6 flex flex-col gap-6" style={{ backgroundColor: `${color}1A` }}>
        <div>
            <h1 className="text-3xl font-bold font-headline" style={{ color: color }}>{personalDetails.name}</h1>
            <h2 className="text-lg font-semibold text-gray-700 mt-1">{personalDetails.title}</h2>
        </div>
        <section>
          <h3 className="text-base font-bold font-headline uppercase tracking-wider border-b-2 pb-1 mb-3" style={{ borderColor: color }}>Contact</h3>
          <div className="space-y-2 text-xs">
            <p className="flex items-center gap-2"><Mail className="w-3 h-3 shrink-0" style={{color}} /> <span>{personalDetails.email}</span></p>
            <p className="flex items-center gap-2"><Phone className="w-3 h-3 shrink-0" style={{color}}/> <span>{personalDetails.phone}</span></p>
            <p className="flex items-center gap-2"><MapPin className="w-3 h-3 shrink-0" style={{color}}/> <span>{personalDetails.location}</span></p>
            <p className="flex items-center gap-2"><Globe className="w-3 h-3 shrink-0" style={{color}}/> <span>{personalDetails.website}</span></p>
            <p className="flex items-center gap-2"><Linkedin className="w-3 h-3 shrink-0" style={{color}}/> <span>{personalDetails.linkedin}</span></p>
          </div>
        </section>
        <section>
          <h3 className="text-base font-bold font-headline uppercase tracking-wider border-b-2 pb-1 mb-3" style={{ borderColor: color }}>Skills</h3>
          <div className="flex flex-col gap-1.5 text-xs">
            {skills.map(skill => (
              <span key={skill.id}>{skill.name}</span>
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-base font-bold font-headline uppercase tracking-wider border-b-2 pb-1 mb-3" style={{ borderColor: color }}>Education</h3>
          {education.map(edu => (
            <div key={edu.id} className="mb-3">
              <h4 className="text-xs font-bold">{edu.degree}</h4>
              <p className="text-xs text-gray-600">{edu.institution}</p>
              <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </section>
      </aside>
      
      <main className="w-2/3 p-6">
        <section>
          <h3 className="text-lg font-bold font-headline uppercase tracking-wider mb-3" style={{ color: color }}>
            <Briefcase className="w-4 h-4 inline-block mr-2 mb-1" />
            Summary
          </h3>
          <p className="text-gray-700 text-xs">{summary}</p>
        </section>

        <section className="mt-6">
          <h3 className="text-lg font-bold font-headline uppercase tracking-wider mb-3" style={{ color: color }}>
            <Briefcase className="w-4 h-4 inline-block mr-2 mb-1" />
            Experience
          </h3>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h4 className="text-base font-bold">{exp.role}</h4>
                <span className="text-xs font-medium text-gray-500">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="text-sm font-medium" style={{ color }}>{exp.company}</p>
              <ul className="list-disc list-inside mt-1 text-gray-700 text-xs space-y-1">
                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
