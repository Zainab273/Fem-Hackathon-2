import React from 'react';
import { Check } from 'lucide-react';

const TemplateSelector = ({ selectedTemplate, onSelect }) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern Executive',
      description: 'Sleek two-column design with a professional blue touch.',
      preview: (
        <div className="w-full h-full bg-white p-2 flex gap-1 pointer-events-none select-none overflow-hidden text-[4px]">
          <div className="w-1/3 bg-slate-50 border-r border-slate-100 p-1 space-y-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 mx-auto"></div>
            <div className="space-y-1">
              <div className="h-1 w-full bg-slate-200"></div>
              <div className="h-1 w-4/5 bg-slate-100"></div>
            </div>
          </div>
          <div className="flex-1 p-1 space-y-2">
            <div className="space-y-1">
              <div className="h-2 w-1/2 bg-slate-800"></div>
              <div className="h-1 w-1/3 bg-blue-600"></div>
            </div>
            <div className="h-px bg-slate-100 w-full"></div>
            <div className="space-y-1">
              {[1,2,3].map(i => <div key={i} className="h-1 w-full bg-slate-100"></div>)}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'classic',
      name: 'Standard Corporate',
      description: 'Timeless black & white design for all industries.',
      preview: (
        <div className="w-full h-full bg-white p-3 flex flex-col items-center gap-1 pointer-events-none select-none overflow-hidden text-[4px] border-t-2 border-slate-800">
          <div className="h-2 w-1/2 bg-slate-900 mb-0.5"></div>
          <div className="flex gap-2 mb-2">
            <div className="h-1 w-8 bg-slate-100"></div>
            <div className="h-1 w-8 bg-slate-100"></div>
          </div>
          <div className="w-full h-px bg-slate-200 mb-2"></div>
          <div className="w-full space-y-2">
            {[1,2].map(i => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-center border-b border-slate-100 pb-0.5">
                  <div className="h-1 w-12 bg-slate-800"></div>
                  <div className="h-1 w-6 bg-slate-300"></div>
                </div>
                <div className="h-1 w-full bg-slate-100"></div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'creative',
      name: 'Creative Impact',
      description: 'Bold sidebar and design for creative roles.',
      preview: (
        <div className="w-full h-full bg-white flex pointer-events-none select-none overflow-hidden text-[4px]">
          <div className="w-[35%] bg-slate-900 p-2 space-y-3">
            <div className="w-5 h-5 rounded-full bg-slate-700 mx-auto border border-purple-500/30"></div>
            <div className="space-y-1">
              <div className="h-1 w-full bg-white"></div>
              <div className="h-0.5 w-1/2 bg-purple-400"></div>
            </div>
          </div>
          <div className="flex-1 p-2 space-y-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-0.5 bg-purple-600"></div>
              <div className="h-1.5 w-10 bg-slate-900"></div>
            </div>
            <div className="space-y-1">
              {[1,2].map(i => <div key={i} className="h-1 w-full bg-slate-100"></div>)}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'basic',
      name: 'Clean Minimalist',
      description: 'ATS-friendly simple text-based design.',
      preview: (
        <div className="w-full h-full bg-white p-3 space-y-2 pointer-events-none select-none overflow-hidden text-[4px]">
          <div className="border-b border-slate-900 pb-1">
            <div className="h-1.5 w-1/3 bg-slate-900 mb-0.5"></div>
            <div className="h-1 w-1/2 bg-slate-400"></div>
          </div>
          <div className="space-y-1">
            <div className="h-1 w-1/4 bg-slate-800"></div>
            <div className="h-1 w-full bg-slate-50"></div>
            <div className="h-1 w-full bg-slate-50"></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {templates.map((template) => (
        <div 
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={`
            group relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 
            ${selectedTemplate === template.id 
              ? `border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-800` 
              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 bg-white dark:bg-gray-800 hover:shadow-md'}
          `}
        >
          {/* Visual Preview */}
          <div className="aspect-[210/297] w-full rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden shadow-sm mb-4 bg-gray-100">
             {template.preview}
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h3 className={`font-bold text-lg ${selectedTemplate === template.id ? 'text-blue-700 dark:text-blue-400' : 'text-gray-800 dark:text-gray-100'}`}>
                {template.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-snug">
                {template.description}
              </p>
            </div>
            {selectedTemplate === template.id && (
              <div className="bg-blue-600 text-white p-1.5 rounded-full shadow-sm animate-in zoom-in duration-200">
                <Check className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelector;