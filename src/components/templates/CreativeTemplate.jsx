import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const CreativeTemplate = ({ resume }) => {
  const { personal_info, education, experience, skills, projects, languages, summary } = resume;

  return (
    <div className="bg-white max-w-[210mm] mx-auto min-h-[297mm] flex text-slate-800 font-sans shadow-2xl">
      {/* Left Sidebar - Bold Purple */}
      <div className="w-1/3 bg-slate-900 text-white p-10 flex flex-col gap-10">
        <div className="flex flex-col items-center text-center gap-4">
          {personal_info?.photo ? (
            <img src={personal_info.photo} className="w-32 h-32 rounded-full border-4 border-purple-500/30 object-cover shadow-2xl" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border-2 border-dashed border-white/20 text-[10px] uppercase font-black tracking-widest text-white/40">No Image</div>
          )}
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter leading-tight italic">{personal_info?.fullName}</h1>
            <p className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] mt-2">{experience?.[0]?.position || "Expert"}</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 border-b border-white/10 pb-2">Contact</h2>
          <div className="space-y-3 text-[10px] font-medium opacity-80">
            {personal_info?.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-purple-400" /> {personal_info.email}</div>}
            {personal_info?.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-purple-400" /> {personal_info.phone}</div>}
            {personal_info?.address && <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-purple-400" /> {personal_info.address}</div>}
          </div>
        </div>

        {skills?.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 border-b border-white/10 pb-2">Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="px-2 py-1 bg-white/5 rounded border border-white/5 text-[9px] font-bold uppercase">{s}</span>
              ))}
            </div>
          </div>
        )}

        {languages?.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 border-b border-white/10 pb-2">Languages</h2>
            <div className="space-y-2">
              {languages.map((l, i) => (
                <div key={i} className="text-[10px] font-bold uppercase flex justify-between">
                  <span>{l}</span>
                  <span className="opacity-40">Native</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 bg-white space-y-10">
        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-4 flex items-center gap-3">
            <div className="w-8 h-1 bg-purple-600"></div> Profile
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed font-medium text-justify">{summary}</p>
        </section>

        {experience?.length > 0 && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-1 bg-purple-600"></div> Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative pl-4 border-l border-slate-100">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900 text-sm uppercase">{exp.position}</h3>
                    <span className="text-[9px] font-black text-slate-400 uppercase">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="text-[10px] font-black text-purple-600 uppercase mb-2">{exp.company}</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education?.length > 0 && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-1 bg-purple-600"></div> Education
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-slate-800 text-[11px] uppercase">{edu.school}</h3>
                  <p className="text-[10px] text-slate-500 italic">{edu.degree}</p>
                  <p className="text-[9px] font-black text-slate-400 mt-1">{edu.startDate} - {edu.endDate}</p>
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