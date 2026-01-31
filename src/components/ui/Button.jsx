import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false,
  loading = false,
  icon: Icon
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-2xl font-black transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-[10px] uppercase tracking-[0.2em] active:scale-95";
  
  const variants = {
    // Light Neon Cyan
    primary: "bg-neon-cyan text-slate-950 shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:shadow-[0_0_35px_rgba(0,242,255,0.7)] border border-neon-cyan/30 hover:bg-white transition-all duration-300",
    
    // Light Neon Purple
    secondary: "bg-neon-purple text-white shadow-[0_0_20px_rgba(188,19,254,0.4)] hover:shadow-[0_0_35px_rgba(188,19,254,0.7)] border border-neon-purple/30",
    
    danger: "bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600 hover:shadow-red-500/50",
    
    outline: "border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-[0_0_20px_rgba(0,242,255,0.3)]"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};

export default Button;