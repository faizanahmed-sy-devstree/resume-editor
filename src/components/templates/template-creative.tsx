import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, GraduationCap, Award, Star } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  color: string;
}

export default function TemplateCreative({ data, color }: TemplateProps) {
  const { personalDetails, summary, experience, education, skills } = data;

  return (
    <div className="font-body text-sm text-gray-800 flex flex-col h-full">
      <header className="p-8 text-white relative" style={{ backgroundColor: color }}>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white flex-shrink-0 border-4" style={{ borderColor: `${color}50` }}>
            {/* Placeholder for a photo */}
          </div>
          <div>
            <h1 className="text-4xl font-bold font-headline">{personalDetails.name}</h1>
            <h2 className="text-lg font-light opacity-90">{personalDetails.title}</h2>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs mt-4 flex-wrap gap-2 bg-black/20 p-2 rounded-md">
          <span className="flex items-center gap-1.5"><Mail className="w-3 h-3"/> {personalDetails.email}</span>
          <span className="flex items-center gap-1.5"><Phone className="w-3 h-3"/> {personalDetails.phone}</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3"/> {personalDetails.location}</span>
          <span className="flex items-center gap-1.5"><Globe className="w-3 h-3"/> {personalDetails.website}</span>
          <span className="flex items-center gap-1.5"><Linkedin className="w-3 h-3"/> {personalDetails.linkedin}</span>
        </div>
      </header>
      
      <main className="mt-6 px-8 flex-1">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <section>
              <h3 className="text-lg font-bold font-headline border-b-2 mb-2 pb-1" style={{ borderColor: color }}>
                About Me
              </h3>
              <p className="text-gray-700 text-xs">{summary}</p>
            </section>

            <section className="mt-6">
              <h3 className="text-lg font-bold font-headline border-b-2 mb-2 pb-1" style={{ borderColor: color }}>
                Work Experience
              </h3>
              {experience.map(exp => (
                <div key={exp.id} className="mb-4 relative pl-4">
                  <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full" style={{backgroundColor: color}}></div>
                  <div className="absolute left-[2px] top-1.5 h-full w-px bg-gray-200"></div>

                  <p className="text-xs font-medium text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  <h4 className="text-base font-bold">{exp.role}</h4>
                  <p className="text-sm font-medium text-gray-600">{exp.company}</p>
                  <ul className="list-disc list-inside mt-1 text-gray-700 text-xs space-y-1">
                     {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          </div>

          <div className="col-span-1">
            <section>
              <h3 className="text-lg font-bold font-headline border-b-2 mb-2 pb-1" style={{ borderColor: color }}>
                Skills
              </h3>
              <div className="flex flex-col gap-2 mt-2">
                {skills.map(skill => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <Star className="w-3 h-3" style={{color}} />
                    <span className="text-xs">{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <h3 className="text-lg font-bold font-headline border-b-2 mb-2 pb-1" style={{ borderColor: color }}>
                Education
              </h3>
              {education.map(edu => (
                <div key={edu.id} className="mb-3">
                  <p className="text-xs font-medium text-gray-500">{edu.startDate} - {edu.endDate}</p>
                  <h4 className="text-sm font-bold">{edu.degree}</h4>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
