import React from 'react';

/**
 * Reusable Input component optimized for Light/Dark themes
 */
const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false,
  className = '',
  error
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-4 py-2.5 rounded-xl border outline-none transition-all duration-300
          bg-white dark:bg-slate-900/60 text-slate-950 dark:text-white
          border-slate-200 dark:border-slate-800
          focus:border-neon-cyan dark:focus:border-neon-cyan
          focus:ring-4 focus:ring-neon-cyan/10 dark:focus:ring-neon-cyan/10
          focus:shadow-[0_0_15px_rgba(0,242,255,0.2)]
          placeholder-slate-400 dark:placeholder-slate-600
          ${error ? 'border-red-500 ring-4 ring-red-500/10' : ''}
        `}
      />
      {error && <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">{error}</span>}
    </div>
  );
};

export default Input;