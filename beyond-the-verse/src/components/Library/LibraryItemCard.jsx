import React, { useState, useRef, useEffect } from 'react';

export default function LibraryItemCard({
    item,
    handleOpenFolder,
    activeMenu,
    setActiveMenu,
    handleRename,
    handleShare,
    handleDelete,
    isAdmin,
    handleStartMoveCopy
}) {
    const [actionMode, setActionMode] = useState(null); 
    const [editName, setEditName] = useState(item.name);
    const inputRef = useRef(null);

    useEffect(() => {
        if (actionMode === 'rename' && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [actionMode]);

    const handleKeyDown = (e) => {
        if (actionMode) return; 
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.type === "folder" ? handleOpenFolder(item) : window.open(item.url, '_blank');
        }
    };

    const submitRename = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (editName.trim() && editName !== item.name) {
            handleRename(item, editName);
        }
        setActionMode(null);
    };

    const submitDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleDelete(item);
        setActionMode(null);
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => {
                if (actionMode) return; 
                item.type === "folder" ? handleOpenFolder(item) : window.open(item.url, '_blank')
            }}
            onKeyDown={handleKeyDown}
            // 🚨 YAHAN SE 'overflow-hidden' HATA DIYA HAI 🚨
            className={`group relative flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start p-4 sm:p-5 border-b sm:border border-slate-200/80 bg-white hover:bg-slate-50 active:bg-slate-100 sm:hover:border-slate-300 sm:hover:shadow-sm cursor-pointer sm:rounded-2xl transition-all duration-200 w-full min-h-[72px] sm:h-[148px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:border-transparent ${activeMenu === item.id ? 'z-50 sm:border-slate-300 sm:shadow-sm' : 'z-10 hover:z-20'}`}
        >
            {!actionMode && (
                <>
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

                    {isAdmin && (
                        <div className="relative shrink-0 ml-2 sm:ml-0 sm:absolute sm:top-3 sm:right-3">
                            <button
                                aria-expanded={activeMenu === item.id}
                                onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === item.id ? null : item.id); }}
                                className={`w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg border border-transparent hover:bg-slate-200 active:bg-slate-300 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 cursor-pointer ${activeMenu === item.id ? 'bg-slate-200 text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}
                            >
                                <i className="fa-solid fa-ellipsis-vertical" aria-hidden="true"></i>
                            </button>

                            {activeMenu === item.id && (
                                <div className="absolute top-full right-0 sm:top-11 sm:right-0 mt-1 w-40 bg-white border border-slate-200/80 rounded-xl shadow-lg shadow-slate-900/10 z-50 py-1.5 animate-fade-in origin-top-right">
                                    <button
                                        onClick={(e) => handleStartMoveCopy(e, item, 'move')}
                                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2.5"
                                    >
                                        <i className="fa-solid fa-arrows-up-down-left-right text-slate-400 w-3 text-center"></i> Move
                                    </button>
                                    <button
                                        onClick={(e) => handleStartMoveCopy(e, item, 'copy')}
                                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2.5"
                                    >
                                        <i className="fa-solid fa-copy text-slate-400 w-3 text-center"></i> Copy
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setActionMode('rename'); setEditName(item.name); setActiveMenu(null); }}
                                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-2.5"
                                    >
                                        <i className="fa-solid fa-pen text-slate-400 w-3 text-center"></i> Rename
                                    </button>
                                    <button
                                        onClick={(e) => handleShare(e, item)}
                                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-2.5"
                                    >
                                        <i className="fa-solid fa-link text-slate-400 w-3 text-center"></i> Share
                                    </button>
                                    <div className="border-t border-slate-100 my-1"></div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setActionMode('delete'); setActiveMenu(null); }}
                                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2.5"
                                    >
                                        <i className="fa-solid fa-trash-can text-rose-400 w-3 text-center"></i> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            {actionMode === 'rename' && (
                <div className="w-full h-full flex flex-col justify-center sm:justify-start gap-3 sm:mt-2 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && submitRename(e)}
                        className="w-full bg-slate-50 border border-slate-300 px-3 py-2 rounded-lg text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 font-medium text-slate-900"
                    />
                    <div className="flex gap-2 w-full">
                        <button onClick={submitRename} className="flex-1 bg-teal-600 text-white py-1.5 rounded-lg text-xs font-semibold hover:bg-teal-700 active:scale-95 transition-all shadow-sm">Save</button>
                        <button onClick={(e) => { e.stopPropagation(); setActionMode(null); }} className="flex-1 bg-slate-200 text-slate-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-300 active:scale-95 transition-all">Cancel</button>
                    </div>
                </div>
            )}

            {actionMode === 'delete' && (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-1">
                        <i className="fa-solid fa-trash-can text-sm"></i>
                    </div>
                    <p className="text-[13px] font-bold text-rose-600 text-center leading-tight">Delete item?</p>
                    <div className="flex gap-2 w-full mt-1">
                        <button onClick={submitDelete} className="flex-1 bg-rose-600 text-white py-1.5 rounded-lg text-xs font-semibold hover:bg-rose-700 active:scale-95 transition-all shadow-sm">Yes</button>
                        <button onClick={(e) => { e.stopPropagation(); setActionMode(null); }} className="flex-1 bg-slate-200 text-slate-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-300 active:scale-95 transition-all">No</button>
                    </div>
                </div>
            )}
        </div>
    );
}