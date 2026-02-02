import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../components/services/supabaseClient';
import { ArrowLeft, Download, Printer, Share2 } from 'lucide-react';
import ModernTemplate from '../components/templates/ModernTemplate';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import BasicTemplate from '../components/templates/BasicTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import Button from '../components/ui/Button';

const ResumePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      const { data, error } = await supabase.from('resumes').select('*').eq('id', id).single();
      if (error) throw error;
      setResume(data);
    } catch (error) {
      console.error('Error fetching resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => { window.print(); };

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50 dark:bg-slate-950">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Generating Preview...</p>
    </div>
  );

  if (!resume) return <div className="text-center p-20">Resume not found.</div>;

  const renderTemplate = () => {
    const t = resume.template || 'modern';
    if (t.startsWith('classic')) return <ClassicTemplate resume={resume} />;
    if (t.startsWith('basic')) return <BasicTemplate resume={resume} />;
    if (t.startsWith('creative')) return <CreativeTemplate resume={resume} />;
    return <ModernTemplate resume={resume} />;
  };

  return (
    <div className="min-h-screen bg-slate-200 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Professional Top Bar - High Visibility */}
      <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800 px-4 py-3 print:hidden shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-xl transition-all font-bold text-xs uppercase tracking-wider border border-slate-200 dark:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </button>
            <div className="h-8 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>
            <div>
              <h2 className="text-sm font-black text-slate-900 dark:text-white truncate max-w-[200px]">{resume.title}</h2>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Preview Mode Active</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              onClick={handlePrint}
              variant="primary"
              className="px-8 py-2.5 rounded-xl shadow-lg btn-shadow"
              icon={Download}
            >
              Export PDF
            </Button>
            <button className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:text-blue-600 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="max-w-5xl mx-auto py-12 px-4 flex justify-center overflow-auto">
        <div className="shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform hover:scale-[1.01] duration-500 min-w-max">
          <div className="bg-white">
            {renderTemplate()}
          </div>
        </div>
      </div>

      {/* Floating Action for Mobile */}
      <div className="fixed bottom-6 right-6 sm:hidden print:hidden">
         <button onClick={handlePrint} className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center animate-bounce">
            <Printer className="w-6 h-6" />
         </button>
      </div>
    </div>
  );
};

export default ResumePreview;