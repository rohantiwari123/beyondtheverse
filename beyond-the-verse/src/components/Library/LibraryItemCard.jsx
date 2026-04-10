import React from 'react';

export default function LibraryItemCard({
    item,
    handleOpenFolder,
    activeMenu,
    setActiveMenu,
    handleRename,
    handleShare,
    handleDelete,
    isAdmin // 🌟 Admin prop yahan receive kiya
}) {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.type === "folder" ? handleOpenFolder(item) : window.open(item.url, '_blank');
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => item.type === "folder" ? handleOpenFolder(item) : window.open(item.url, '_blank')}
            onKeyDown={handleKeyDown}
            className={`group relative flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start p-4 sm:p-5 border-b sm:border border-slate-200/80 bg-white hover:bg-slate-50 active:bg-slate-100 sm:hover:border-slate-300 sm:hover:shadow-sm cursor-pointer sm:rounded-2xl transition-all duration-200 w-full min-h-[72px] sm:h-[148px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:border-transparent ${activeMenu === item.id ? 'z-50 sm:border-slate-300 sm:shadow-sm' : 'z-10 hover:z-20'
                }`}
        >
            {/* Icon & Details Wrapper */}
            <div className="flex flex-row sm:flex-col items-center sm:items-start flex-1 min-w-0 w-full">
                <div className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl shrink-0 transition-transform duration-300 sm:group-hover:scale-105 ${item.type === 'folder' ? 'bg-slate-100 text-slate-600' : 'bg-slate-100 text-slate-800'}`}>
                    <i className={`fa-solid text-xl ${item.type === "folder" ? "fa-folder" : "fa-file-pdf"}`}></i>
                </div>

                <div className="ml-4 sm:ml-0 sm:mt-5 flex-1 min-w-0 w-full pr-8 sm:pr-0">
                    <p className="text-[15px] sm:text-[15px] font-semibold text-slate-900 truncate leading-snug" title={item.name}>
                        {item.name}
                    </p>
                    <p className="text-[11px] text-slate-500 uppercase tracking-widest mt-1 sm:mt-1.5 font-medium">
                        {item.type}
                    </p>
                </div>
            </div>

            {/* 🌟 3-Dots Menu Button (Sirf Admin ko dikhega) */}
            {isAdmin && (
                <div className="relative shrink-0 ml-2 sm:ml-0 sm:absolute sm:top-3 sm:right-3">
                    <button
                        aria-label={`Options for ${item.name}`}
                        aria-expanded={activeMenu === item.id}
                        onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === item.id ? null : item.id); }}
                        className={`w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg border border-transparent hover:bg-slate-200 active:bg-slate-300 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 cursor-pointer ${activeMenu === item.id ? 'bg-slate-200 text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                        <i className="fa-solid fa-ellipsis-vertical" aria-hidden="true"></i>
                    </button>

                    {/* Dropdown Menu */}
                    {activeMenu === item.id && (
                        <div role="menu" className="absolute top-full right-0 sm:top-11 sm:right-0 mt-1 w-40 bg-white border border-slate-200/80 rounded-xl shadow-lg shadow-slate-900/10 z-50 py-1.5 overflow-hidden animate-fade-in origin-top-right">

                            <button
                                role="menuitem"
                                // 🌟 FIX: item.id ki jagah pura 'item' pass kiya hai
                                onClick={(e) => handleRename(e, item)}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors focus-visible:bg-slate-50 focus-visible:outline-none flex items-center gap-2.5"
                            >
                                <i className="fa-solid fa-pen text-slate-400 w-3 text-center"></i> Rename
                            </button>

                            <button
                                role="menuitem"
                                onClick={(e) => handleShare(e, item)}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors focus-visible:bg-slate-50 focus-visible:outline-none flex items-center gap-2.5"
                            >
                                <i className="fa-solid fa-link text-slate-400 w-3 text-center"></i> Share Link
                            </button>

                            <div className="border-t border-slate-100 my-1"></div>

                            <button
                                role="menuitem"
                                // 🌟 FIX: item.id ki jagah pura 'item' pass kiya hai
                                onClick={(e) => handleDelete(e, item)}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 focus-visible:bg-red-50 focus-visible:outline-none transition-colors flex items-center gap-2.5"
                            >
                                <i className="fa-solid fa-trash-can text-red-400 w-3 text-center"></i> Delete
                            </button>

                        </div>
                    )}
                </div>
            )}
        </div>
    );
}