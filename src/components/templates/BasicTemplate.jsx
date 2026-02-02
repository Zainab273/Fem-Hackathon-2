import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

/**
 * A Premium ATS-Optimized Minimalist Template
 */
const BasicTemplate = ({ resume }) => {
  const { personal_info, education, experience, skills, projects, languages, summary } = resume;

  return (
    <div className="bg-white max-w-[210mm] mx-auto min-h-[297mm] p-16 text-slate-900 font-sans leading-relaxed shadow-2xl border border-slate-100">
      {/* Centered Minimal Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-4 text-slate-900">{personal_info?.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          {personal_info?.email && <div className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-slate-400" /> {personal_info.email}</div>}
          {personal_info?.phone && <div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-slate-400" /> {personal_info.phone}</div>}
          {personal_info?.address && <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-slate-400" /> {personal_info.address}</div>}
          {personal_info?.linkedin && <div className="flex items-center gap-1.5"><Linkedin className="w-3 h-3 text-slate-400" /> LinkedIn</div>}
        </div>
        <div className="w-24 h-1 bg-slate-900 mx-auto mt-8"></div>
      </header>

      <div className="space-y-10">
        {summary && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-4 border-b-2 border-slate-100 pb-2">Professional Profile</h2>
            <p className="text-[13px] text-slate-600 font-medium leading-relaxed text-justify">{summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-6 border-b-2 border-slate-100 pb-2">Professional Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-black text-slate-900 text-[15px] uppercase tracking-tight">{exp.company}</h3>
                    <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-50 px-3 py-1 rounded">{exp.startDate} – {exp.endDate || 'PRESENT'}</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 italic">{exp.position}</div>
                  <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-line text-justify pl-4 border-l-2 border-slate-50">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education?.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-6 border-b-2 border-slate-100 pb-2">Academic Credentials</h2>
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <div className="font-black text-slate-900 text-[13px] uppercase tracking-tight">{edu.school}</div>
                    <div className="text-[11px] font-medium text-slate-500 italic mt-1">{edu.degree}</div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-12">
          {skills?.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-4 border-b-2 border-slate-100 pb-2">Core Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="text-[10px] font-bold uppercase tracking-widest text-slate-600 border border-slate-100 px-2 py-1 rounded bg-slate-50">{skill}</span>
                ))}
              </div>
            </section>
          )}
          {languages?.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-4 border-b-2 border-slate-100 pb-2">Languages</h2>
              <div className="flex flex-col gap-2">
                {languages.map((lang, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    <span>{lang}</span>
                    <span className="text-[9px] font-black text-slate-300">Professional</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Subtle Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-50 text-center">
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">Authentic Portfolio Document</p>
      </footer>
    </div>
  );
};

export default BasicTemplate;