import React from 'react';

export default function CommentBox({ interactions }) {
  if (!interactions || interactions.length === 0) return null;

  // Ekdum flat color config (No shadows, No 3D)
  const typeConfig = {
    support: { 
      color: 'text-emerald-700', 
      bg: 'bg-emerald-50', 
      border: 'border-emerald-100', 
      label: 'SUPPORTED',
      indicator: 'bg-emerald-600'
    },
    counter: { 
      color: 'text-rose-700', 
      bg: 'bg-rose-50', 
      border: 'border-rose-100', 
      label: 'COUNTERED',
      indicator: 'bg-rose-600'
    },
    doubt: { 
      color: 'text-amber-700', 
      bg: 'bg-amber-50', 
      border: 'border-amber-100', 
      label: 'DOUBTED',
      indicator: 'bg-amber-600'
    }
  };

  return (
    <div className="mt-10 pt-10 border-t border-slate-200">
      {/* Clean & Flat Header */}
      <div className="flex items-center gap-2 mb-8 px-1">
        <h4 className="font-black text-slate-900 text-xs uppercase tracking-[0.25em]">
          LOGIC TRACKER / {interactions.length} REFLECTIONS
        </h4>
      </div>
      
      <div className="space-y-0">
        {interactions.map((interaction, idx) => {
          const config = typeConfig[interaction.type];
          
          return (
            <div key={idx} className="border-b border-slate-100 last:border-none py-6 md:py-8 px-1">
              
              {/* Info Row: User & Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Flat square indicator */}
                  <div className={`h-2 w-2 ${config.indicator}`}></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="font-black text-slate-900 text-xs tracking-tight uppercase">
                      {interaction.userName}
                    </span>
                    <span className={`inline-block text-[8px] font-black px-1.5 py-0.5 border ${config.border} ${config.bg} ${config.color} tracking-tighter`}>
                      {config.label}
                    </span>
                  </div>
                </div>
                
                <span className="text-[9px] text-slate-400 font-bold uppercase">
                  {new Date(interaction.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              
              {/* 🌟 Content: No extra padding, just clean text */}
              <p className="text-slate-700 text-base md:text-xl leading-[1.8] verse-thought-serif">
                {interaction.text}
              </p>

            </div>
          );
        })}
      </div>

      {/* End line */}
      <div className="mt-12 border-t border-slate-100 pt-4 text-center">
         <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">End of Verse</span>
      </div>
    </div>
  );
}