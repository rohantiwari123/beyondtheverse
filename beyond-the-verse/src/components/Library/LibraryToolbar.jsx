import React from 'react';

export default function LibraryToolbar({ folderHistory, handleGoBack, openModal }) {
  return (
    <header className="px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1 text-sm sm:text-base lg:text-lg flex-1">
          <ol className="flex items-center min-w-0">
            {folderHistory.map((folder, index) => (
              <li key={folder.id} className="flex items-center whitespace-nowrap shrink-0">
                <button 
                  onClick={() => handleGoBack(index)}
                  aria-current={index === folderHistory.length - 1 ? "page" : undefined}
                  className={`font-semibold cursor-pointer px-1.5 py-1 rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 active:scale-95 ${
                    index === folderHistory.length - 1 
                      ? 'text-slate-900' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {folder.name}
                </button>
                {index < folderHistory.length - 1 && <span className="text-slate-300 mx-1 sm:mx-2" aria-hidden="true">/</span>}
              </li>
            ))}
          </ol>
        </nav>

        {/* Action Buttons */}
        <div className="flex flex-row items-center gap-3 shrink-0">
          <button 
            onClick={() => openModal("folder")} 
            aria-label="Create new folder"
            className="flex-1 sm:flex-none min-h-[44px] px-5 bg-slate-100 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-200 active:bg-slate-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 transition-all cursor-pointer flex items-center justify-center gap-2.5"
          >
            <i className="fa-solid fa-folder-plus text-slate-500" aria-hidden="true"></i> Folder
          </button>
          <button 
            onClick={() => openModal("file")} 
            aria-label="Upload new file"
            className="flex-1 sm:flex-none min-h-[44px] px-5 bg-slate-900 text-white font-semibold text-sm rounded-xl hover:bg-slate-800 active:bg-black active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 transition-all cursor-pointer flex items-center justify-center gap-2.5 shadow-sm"
          >
            <i className="fa-solid fa-upload text-slate-300" aria-hidden="true"></i> Upload
          </button>
        </div>

      </div>
    </header>
  );
}