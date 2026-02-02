import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, Briefcase, GraduationCap, Award, Layers, ChevronRight } from 'lucide-react';

const ModernTemplate = ({ resume }) => {
  const { personal_info, education, experience, skills, languages, summary, projects } = resume;

  return (
    <div className="bg-white max-w-[210mm] mx-auto min-h-[297mm] text-slate-800 font-sans shadow-2xl overflow-hidden flex flex-col border border-slate-200">
        {/* Global Standard Header */}
        <header className="p-12 pb-8 border-b-8 border-slate-900 flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-5xl font-black uppercase tracking-tight text-slate-900 mb-2">
              {personal_info?.fullName}
            </h1>
            <p className="text-xl font-bold text-blue-600 uppercase tracking-[0.1em] mb-6">
              {experience?.[0]?.position || "Professional Candidate"}
            </p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-black uppercase tracking-widest text-slate-500">
              {personal_info?.email && <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-900" /> {personal_info.email}</div>}
              {personal_info?.phone && <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-900" /> {personal_info.phone}</div>}
              {personal_info?.address && <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-900" /> {personal_info.address}</div>}
            </div>
          </div>

          {personal_info?.photo && (
            <div className="ml-8">
              <img 
                src={personal_info.photo} 
                alt={personal_info.fullName} 
                className="w-32 h-32 rounded-2xl object-cover border-4 border-slate-50 shadow-lg"
              />
            </div>
          )}
        </header>

        {/* Professional Body */}
        <div className="grid grid-cols-12 flex-1">
          {/* Main Column (Experience & Projects) */}
          <div className="col-span-8 p-12 pr-8 space-y-12">
            {summary && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-1 bg-slate-900"></div> Summary
                </h2>
                <p className="text-[13px] text-slate-600 leading-relaxed font-medium text-justify">{summary}</p>
              </section>
            )}

            {experience?.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-8 flex items-center gap-3">
                  <div className="w-8 h-1 bg-slate-900"></div> Experience
                </h2>
                <div className="space-y-10">
                  {experience.map((exp, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-slate-100">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-black text-slate-900 text-[15px] uppercase tracking-tight">{exp.position}</h3>
                        <span className="text-[10px] font-black text-slate-400 uppercase">{exp.startDate} – {exp.endDate || 'Present'}</span>
                      </div>
                      <div className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3">{exp.company}</div>
                      <p className="text-[12px] text-slate-600 leading-relaxed font-medium whitespace-pre-line text-justify">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects?.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 mb-8 flex items-center gap-3">
                  <div className="w-8 h-1 bg-slate-900"></div> Key Projects
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {projects.map((project, idx) => (
                    <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest">{project.name}</h3>
                        {project.link && <div className="text-[9px] font-bold text-blue-600 underline">View Project</div>}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{project.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar (Skills, Education, Languages) */}
          <div className="col-span-4 bg-slate-50 p-12 pl-8 space-y-12 border-l border-slate-200">
             {skills?.length > 0 && (
              <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-8 border-b-2 border-slate-900 pb-1 inline-block">Core Skills</h2>
                <div className="flex flex-col gap-4">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                       <ChevronRight className="w-3 h-3 text-blue-600" />
                       <span className="text-[10px] font-bold uppercase tracking-tight text-slate-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education?.length > 0 && (
              <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-8 border-b-2 border-slate-900 pb-1 inline-block">Education</h2>
                <div className="space-y-8">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <h3 className="font-black text-slate-900 text-[11px] uppercase leading-tight">{edu.school}</h3>
                      <div className="text-[10px] font-medium text-blue-600 italic mt-1">{edu.degree}</div>
                      <div className="text-[9px] font-black text-slate-400 mt-2 uppercase">{edu.startDate} — {edu.endDate}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {languages?.length > 0 && (
               <section>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-8 border-b-2 border-slate-900 pb-1 inline-block">Languages</h2>
                  <div className="space-y-3">
                     {languages.map((lang, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">{lang}</span>
                          <span className="text-[8px] font-black text-slate-300 uppercase">Expert</span>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            <div className="pt-12 text-center">
              <div className="inline-block p-4 border-2 border-slate-200 rounded-2xl grayscale opacity-50">
                 <Award className="w-8 h-8 text-slate-900 mx-auto" />
                 <p className="text-[7px] font-black uppercase tracking-[0.4em] mt-2">Official Credentials</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ModernTemplate;