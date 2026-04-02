import React from 'react';

export default function CommentBox({ interactions }) {
  if (!interactions || interactions.length === 0) return null;

  // Modern Flat Config: Sirf text colors aur minimal icons (No background boxes)
  const typeConfig = {
    support: { 
      icon: 'fa-regular fa-circle-check',
      color: 'text-emerald-600', 
      label: 'Supported'
    },
    counter: { 
      icon: 'fa-solid fa-bolt',
      color: 'text-rose-600', 
      label: 'Countered'
    },
    doubt: { 
      icon: 'fa-solid fa-magnifying-glass',
      color: 'text-amber-600', 
      label: 'Questioned'
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-slate-100">
      
      {/* Thread List */}
      <div className="space-y-0">
        {interactions.map((interaction, idx) => {
          const config = typeConfig[interaction.type];
          
          return (
            <div key={idx} className="border-b border-slate-100 last:border-none py-5 md:py-6">
              
              <div className="flex items-start gap-3 md:gap-4">
                
                {/* Modern Circular Avatar */}
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs md:text-sm shrink-0">
                  {interaction.userName?.charAt(0).toUpperCase()}
                </div>
                
                {/* Content Container */}
                <div className="flex-1 min-w-0">
                  
                  {/* Info Row: Name, Action, Time */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm tracking-tight truncate max-w-[120px] md:max-w-[200px]">
                        {interaction.userName}
                      </span>
                      <span className={`text-[11px] md:text-xs font-semibold flex items-center gap-1 ${config.color}`}>
                        <i className={config.icon}></i> {config.label}
                      </span>
                    </div>
                    
                    <span className="text-[10px] md:text-[11px] text-slate-400 font-medium shrink-0">
                      {new Date(interaction.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  
                  {/* 🌟 Content: Seamless integration with avatar layout */}
                  <p className="text-slate-800 text-lg md:text-xl leading-[1.8] verse-thought-serif mt-1">
                    {interaction.text}
                  </p>
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
                  }
