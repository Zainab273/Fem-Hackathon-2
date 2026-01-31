import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Shield, Zap, Layout, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 uppercase italic">
              Create a <span className="text-neon-cyan neon-glow-text">Professional CV</span> <br className="hidden md:block" /> with Neon Precision
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Stand out to employers with a resume that reflects your true potential. 
              Our expert-crafted templates are ATS-ready and designed for success in the digital age.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {user ? (
                <Button onClick={() => navigate('/dashboard')} variant="primary" className="px-10 py-4 text-lg rounded-2xl">
                  Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              ) : (
                <>
                  <Link to="/signup">
                    <Button variant="primary" className="px-10 py-4 text-lg rounded-2xl w-full">
                      Build My Resume Now
                    </Button>
                  </Link>
                  <Link to="/templates">
                    <Button variant="outline" className="px-10 py-4 text-lg rounded-2xl w-full">
                      View Templates
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Social Proof */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-slate-400 dark:text-slate-500 grayscale opacity-80">
               <span className="font-black text-xl uppercase tracking-[0.3em] italic">Google</span>
               <span className="font-black text-xl uppercase tracking-[0.3em] italic">Microsoft</span>
               <span className="font-black text-xl uppercase tracking-[0.3em] italic">Meta</span>
               <span className="font-black text-xl uppercase tracking-[0.3em] italic">Amazon</span>
            </div>
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[150px] opacity-30"></div>
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[150px] opacity-30"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-100/50 dark:bg-slate-950/40 border-y border-neon-cyan/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4 italic uppercase tracking-widest text-slate-900 dark:text-white">Why Professionals Choose Us</h2>
            <div className="w-24 h-1.5 bg-neon-cyan mx-auto rounded-full shadow-[0_0_10px_rgba(0,242,255,0.8)]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureItem 
              icon={<Zap className="w-10 h-10 text-neon-cyan" />}
              title="Built for Speed"
              desc="Our lightning-fast editor lets you build a professional CV without the headache."
            />
            <FeatureItem 
              icon={<Layout className="w-10 h-10 text-neon-purple" />}
              title="ATS-Optimized"
              desc="Passed by automated screening systems so you get seen by real human recruiters."
            />
            <FeatureItem 
              icon={<CheckCircle className="w-10 h-10 text-emerald-400" />}
              title="One-Click Export"
              desc="Download high-quality PDF resumes ready to upload to any job application portal."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neon-cyan/10 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] text-slate-500 font-black tracking-[0.5em] uppercase italic">
            &copy; 2026 PROCV BUILDER. DIGITAL NEON EDITION.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }) => (
  <div className="p-8 bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-neon-cyan/10 hover:border-neon-cyan/30 shadow-sm hover:shadow-[0_0_30px_rgba(0,242,255,0.1)] transition-all duration-500 group">
    <div className="mb-6 inline-block p-4 bg-slate-100 dark:bg-slate-950 rounded-2xl group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <h3 className="text-xl font-black mb-3 uppercase tracking-tight italic text-slate-900 dark:text-white group-hover:text-neon-cyan transition-colors">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">{desc}</p>
  </div>
);

export default Home;