import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from 'lucide-react';

const ModernTemplate = ({ resume }) => {
  const { personal_info, education, experience, skills, languages, summary } = resume;

  return (
    <div className="bg-white max-w-[210mm] mx-auto min-h-[297mm] text-slate-800 font-sans shadow-xl overflow-hidden flex flex-col border border-slate-100">
        {/* Professional Header - Clean and Sophisticated */}
        <header className="relative p-12 flex gap-12 items-center bg-[#f8fafc] border-b border-slate-200">
           {personal_info?.photo ? (
            <div className="relative z-10">
              <img 
                src={personal_info.photo} 
                alt={personal_info.fullName} 
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl"
              />
            </div>
          ) : (
            <div className="w-36 h-36 rounded-full bg-slate-200 flex items-center justify-center border-2 border-dashed border-slate-300 text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center p-4">
              IMAGE_PLACEHOLDER
            </div>
          )}
          
          <div className="flex-1">
            <h1 className="text-5xl font-extrabold uppercase tracking-tighter text-slate-900 leading-none">
              {personal_info?.fullName?.split(' ')[0]} <span className="text-blue-700 font-light">{personal_info?.fullName?.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-lg font-bold text-slate-500 mt-2 tracking-[0.15em] uppercase border-l-4 border-blue-700 pl-4 py-1">
              {experience?.[0]?.position || "Professional Candidate"}
            </p>
            
            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-8 text-[10px] font-bold uppercase tracking-wider">
              {personal_info?.email && <div className="flex items-center gap-2 text-slate-600"><Mail className="w-3.5 h-3.5 text-blue-700" /> {personal_info.email}</div>}
              {personal_info?.phone && <div className="flex items-center gap-2 text-slate-600"><Phone className="w-3.5 h-3.5 text-blue-700" /> {personal_info.phone}</div>}
              {personal_info?.address && <div className="flex items-center gap-2 text-slate-600"><MapPin className="w-3.5 h-3.5 text-blue-700" /> {personal_info.address}</div>}
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-12 flex-1">
          {/* Main Column */}
          <div className="col-span-8 p-12 space-y-12">
            {summary && (
              <section>
                <div className="flex items-center gap-4 mb-6">
                   <h2 className="text-xs font-black uppercase tracking-[0.25em] text-blue-800">01 / Professional Profile</h2>
                   <div className="flex-1 h-px bg-slate-200"></div>
                </div>
                <p className="text-[13px] text-slate-700 leading-relaxed font-medium text-justify">{summary}</p>
              </section>
            )}

            {experience?.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                   <h2 className="text-xs font-black uppercase tracking-[0.25em] text-blue-800">02 / Experience</h2>
                   <div className="flex-1 h-px bg-slate-200"></div>
                </div>
                <div className="space-y-10">
                  {experience.map((exp, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-lg uppercase tracking-tight">{exp.position}</h3>
                          <div className="text-xs font-bold text-blue-700 uppercase tracking-widest mt-1">{exp.company}</div>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-100 px-3 py-1 rounded">
                          {exp.startDate} – {exp.endDate || 'Present'}
                        </span>
                      </div>
                      <p className="text-[13px] text-slate-600 leading-relaxed font-medium mt-4 whitespace-pre-line text-justify pl-4 border-l-2 border-slate-100">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="col-span-4 bg-slate-50 p-12 space-y-12 border-l border-slate-200">
             {skills && skills.length > 0 && (
              <section>
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-8 pb-2 border-b-2 border-blue-700 inline-block">Competencies</h2>
                <div className="space-y-5">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-tight text-slate-600">
                          <span>{skill}</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className={`h-full bg-slate-800 w-[85%] rounded-full`}></div>
                       </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education?.length > 0 && (
              <section>
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-8 pb-2 border-b-2 border-blue-700 inline-block">Education</h2>
                <div className="space-y-8">
                  {education.map((edu, idx) => (
                    <div key={idx} className="space-y-1">
                      <h3 className="font-extrabold text-slate-900 text-xs uppercase leading-tight">{edu.school}</h3>
                      <div className="text-[11px] font-medium text-slate-600 uppercase italic">{edu.degree}</div>
                      <div className="text-[9px] font-bold text-slate-400 mt-2">{edu.startDate} — {edu.endDate}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {languages && languages.length > 0 && (
               <section>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6 pb-2 border-b-2 border-blue-700 inline-block">Languages</h2>
                  <div className="flex flex-wrap gap-2">
                     {languages.map((lang, idx) => (
                        <span key={idx} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white border border-slate-200 rounded text-slate-700">{lang}</span>
                     ))}
                  </div>
               </section>
            )}
          </div>
        </div>
    </div>
  );
};

export default ModernTemplate;