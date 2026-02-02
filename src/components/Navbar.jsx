import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Moon, Sun, LogOut, LayoutGrid, FileText, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 border-b border-neon-cyan/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-12">
            <Link to="/" className="group flex items-center gap-3" onClick={closeMobileMenu}>
              <div className="w-10 h-10 bg-neon-cyan rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.6)] group-hover:rotate-12 transition-transform">
                <FileText className="w-6 h-6 text-slate-950" />
              </div>
              <span className="text-xl font-black uppercase tracking-tighter italic dark:text-white">
                PRO<span className="text-neon-cyan neon-glow-text">CV</span>
              </span>
            </Link>

            {user && (
              <div className="hidden md:flex items-center gap-10">
                {[
                  { name: 'My Resumes', path: '/dashboard', icon: FileText },
                  { name: 'Templates', path: '/templates', icon: LayoutGrid },
                ].map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-neon-cyan hover:drop-shadow-[0_0_8px_rgba(0,242,255,0.4)] ${
                      location.pathname === item.path 
                        ? 'text-neon-cyan neon-glow-text underline decoration-2 underline-offset-8' 
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl border border-neon-cyan/20 text-slate-500 dark:text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all shadow-sm hover:shadow-[0_0_15px_rgba(0,242,255,0.2)]"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-neon-cyan" />}
            </button>

            {user && (
              <>
                <div className="hidden md:flex items-center gap-4 pl-6 border-l border-neon-cyan/20">
                  <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                   <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-red-500 font-black text-[10px] uppercase tracking-widest transition-all"
                  >
                    <LogOut className="w-4 h-4" /> <span>Logout</span>
                  </button>
                </div>
                
                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-neon-cyan transition-colors"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {user && isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-neon-cyan/20 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-4">
            {[
              { name: 'My Resumes', path: '/dashboard', icon: FileText },
              { name: 'Templates', path: '/templates', icon: LayoutGrid },
            ].map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 p-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all ${
                  location.pathname === item.path 
                    ? 'bg-neon-cyan/10 text-neon-cyan neon-glow-text border border-neon-cyan/20' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center text-neon-cyan">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 truncate">
                {user.user_metadata?.full_name || user.email}
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 font-black text-xs uppercase tracking-widest transition-all"
            >
              <LogOut className="w-4 h-4" /> <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;