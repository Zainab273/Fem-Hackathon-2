import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../components/services/supabaseClient';
import TemplateSelector from '../components/TemplateSelector';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Plus, Trash2, Save, ArrowLeft, ArrowRight, User, Briefcase, GraduationCap, Code, Layout } from 'lucide-react';

const CreateResume = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); 
  const isEditMode = Boolean(id);

  const queryParams = new URLSearchParams(location.search);
  const templateFromUrl = queryParams.get('template');

  // UI State
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Resume Data State
  const [title, setTitle] = useState('');
  const [template, setTemplate] = useState(templateFromUrl || 'modern');
  const [personalInfo, setPersonalInfo] = useState({ fullName: '', email: user?.email || '', phone: '', address: '', linkedin: '', website: '' });
  const [summary, setSummary] = useState('');
  const [education, setEducation] = useState([{ school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }]);
  const [experience, setExperience] = useState([{ company: '', position: '', startDate: '', endDate: '', description: '' }]);
  const [skills, setSkills] = useState(''); 
  const [projects, setProjects] = useState([{ name: '', description: '', link: '' }]);
  const [languages, setLanguages] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [existingImageUrl, setExistingImageUrl] = useState('');

  useEffect(() => {
    if (isEditMode && user) {
      const fetchResume = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase.from('resumes').select('*').eq('id', id).single();
          if (error) throw error;
          setTitle(data.title || '');
          setTemplate(data.template || 'modern');
          setPersonalInfo(data.personal_info || {});
          setExistingImageUrl(data.personal_info?.photo || '');
          setImagePreview(data.personal_info?.photo || '');
          setSummary(data.summary || '');
          setEducation(data.education || []);
          setExperience(data.experience || []);
          setSkills(data.skills ? data.skills.join(', ') : '');
          setProjects(data.projects || []);
          setLanguages(data.languages ? data.languages.join(', ') : '');
        } catch (err) {
          setError("Failed to load data.");
        } finally {
          setLoading(false);
        }
      };
      fetchResume();
    }
  }, [id, isEditMode, user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = existingImageUrl;
      if (profileImage) {
        const path = `${user.id}-${Date.now()}.${profileImage.name.split('.').pop()}`;
        await supabase.storage.from('resume-images').upload(path, profileImage);
        const { data: { publicUrl } } = supabase.storage.from('resume-images').getPublicUrl(path);
        imageUrl = publicUrl;
      }
      const data = { user_id: user.id, title, template, personal_info: { ...personalInfo, photo: imageUrl }, summary, education, experience, skills: skills.split(',').map(s => s.trim()).filter(Boolean), projects, languages: languages.split(',').map(s => s.trim()).filter(Boolean) };
      const { error } = isEditMode ? await supabase.from('resumes').update(data).eq('id', id) : await supabase.from('resumes').insert([data]);
      if (error) throw error;
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: 'Design', icon: Layout },
    { id: 2, title: 'Personal', icon: User },
    { id: 3, title: 'Experience', icon: Briefcase },
    { id: 4, title: 'Education', icon: GraduationCap },
    { id: 5, title: 'Finalize', icon: Code },
  ];

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] p-4 md:p-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900/60 backdrop-blur-xl p-6 md:p-12 rounded-[48px] shadow-2xl border border-slate-100 dark:border-neon-cyan/10 transition-all">
        
        {/* Wizard Progress Bar */}
        <div className="mb-16">
           <div className="flex justify-between items-center mb-8 px-4 relative">
              {steps.map(step => (
                <div key={step.id} className="flex flex-col items-center gap-2 relative z-10">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${currentStep >= step.id ? 'bg-neon-cyan text-slate-950 scale-110 shadow-[0_0_20px_rgba(0,242,255,0.6)]' : 'bg-slate-100 dark:bg-slate-950 text-slate-400'}`}>
                      <step.icon className="w-5 h-5" />
                   </div>
                   <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${currentStep >= step.id ? 'text-slate-900 dark:text-neon-cyan neon-glow-text' : 'text-slate-400'}`}>
                      {step.title}
                   </span>
                </div>
              ))}
              {/* Progress Line */}
              <div className="absolute top-6 left-0 w-full h-1 bg-slate-100 dark:bg-slate-950 -z-0 rounded-full">
                 <div className="h-full bg-neon-cyan transition-all duration-500 shadow-[0_0_15px_rgba(0,242,255,0.8)] rounded-full" style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}></div>
              </div>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* STEP 1: Design Selection */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-8">Choose <span className="text-neon-cyan">Blueprint</span></h2>
               <TemplateSelector selectedTemplate={template} onSelect={setTemplate} />
            </div>
          )}

          {/* STEP 2: Personal Identity */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-8">Personal <span className="text-neon-cyan">Identity</span></h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <Input label="Professional Title" placeholder="e.g. Software Engineer" value={title} onChange={e => setTitle(e.target.value)} required />
                  <Input label="Full Name" value={personalInfo.fullName} onChange={e => setPersonalInfo({...personalInfo, fullName: e.target.value})} required />
                  <Input label="Email" type="email" value={personalInfo.email} onChange={e => setPersonalInfo({...personalInfo, email: e.target.value})} required />
                  <Input label="Phone" value={personalInfo.phone} onChange={e => setPersonalInfo({...personalInfo, phone: e.target.value})} />
                  <Input label="Address" value={personalInfo.address} onChange={e => setPersonalInfo({...personalInfo, address: e.target.value})} />
                  <Input label="LinkedIn" value={personalInfo.linkedin} onChange={e => setPersonalInfo({...personalInfo, linkedin: e.target.value})} />
               </div>
               <div className="bg-slate-50 dark:bg-slate-950/40 p-8 rounded-[32px] border-2 border-dashed border-slate-200 dark:border-neon-cyan/20 flex flex-col items-center text-center gap-4 hover:border-neon-cyan/40 transition-all group">
                  {imagePreview ? (
                    <img src={imagePreview} className="w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-slate-800 shadow-xl" />
                  ) : (
                    <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,242,255,0.1)] transition-all">
                      <User className="w-8 h-8 text-slate-400 group-hover:text-neon-cyan transition-colors" />
                    </div>
                  )}
                  <div>
                    <label className="block text-[10px] font-black text-neon-cyan uppercase tracking-[0.3em] mb-2 cursor-pointer hover:neon-glow-text">Upload Profile Image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="text-xs text-slate-500 cursor-pointer" />
                  </div>
               </div>
            </div>
          )}

          {/* STEP 3: Work Experience */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Work <span className="text-neon-cyan">Experience</span></h2>
                  <Button variant="outline" className="px-6 py-2 rounded-2xl text-[10px] border-slate-200 dark:border-slate-800" onClick={() => setExperience([...experience, { company: '', position: '', startDate: '', endDate: '', description: '' }])} icon={Plus}>ADD ENTRY</Button>
               </div>
               <div className="space-y-8">
                  {experience.map((exp, idx) => (
                    <div key={idx} className="p-8 rounded-[40px] bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-neon-cyan/10 space-y-6 relative shadow-sm group hover:border-neon-cyan/30 transition-all">
                      <button onClick={() => setExperience(experience.filter((_, i) => i !== idx))} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Company" value={exp.company} onChange={e => { const n = [...experience]; n[idx].company = e.target.value; setExperience(n); }} />
                        <Input label="Position" value={exp.position} onChange={e => { const n = [...experience]; n[idx].position = e.target.value; setExperience(n); }} />
                        <Input label="Start Date" type="date" value={exp.startDate} onChange={e => { const n = [...experience]; n[idx].startDate = e.target.value; setExperience(n); }} />
                        <Input label="End Date" type="date" value={exp.endDate} onChange={e => { const n = [...experience]; n[idx].endDate = e.target.value; setExperience(n); }} />
                      </div>
                      <textarea placeholder="Job responsibilities..." className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl h-32 outline-none focus:border-neon-cyan dark:focus:border-neon-cyan text-slate-900 dark:text-white transition-all font-medium focus:ring-4 focus:ring-neon-cyan/5" value={exp.description} onChange={e => { const n = [...experience]; n[idx].description = e.target.value; setExperience(n); }} />
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* STEP 4: Education & Skills */}
          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-12">
               <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Academic <span className="text-neon-cyan">History</span></h2>
                  <Button variant="outline" className="px-6 py-2 rounded-2xl text-[10px] border-slate-200 dark:border-slate-800" onClick={() => setEducation([...education, { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }])} icon={Plus}>ADD ENTRY</Button>
               </div>
               <div className="space-y-6">
                  {education.map((edu, idx) => (
                    <div key={idx} className="p-8 rounded-[40px] bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-neon-cyan/10 grid grid-cols-1 md:grid-cols-2 gap-6 relative group hover:border-neon-cyan/30 transition-all">
                      <button onClick={() => setEducation(education.filter((_, i) => i !== idx))} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      <Input label="Institution" value={edu.school} onChange={e => { const n = [...education]; n[idx].school = e.target.value; setEducation(n); }} />
                      <Input label="Degree" value={edu.degree} onChange={e => { const n = [...education]; n[idx].degree = e.target.value; setEducation(n); }} />
                      <Input label="Cycle Start" type="date" value={edu.startDate} onChange={e => { const n = [...education]; n[idx].startDate = e.target.value; setEducation(n); }} />
                      <Input label="Cycle End" type="date" value={edu.endDate} onChange={e => { const n = [...education]; n[idx].endDate = e.target.value; setEducation(n); }} />
                    </div>
                  ))}
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Tech Stack (CSV)</label>
                    <textarea placeholder="e.g. React, Python, UI/UX" className="w-full p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-3xl h-32 outline-none focus:border-neon-cyan dark:focus:border-neon-cyan text-slate-900 dark:text-white font-mono transition-all focus:ring-4 focus:ring-neon-cyan/5" value={skills} onChange={e => setSkills(e.target.value)} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Linguistics (CSV)</label>
                    <textarea placeholder="e.g. English, Urdu" className="w-full p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-3xl h-32 outline-none focus:border-neon-cyan dark:focus:border-neon-cyan text-slate-900 dark:text-white font-mono transition-all focus:ring-4 focus:ring-neon-cyan/5" value={languages} onChange={e => setLanguages(e.target.value)} />
                  </div>
               </div>
            </div>
          )}

          {/* STEP 5: Finalize */}
          {currentStep === 5 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-8 text-center">Final <span className="text-neon-cyan">Review</span></h2>
               <div className="max-w-2xl mx-auto space-y-10">
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.4em] text-center block text-slate-500 dark:text-slate-400">Professional Bio</label>
                    <textarea placeholder="Final professional summary..." className="w-full p-6 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-[40px] h-48 outline-none focus:border-neon-cyan dark:focus:border-neon-cyan text-slate-900 dark:text-white text-lg font-light leading-relaxed transition-all focus:ring-4 focus:ring-neon-cyan/5" value={summary} onChange={e => setSummary(e.target.value)} />
                  </div>
                  
                  <div className="bg-neon-cyan/10 dark:bg-neon-cyan/5 p-8 rounded-[32px] border border-neon-cyan/20 text-center shadow-[0_0_30px_rgba(0,242,255,0.05)]">
                     <p className="text-[10px] font-black text-neon-cyan uppercase tracking-[0.5em] mb-4 italic neon-glow-text">Blueprint Confirmation</p>
                     <div className="text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-2">{template}</div>
                     <p className="text-slate-500 dark:text-slate-500 text-[10px] uppercase font-black tracking-[0.4em] underline decoration-2 decoration-neon-cyan underline-offset-8">System Ready for Export</p>
                  </div>
               </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-12 border-t border-slate-100 dark:border-slate-800">
            <button type="button" onClick={currentStep === 1 ? () => navigate('/dashboard') : prevStep} className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] hover:text-neon-cyan dark:hover:text-neon-cyan transition-all flex items-center gap-2 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {currentStep === 1 ? 'Cancel' : 'Previous'}
            </button>
            
            {currentStep < 5 ? (
              <Button onClick={nextStep} variant="primary" className="px-12 py-4 rounded-2xl" icon={ArrowRight}>Next Phase</Button>
            ) : (
              <Button type="submit" loading={loading} variant="primary" className="px-16 py-4 rounded-2xl" icon={Save}>Commit & Save</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateResume;