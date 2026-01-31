import React from 'react';
import { Check } from 'lucide-react';

const TemplateSelector = ({ selectedTemplate, onSelect }) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern Blue',
      description: 'Clean and professional with a touch of color.',
      preview: (
        <div className="w-full h-full bg-white p-2 flex flex-col gap-1 pointer-events-none select-none overflow-hidden">
          <div className="flex gap-2 mb-1">
             <div className="w-8 h-8 rounded-full bg-gray-200"></div>
             <div className="flex-1 space-y-1">
                <div className="h-2 w-2/3 bg-gray-800 rounded"></div>
                <div className="h-1 w-1/2 bg-gray-400 rounded"></div>
             </div>
          </div>
          <div className="flex gap-2 flex-1">
             <div className="w-2/3 space-y-2">
                <div className="h-1.5 w-full bg-gray-200 rounded"></div>
                <div className="h-1.5 w-full bg-gray-200 rounded"></div>
                <div className="h-1.5 w-3/4 bg-gray-200 rounded"></div>
                
                <div className="mt-2 h-2 w-1/3 bg-blue-600 rounded"></div>
                <div className="h-1.5 w-full bg-gray-200 rounded"></div>
                <div className="h-1.5 w-full bg-gray-200 rounded"></div>
             </div>
             <div className="w-1/3 bg-gray-50 p-1 space-y-1">
                <div className="h-1.5 w-full bg-gray-300 rounded"></div>
                <div className="h-1.5 w-full bg-gray-300 rounded"></div>
                <div className="h-1.5 w-full bg-gray-300 rounded"></div>
             </div>
          </div>
        </div>
      )
    },
    {
      id: 'classic',
      name: 'Classic Pro',
      description: 'Timeless black & white design for all industries.',
      preview: (
        <div className="w-full h-full bg-white p-3 flex flex-col items-center gap-1 pointer-events-none select-none overflow-hidden">
          <div className="h-2 w-1/2 bg-black mb-1"></div>
          <div className="h-1 w-1/3 bg-gray-500 mb-2"></div>
          
          <div className="w-full space-y-2 text-left">
             <div className="h-1.5 w-full border-b border-black"></div>
             <div className="h-1 w-full bg-gray-300"></div>
             <div className="h-1 w-full bg-gray-300"></div>
             
             <div className="mt-2 h-1.5 w-full border-b border-black"></div>
             <div className="flex justify-between">
                <div className="h-1 w-1/4 bg-gray-800"></div>
                <div className="h-1 w-1/4 bg-gray-500"></div>
             </div>
             <div className="h-1 w-full bg-gray-300"></div>
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