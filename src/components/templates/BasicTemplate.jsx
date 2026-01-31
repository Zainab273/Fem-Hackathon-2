import React from 'react';

/**
 * A Minimalist ATS-Friendly Template
 */
const BasicTemplate = ({ resume }) => {
  const { personal_info, education, experience, skills, projects, languages, summary } = resume;

  return (
    <div className="bg-white max-w-[210mm] mx-auto min-h-[297mm] p-12 text-slate-900 font-sans leading-snug">
      <header className="mb-8 border-b-2 border-slate-900 pb-4">
        <h1 className="text-3xl font-bold uppercase tracking-tight mb-1">{personal_info?.fullName}</h1>
        <div className="text-sm flex flex-wrap gap-x-4 text-slate-600">
          {personal_info?.email && <span>{personal_info.email}</span>}
          {personal_info?.phone && <span>• {personal_info.phone}</span>}
          {personal_info?.address && <span>• {personal_info.address}</span>}
          {personal_info?.linkedin && <span>• LinkedIn</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-200 mb-2 pb-1">Professional Summary</h2>
          <p className="text-sm text-slate-700">{summary}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-200 mb-3 pb-1">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">{exp.company}</h3>
                  <span className="text-xs font-medium text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-sm italic text-slate-700 mb-1">{exp.position}</div>
                <p className="text-sm text-slate-600 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-200 mb-3 pb-1">Education</h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold">{edu.school}</span>, <span className="italic">{edu.degree}</span>
                </div>
                <span className="text-xs text-slate-500">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {skills?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-200 mb-2 pb-1">Skills</h2>
            <p className="text-sm text-slate-700">{skills.join(', ')}</p>
          </section>
        )}
        {languages?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-200 mb-2 pb-1">Languages</h2>
            <p className="text-sm text-slate-700">{languages.join(', ')}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default BasicTemplate;