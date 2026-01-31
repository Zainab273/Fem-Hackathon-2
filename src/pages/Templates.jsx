import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Sparkles, Briefcase, GraduationCap } from 'lucide-react';
import Button from '../components/ui/Button';

const Templates = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Designs' },
    { id: 'modern', name: 'Modern' },
    { id: 'classic', name: 'Classic' },
    { id: 'creative', name: 'Creative' },
    { id: 'basic', name: 'Basic' }
  ];

  const templateList = [
    { id: 'modern', name: 'Professional Blue', category: 'modern', desc: 'Sleek two-column design.', accent: 'bg-blue-500' },
    { id: 'creative-bold', name: 'Creative Impact', category: 'creative', desc: 'Bold sidebar for creatives.', accent: 'bg-purple-600' },
    { id: 'modern-minimal', name: 'Tech Minimalist', category: 'modern', desc: 'Clean, airy and focused.', accent: 'bg-emerald-500' },
    { id: 'modern-dark', name: 'Executive Slate', category: 'modern', desc: 'Premium dark accents.', accent: 'bg-slate-800' },
    { id: 'classic', name: 'Standard Corporate', category: 'classic', desc: 'Formal serif layout.', accent: 'bg-black dark:bg-white' },
    { id: 'classic-elegant', name: 'Business Pro', category: 'classic', desc: 'Elegant and centered.', accent: 'bg-amber-600' },
    { id: 'basic', name: 'Clean Minimalist', category: 'basic', desc: 'ATS-friendly simple text.', accent: 'bg-slate-400' },
    { id: 'basic-compact', name: 'High Efficiency', category: 'basic', desc: 'Maximizes page space.', accent: 'bg-emerald-600' },
  ];

  const filteredTemplates = activeCategory === 'all' 
    ? templateList 
    : templateList.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen py-16 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 dark:text-white">
            Select a <span className="text-neon-cyan neon-glow-text">Template</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">Choose from our professionally vetted layouts.</p>
        </header>

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all border ${
                activeCategory === cat.id 
                ? 'bg-neon-cyan border-neon-cyan text-slate-950 shadow-[0_0_20px_rgba(0,242,255,0.4)]' 
                : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-neon-cyan/50 dark:hover:border-neon-cyan/50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="group bg-white dark:bg-slate-900/60 backdrop-blur-sm rounded-[32px] overflow-hidden border border-slate-200 dark:border-neon-cyan/10 hover:shadow-[0_0_40px_rgba(0,242,255,0.1)] dark:hover:border-neon-cyan/40 transition-all duration-500 flex flex-col">
              <div className="aspect-[16/10] bg-slate-50 dark:bg-slate-950 p-6 relative overflow-hidden flex items-center justify-center">
                 {/* Visual Mockup - More Neon style */}
                 <div className="w-1/2 h-full bg-white dark:bg-slate-900 rounded-t-2xl border-x border-t border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-2xl transform group-hover:translate-y-2 transition-transform duration-500">
                    <div className="flex gap-2">
                       <div className={`w-5 h-5 rounded-lg ${template.accent} opacity-40 shadow-[0_0_10px_rgba(0,0,0,0.2)]`}></div>
                       <div className="flex-1 space-y-1.5">
                          <div className={`h-1.5 w-3/4 ${template.accent} opacity-60 rounded-full`}></div>
                          <div className="h-1 w-1/2 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                       </div>
                    </div>
                    <div className="space-y-1.5 pt-2">
                       {[1,2,3,4].map(i => <div key={i} className="h-1 w-full bg-slate-50 dark:bg-slate-800/50 rounded-full"></div>)}
                    </div>
                 </div>

                 {/* Hover Action */}
                 <div className="absolute inset-0 bg-neon-cyan/10 dark:bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <Button 
                      onClick={() => navigate(`/create-resume?template=${template.id}`)}
                      variant="primary"
                      className="px-8 py-3 text-[10px] rounded-xl scale-90 group-hover:scale-100 transition-all shadow-[0_0_20px_rgba(0,242,255,0.6)]"
                    >
                      Initialize Design
                    </Button>
                 </div>
              </div>

              <div className="p-6 border-t border-slate-100 dark:border-neon-cyan/10">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-black italic uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-neon-cyan transition-colors">{template.name}</h3>
                  <span className="text-[8px] font-black text-neon-cyan uppercase bg-neon-cyan/10 px-2 py-1 rounded-full border border-neon-cyan/20">
                    {template.category}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">{template.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;