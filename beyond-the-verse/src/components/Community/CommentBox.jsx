import React from 'react';

export default function CommentBox({ interactions }) {
  // Agar koi interaction nahi hai, toh kuch mat dikhao
  if (!interactions || interactions.length === 0) return null;

  // Har type ke liye alag design
  const typeConfig = {
    support: { icon: 'fa-check-double', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Supported' },
    counter: { icon: 'fa-bolt', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', label: 'Countered' },
    doubt: { icon: 'fa-microscope', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Doubted' }
  };

  return (
    <div className="mt-6 pt-6 border-t border-slate-100">
      <h4 className="font-black text-slate-800 text-sm mb-4 uppercase tracking-wider">
        Logic Tracker ({interactions.length})
      </h4>
      
      <div className="space-y-3">
        {interactions.map((interaction, idx) => {
          const config = typeConfig[interaction.type];
          
          return (
            <div key={idx} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
              
              {/* User Name & Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-slate-800 text-xs sm:text-sm">{interaction.userName}</span>
                
                <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md border ${config.bg} ${config.color} ${config.border} flex items-center gap-1`}>
                  <i className={`fa-solid ${config.icon}`}></i> {config.label}
                </span>
                
                {/* Time */}
                <span className="text-[10px] text-slate-400 font-medium ml-auto">
                  {new Date(interaction.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              
              {/* The Reason/Comment */}
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                {interaction.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
    }
