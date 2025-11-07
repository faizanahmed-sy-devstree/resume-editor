import type { ResumeData, TemplateId } from './types';

export const initialResumeData: ResumeData = {
  personalDetails: {
    name: 'Alex Doe',
    title: 'Senior Software Engineer',
    email: 'alex.doe@email.com',
    phone: '(123) 456-7890',
    location: 'San Francisco, CA',
    website: 'alexdoe.dev',
    linkedin: 'linkedin.com/in/alexdoe',
  },
  summary: 'Innovative and deadline-driven Software Engineer with 8+ years of experience designing and developing user-centered digital products from initial concept to final, polished deliverable.',
  experience: [
    {
      id: 'exp1',
      company: 'Tech Solutions Inc.',
      role: 'Senior Software Engineer',
      startDate: 'Jan 2018',
      endDate: 'Present',
      description: '- Led a team of 5 engineers in developing a new cloud-based SaaS platform, resulting in a 20% increase in user engagement.\n- Architected and implemented a microservices-based infrastructure, improving system scalability and reducing latency by 30%.\n- Mentored junior engineers, fostering a culture of growth and continuous learning.',
    },
    {
      id: 'exp2',
      company: 'Innovate Corp.',
      role: 'Software Engineer',
      startDate: 'Jun 2015',
      endDate: 'Dec 2017',
      description: '- Developed and maintained front-end features for a high-traffic e-commerce website using React and Redux.\n- Collaborated with UX/UI designers to create responsive and accessible user interfaces.\n- Optimized application performance, leading to a 15% improvement in page load times.',
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'State University',
      degree: 'M.S. in Computer Science',
      startDate: '2013',
      endDate: '2015',
      description: 'Focused on distributed systems and machine learning.',
    },
    {
      id: 'edu2',
      institution: 'University of California',
      degree: 'B.S. in Computer Science',
      startDate: '2009',
      endDate: '2013',
      description: 'Graduated with honors.',
    },
  ],
  skills: [
    { id: 'skill1', name: 'JavaScript/TypeScript' },
    { id: 'skill2', name: 'React & Next.js' },
    { id: 'skill3', name: 'Node.js' },
    { id: 'skill4', name: 'GraphQL' },
    { id: 'skill5', name: 'System Design' },
    { id: 'skill6', name: 'Cloud Computing (AWS, GCP)' },
  ],
};

export const templateColors = [
  '#3F51B5', // Indigo
  '#009688', // Teal
  '#E91E63', // Pink
  '#FF9800', // Orange
  '#4CAF50', // Green
  '#607D8B', // Blue Grey
  '#212121', // Black
];

export const templates: { id: TemplateId; name: string }[] = [
    { id: 'modern', name: 'Modern' },
    { id: 'classic', name: 'Classic' },
    { id: 'creative', name: 'Creative' },
];
