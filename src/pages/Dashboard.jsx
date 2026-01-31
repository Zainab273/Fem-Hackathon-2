import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../components/services/supabaseClient';
import { Trash2, Edit, Eye, Plus, Search, Filter, Layout } from 'lucide-react';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTemplate, setFilterTemplate] = useState('all');

  useEffect(() => {
    if (user) fetchResumes();
  }, [user]);

  const fetchResumes = async () => {
    try {
      const { data, error } = await supabase.from('resumes').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      if (error) throw error;
      setResumes(data || []);
    } catch (error) {
      console.error('Fetch error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this resume?")) {
      await supabase.from('resumes').delete().eq('id', id);
      setResumes(resumes.filter(r => r.id !== id));
    }
  };

  const filteredResumes = resumes.filter(resume => {
    const matchesSearch = resume.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTemplate = filterTemplate === 'all' || (resume.template?.includes(filterTemplate));
    return matchesSearch && matchesTemplate;
  });

  return (
    <div className="min-h-[calc(100vh-64px)] p-6 md:p-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
              Your <span className="text-neon-cyan neon-glow-text">Library</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Manage saved resume documents</p>
          </div>
          <Button onClick={() => navigate('/templates')} variant="primary" icon={Plus} className="rounded-2xl shadow-[0_0_15px_rgba(0,242,255,0.4)]">Create New</Button>
        </header>
        
        <section className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-md p-4 rounded-[32px] mb-12 flex flex-col md:flex-row gap-4 items-center border border-slate-200 dark:border-neon-cyan/20 shadow-xl dark:shadow-[0_0_30px_rgba(0,242,255,0.05)]">
          <div className="flex-grow relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neon-cyan/60" />
            <input 
              type="text" 
              placeholder="Search by title..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-neon-cyan/10 text-slate-900 dark:text-white transition-all font-medium placeholder-slate-400 dark:placeholder-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400 dark:text-neon-cyan/60" />
            <select 
              className="flex-grow md:w-48 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none text-slate-900 dark:text-white font-bold text-xs uppercase cursor-pointer hover:border-neon-cyan/30 transition-all"
              value={filterTemplate}
              onChange={(e) => setFilterTemplate(e.target.value)}
            >
              <option value="all">All Styles</option>
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
            </select>
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center py-20 animate-pulse text-neon-cyan font-black italic tracking-[0.3em] neon-glow-text">LOADING_VAULT...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredResumes.map((resume) => (
              <div key={resume.id} className="group bg-white dark:bg-slate-900/60 backdrop-blur-sm rounded-[40px] overflow-hidden border border-slate-200 dark:border-neon-cyan/10 hover:border-neon-cyan/40 hover:shadow-[0_0_40px_rgba(0,242,255,0.15)] transition-all duration-500 flex flex-col h-72 shadow-lg relative">
                <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl text-slate-400 group-hover:text-neon-cyan transition-all shadow-inner group-hover:shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                      <Layout className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-neon-cyan/10 dark:bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                        {resume.template || 'Design'}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white truncate tracking-tighter mb-2 uppercase italic group-hover:text-neon-cyan transition-colors">
                    {resume.title || 'Untitled Document'}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">
                    <div className="w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_8px_rgba(0,242,255,0.8)]"></div>
                    Synced: {new Date(resume.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="p-4 bg-slate-50/80 dark:bg-slate-950/60 flex gap-2 border-t border-slate-100 dark:border-neon-cyan/10">
                  <Button variant="primary" className="flex-1 py-3 text-[9px] rounded-xl shadow-none hover:shadow-[0_0_15px_rgba(0,242,255,0.4)]" onClick={() => navigate(`/resume/${resume.id}`)} icon={Eye}>Open</Button>
                  <Button variant="outline" className="flex-1 py-3 text-[9px] rounded-xl border-slate-200 dark:border-slate-800" onClick={() => navigate(`/edit-resume/${resume.id}`)} icon={Edit}>Edit</Button>
                  <button onClick={() => handleDelete(resume.id)} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-500/30 transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
            
            {filteredResumes.length === 0 && (
               <div className="col-span-full border-4 border-dashed border-slate-200 dark:border-neon-cyan/10 rounded-[48px] py-24 text-center group hover:border-neon-cyan/30 transition-all">
                  <Plus className="w-16 h-16 mx-auto mb-6 text-slate-300 dark:text-slate-800 group-hover:text-neon-cyan transition-colors group-hover:rotate-90 duration-500" />
                  <p className="text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.4em] italic text-xs">No records detected. Initialize build sequence.</p>
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;