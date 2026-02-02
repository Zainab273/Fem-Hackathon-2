import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Code } from 'lucide-react';

const ClassicTemplate = ({ resume }) => {
  const { personal_info, education, experience, skills, languages, summary, projects } = resume;

  return (
    <div className="bg-white max-w-[210mm] mx-auto min-h-[297mm] p-16 text-[#1a1a1a] font-serif shadow-2xl border border-slate-200">
        
        {/* Traditional Corporate Header */}
        <header className="mb-10 border-b-[3px] border-slate-900 pb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-slate-900 leading-none">{personal_info?.fullName}</h1>
            
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-sans font-bold uppercase tracking-widest text-slate-600">
              {personal_info?.email && <div className="flex items-center gap-1.5">{personal_info.email}</div>}
              {personal_info?.phone && <div className="flex items-center gap-1.5">• {personal_info.phone}</div>}
              {personal_info?.address && <div className="flex items-center gap-1.5">• {personal_info.address}</div>}
              {personal_info?.linkedin && <div className="flex items-center gap-1.5">• LinkedIn Profile</div>}
            </div>
        </header>

        <div className="space-y-10">
            {summary && (
                <section>
                  <h2 className="text-[12px] font-black font-sans uppercase tracking-[0.3em] text-slate-900 mb-3 border-b border-slate-200 pb-1">Professional Profile</h2>
                  <p className="text-[13px] leading-relaxed text-justify font-medium text-slate-700">{summary}</p>
                </section>
            )}

            {experience?.length > 0 && (
                <section>
                  <h2 className="text-[12px] font-black font-sans uppercase tracking-[0.3em] text-slate-900 mb-6 border-b border-slate-200 pb-1">Professional Experience</h2>
                  <div className="space-y-8">
                      {experience.map((exp, idx) => (
                      <div key={idx}>
                          <div className="flex justify-between items-baseline mb-1">
                              <span className="text-base font-bold text-slate-900 uppercase tracking-wide">{exp.company}</span>
                              <span className="text-[11px] font-sans font-black text-slate-500 uppercase tracking-widest">{exp.startDate} – {exp.endDate || 'Present'}</span>
                          </div>
                          <div className="text-[13px] font-bold text-slate-600 italic mb-3 font-serif">{exp.position}</div>
                          <ul className="list-none space-y-2 pl-4">
                            {exp.description?.split('\n').map((bullet, bIdx) => (
                              <li key={bIdx} className="text-[13px] text-slate-700 leading-relaxed text-justify relative pl-4">
                                <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-slate-400 rotate-45"></span>
                                {bullet.trim()}
                              </li>
                            ))}
                          </ul>
                      </div>
                      ))}
                  </div>
                </section>
            )}

            {projects?.length > 0 && (
                <section>
                  <h2 className="text-[12px] font-black font-sans uppercase tracking-[0.3em] text-slate-900 mb-6 border-b border-slate-200 pb-1">Technical Projects</h2>
                  <div className="grid grid-cols-1 gap-6">
                      {projects.map((project, idx) => (
                      <div key={idx} className="pl-4 border-l-2 border-slate-100">
                          <h3 className="text-[13px] font-bold text-slate-900 uppercase mb-1 tracking-tight">{project.name}</h3>
                          <p className="text-[12px] text-slate-600 leading-relaxed">{project.description}</p>
                      </div>
                      ))}
                  </div>
                </section>
            )}

            <div className="grid grid-cols-12 gap-12">
                <div className="col-span-7">
                    {education?.length > 0 && (
                      <section>
                        <h2 className="text-[12px] font-black font-sans uppercase tracking-[0.3em] text-slate-900 mb-5 border-b border-slate-200 pb-1">Education</h2>
                        <div className="space-y-6">
                            {education.map((edu, idx) => (
                            <div key={idx}>
                                <div className="font-bold text-[13px] text-slate-900 uppercase tracking-tight mb-0.5">{edu.school}</div>
                                <div className="text-[12px] italic text-slate-600">{edu.degree}</div>
                                <div className="text-[10px] font-sans font-bold text-slate-400 mt-1 uppercase">{edu.startDate} — {edu.endDate}</div>
                            </div>
                            ))}
                        </div>
                      </section>
                    )}
                </div>

                <div className="col-span-5">
                    {skills?.length > 0 && (
                        <section className="mb-10">
                          <h2 className="text-[12px] font-black font-sans uppercase tracking-[0.3em] text-slate-900 mb-5 border-b border-slate-200 pb-1">Core Competencies</h2>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill, idx) => (
                              <span key={idx} className="text-[10px] font-bold font-sans uppercase tracking-widest bg-slate-50 text-slate-700 px-2.5 py-1.5 border border-slate-200 rounded">{skill}</span>
                            ))}
                          </div>
                        </section>
                    )}

                    {languages?.length > 0 && (
                       <section>
                          <h2 className="text-[12px] font-black font-sans uppercase tracking-[0.3em] text-slate-900 mb-5 border-b border-slate-200 pb-1">Languages</h2>
                          <div className="flex flex-col gap-2.5">
                             {languages.map((lang, idx) => (
                                <div key={idx} className="flex justify-between items-center border-b border-slate-50 pb-1">
                                  <span className="text-[12px] font-bold font-serif text-slate-800 italic">{lang}</span>
                                  <span className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-tighter">Native</span>
                                </div>
                             ))}
                          </div>
                       </section>
                    )}
                </div>
            </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-100 text-center">
          <p className="text-[9px] font-sans font-black text-slate-300 uppercase tracking-[0.6em]">Verified Professional Record</p>
        </footer>
      </div>
  );
};

export default ClassicTemplate;