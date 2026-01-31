import React from 'react';

const ClassicTemplate = ({ resume }) => {
  const { personal_info, education, experience, skills, languages, summary } = resume;

  return (
    <div className={`bg-white max-w-[210mm] mx-auto min-h-[297mm] p-20 text-slate-900 font-serif shadow-xl border border-slate-100`}>
        
        {/* Timeless Executive Header */}
        <header className="text-center border-b-2 border-slate-900 pb-8 mb-12">
            <h1 className="text-4xl font-bold uppercase tracking-[0.25em] mb-4 text-slate-900">{personal_info?.fullName}</h1>
            
            <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-[10px] font-sans font-black uppercase tracking-widest text-slate-500">
              {personal_info?.email && <span>{personal_info.email}</span>}
              {personal_info?.phone && <span>| {personal_info.phone}</span>}
              {personal_info?.address && <span>| {personal_info.address}</span>}
            </div>

            {personal_info?.photo && (
              <div className="mt-8 flex justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-slate-200 shadow-md">
                  <img 
                    src={personal_info.photo} 
                    alt={personal_info.fullName} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            )}
        </header>

        <div className="space-y-12">
            {summary && (
                <section>
                  <h2 className="text-[11px] font-black font-sans uppercase tracking-[0.4em] text-center text-slate-400 mb-6 italic">Career Summary</h2>
                  <p className="text-[14px] leading-relaxed text-justify font-medium text-slate-700 max-w-3xl mx-auto">{summary}</p>
                </section>
            )}

            {experience?.length > 0 && (
                <section>
                  <h2 className="text-[11px] font-black font-sans uppercase tracking-[0.4em] text-slate-900 mb-8 border-b border-slate-200 pb-1">Professional Experience</h2>
                  <div className="space-y-10">
                      {experience.map((exp, idx) => (
                      <div key={idx}>
                          <div className="flex justify-between items-baseline mb-2">
                              <span className="text-lg font-bold tracking-tight text-slate-900">{exp.company}</span>
                              <span className="text-[10px] font-sans font-black text-slate-400 tracking-widest uppercase">{exp.startDate} – {exp.endDate || 'PRESENT'}</span>
                          </div>
                          <div className="italic text-base text-slate-600 mb-3 font-serif border-l-2 border-slate-300 pl-4">{exp.position}</div>
                          <p className="text-[13px] leading-relaxed text-slate-700 text-justify whitespace-pre-line">{exp.description}</p>
                      </div>
                      ))}
                  </div>
                </section>
            )}

            <div className="grid grid-cols-12 gap-12">
                <div className="col-span-7">
                    {education?.length > 0 && (
                      <section>
                        <h2 className="text-[11px] font-black font-sans uppercase tracking-[0.4em] text-slate-900 mb-6 border-b border-slate-200 pb-1">Academic Credentials</h2>
                        <div className="space-y-6">
                            {education.map((edu, idx) => (
                            <div key={idx}>
                                <div className="font-bold text-sm tracking-tight text-slate-900 uppercase">{edu.school}</div>
                                <div className="text-xs italic text-slate-500 mt-1">{edu.degree}</div>
                                <div className="text-[9px] font-sans font-black text-slate-400 mt-2 uppercase tracking-widest">{edu.startDate} — {edu.endDate}</div>
                            </div>
                            ))}
                        </div>
                      </section>
                    )}
                </div>

                <div className="col-span-5">
                    {skills?.length > 0 && (
                        <section className="mb-8">
                          <h2 className="text-[11px] font-black font-sans uppercase tracking-[0.4em] text-slate-900 mb-6 border-b border-slate-200 pb-1">Core Expertise</h2>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill, idx) => (
                              <span key={idx} className="text-[10px] font-bold font-sans uppercase tracking-wider bg-slate-100 px-3 py-1 rounded text-slate-700">{skill}</span>
                            ))}
                          </div>
                        </section>
                    )}

                    {languages?.length > 0 && (
                       <section>
                          <h2 className="text-[11px] font-black font-sans uppercase tracking-[0.4em] text-slate-900 mb-6 border-b border-slate-200 pb-1">Languages</h2>
                          <div className="flex flex-wrap gap-3">
                             {languages.map((lang, idx) => (
                                <span key={idx} className="text-[11px] font-bold font-serif italic text-slate-600 underline decoration-slate-200 underline-offset-4">{lang}</span>
                             ))}
                          </div>
                       </section>
                    )}
                </div>
            </div>
        </div>
      </div>
  );
};

export default ClassicTemplate;