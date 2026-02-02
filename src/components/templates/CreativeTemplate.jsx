import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Zap, Code, Star } from 'lucide-react';

const CreativeTemplate = ({ resume }) => {
  const { personal_info, education, experience, skills, projects, languages, summary } = resume;

  return (
    <div className="bg-white max-w-[210mm] mx-auto min-h-[297mm] flex text-slate-800 font-sans shadow-2xl overflow-hidden border border-slate-100">
      {/* Dynamic Sidebar - Deep Indigo/Slate */}
      <div className="w-[38%] bg-[#0f172a] text-white p-12 flex flex-col gap-12 relative">
        {/* Decorative Element */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
        
        <div className="flex flex-col items-center text-center gap-6">
          {personal_info?.photo ? (
            <div className="p-1 bg-white/10 rounded-full">
              <img src={personal_info.photo} className="w-36 h-36 rounded-full border-4 border-[#0f172a] object-cover shadow-2xl" />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-[10px] uppercase font-black tracking-widest text-white/20">No Profile Image</div>
          )}
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter leading-tight italic bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">{personal_info?.fullName}</h1>
            <div className="h-0.5 w-12 bg-purple-500 mx-auto mt-4 mb-2"></div>
            <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">{experience?.[0]?.position || "Creative Visionary"}</p>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center gap-3">
             CONTACT <div className="flex-1 h-px bg-white/10"></div>
          </h2>
          <div className="space-y-4 text-[10px] font-bold uppercase tracking-widest">
            {personal_info?.email && <div className="flex items-center gap-3 hover:text-purple-400 transition-colors"><div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center"><Mail className="w-3 h-3 text-purple-400" /></div> {personal_info.email}</div>}
            {personal_info?.phone && <div className="flex items-center gap-3 hover:text-purple-400 transition-colors"><div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center"><Phone className="w-3 h-3 text-purple-400" /></div> {personal_info.phone}</div>}
            {personal_info?.address && <div className="flex items-center gap-3 hover:text-purple-400 transition-colors"><div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center"><MapPin className="w-3 h-3 text-purple-400" /></div> {personal_info.address}</div>}
          </div>
        </div>

        {skills?.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center gap-3">
               EXPERTISE <div className="flex-1 h-px bg-white/10"></div>
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-[9px] font-black uppercase tracking-tighter hover:bg-purple-500/20 hover:border-purple-500/30 transition-all">{s}</span>
              ))}
            </div>
          </div>
        )}

        {languages?.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center gap-3">
               LANGUAGES <div className="flex-1 h-px bg-white/10"></div>
            </h2>
            <div className="space-y-4">
              {languages.map((l, i) => (
                <div key={i} className="group">
                  <div className="text-[10px] font-black uppercase flex justify-between mb-1.5 tracking-widest">
                    <span>{l}</span>
                    <span className="text-purple-400">95%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[95%] rounded-full group-hover:bg-pink-500 transition-colors"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Column */}
      <div className="flex-1 p-16 bg-white flex flex-col gap-12">
        <section>
          <div className="flex items-center gap-4 mb-6">
            <Zap className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-black uppercase tracking-tighter italic text-slate-900">Creative <span className="text-purple-600">Manifesto</span></h2>
          </div>
          <p className="text-[13px] text-slate-600 leading-relaxed font-medium text-justify italic border-l-4 border-slate-50 pl-6">{summary}</p>
        </section>

        {experience?.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <Code className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-black uppercase tracking-tighter italic text-slate-900">Professional <span className="text-purple-600">Journey</span></h2>
            </div>
            <div className="space-y-12">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative pl-10 border-l-2 border-slate-50">
                  {/* Timeline Node */}
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-purple-600 shadow-sm"></div>
                  
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-black text-slate-900 text-base uppercase tracking-tight">{exp.position}</h3>
                    <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-50 px-3 py-1 rounded-full border border-slate-100">{exp.startDate} – {exp.endDate || 'PRESENT'}</span>
                  </div>
                  <div className="text-[11px] font-black text-purple-600 uppercase tracking-widest mb-4">{exp.company}</div>
                  <p className="text-[12px] text-slate-500 leading-relaxed whitespace-pre-line text-justify">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education?.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <Star className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-black uppercase tracking-tighter italic text-slate-900">Educational <span className="text-purple-600">Background</span></h2>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {education.map((edu, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-purple-200 transition-all">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-tight mb-1 group-hover:text-purple-600 transition-colors">{edu.school}</h3>
                  <p className="text-[11px] text-slate-500 italic mb-3 font-medium">{edu.degree}</p>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;