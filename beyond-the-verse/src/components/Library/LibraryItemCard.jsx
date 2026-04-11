import React, { useState, useRef, useEffect } from 'react';

export default function LibraryItemCard({
    item, handleOpenFolder, activeMenu, setActiveMenu, 
    handleRename, handleShare, handleDelete, isAdmin, handleStartMoveCopy
}) {
    const [actionMode, setActionMode] = useState(null); 
    const [editName, setEditName] = useState(item.name);
    const inputRef = useRef(null);

    // --- 🎨 HYBRID DESIGN SYSTEM ---
    const styles = {
        // Mobile: Horizontal (row), Desktop: Vertical (col)
        card: `group relative flex flex-row sm:flex-col items-center sm:items-start p-3 sm:p-5 border transition-all duration-150 rounded-2xl gap-3 sm:gap-0 
            ${activeMenu === item.id 
                ? 'bg-slate-50 border-slate-400 z-30 ring-1 ring-slate-400' 
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 z-10'
            } 
            ${actionMode ? 'h-auto min-h-[70px] sm:h-[155px]' : 'h-[72px] sm:h-[155px]'}`,

        // Icon Box: Mobile पर छोटा और साइड में
        iconBox: `w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-xl flex items-center justify-center sm:mb-4 border transition-transform group-hover:scale-105 ${
            item.type === 'folder' ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800'
        }`,

        // Text Wrapper: Mobile पर फ्लेक्स-ग्रो ताकि मेनू राइट में रहे
        textWrapper: "flex-1 min-w-0 flex flex-col justify-center sm:block",
        title: "text-[14px] sm:text-[15px] font-bold text-slate-900 truncate w-full tracking-tight",
        subtitle: "text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-0.5",

        menuBtn: "w-9 h-9 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors text-slate-400 hover:bg-slate-100 hover:text-slate-600",
        dropdown: "absolute right-3 top-12 sm:top-10 w-44 bg-white border border-slate-200 rounded-2xl z-50 py-1.5 animate-fade-in shadow-xl shadow-slate-900/5",
        dropdownItem: "w-full text-left px-4 py-2.5 hover:bg-slate-50 text-[13px] flex items-center gap-3 font-medium text-slate-700",
        
        input: "w-full border border-slate-200 px-3 py-2 rounded-xl text-sm outline-none focus:border-slate-900 bg-white font-medium",
        actionBtn: "flex-1 py-2 rounded-xl text-[10px] sm:text-[11px] font-bold uppercase tracking-wider active:scale-95 transition-all"
    };

    useEffect(() => {
        if (actionMode === 'rename' && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [actionMode]);

    const onCardClick = () => {
        if (actionMode) return;
        if (activeMenu === item.id) { setActiveMenu(null); return; }
        item.type === "folder" ? handleOpenFolder(item) : window.open(item.url, '_blank');
    };

    return (
        <div onClick={onCardClick} className={styles.card}>
            {!actionMode ? (
                <>
                    {/* Left/Top Part: Icon */}
                    <div className={styles.iconBox}>
                        <i className={`fa-solid ${item.type === "folder" ? "fa-folder text-lg" : "fa-file-pdf text-xl"}`}></i>
                    </div>

                    {/* Middle Part: Content */}
                    <div className={styles.textWrapper}>
                        <p className={styles.title} title={item.name}>{item.name}</p>
                        <p className={styles.subtitle}>{item.type}</p>
                    </div>

                    {/* Right/Top Part: Menu */}
                    {isAdmin && (
                        <div className="sm:absolute sm:top-3 sm:right-3">
                            <button 
                                onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === item.id ? null : item.id); }} 
                                className={`${styles.menuBtn} ${activeMenu === item.id ? 'bg-slate-200 text-slate-900' : ''}`}
                            >
                                <i className="fa-solid fa-ellipsis-vertical text-xs"></i>
                            </button>

                            {activeMenu === item.id && (
                                <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                                    <button onClick={(e) => handleStartMoveCopy(e, item, 'move')} className={styles.dropdownItem}>
                                        <i className="fa-solid fa-arrows-up-down-left-right text-slate-400 w-4"></i> Move
                                    </button>
                                    <button onClick={(e) => handleStartMoveCopy(e, item, 'copy')} className={styles.dropdownItem}>
                                        <i className="fa-solid fa-copy text-slate-400 w-4"></i> Copy
                                    </button>
                                    <button onClick={(e) => handleShare(e, item)} className={styles.dropdownItem}>
                                        <i className="fa-solid fa-link text-slate-400 w-4"></i> Share Link
                                    </button>
                                    <button onClick={() => { setActionMode('rename'); setActiveMenu(null); }} className={styles.dropdownItem}>
                                        <i className="fa-solid fa-pen text-slate-400 w-4"></i> Rename
                                    </button>
                                    <div className="border-t border-slate-100 my-1"></div>
                                    <button onClick={() => { setActionMode('delete'); setActiveMenu(null); }} className={`${styles.dropdownItem} hover:bg-rose-50 text-rose-600 font-bold`}>
                                        <i className="fa-solid fa-trash-can w-4"></i> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : (
                /* ACTION MODE: Full width inline editors */
                <div className="flex flex-col justify-center w-full gap-2.5 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                    {actionMode === 'rename' ? (
                        <>
                            <input ref={inputRef} value={editName} onChange={(e) => setEditName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleRename(item, editName) && setActionMode(null)} className={styles.input} />
                            <div className="flex gap-2">
                                <button onClick={() => { handleRename(item, editName); setActionMode(null); }} className={`${styles.actionBtn} bg-slate-900 text-white`}>Save</button>
                                <button onClick={() => setActionMode(null)} className={`${styles.actionBtn} bg-slate-100 text-slate-500`}>Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-[11px] font-bold text-center text-rose-600 uppercase">Confirm Delete?</p>
                            <div className="flex gap-2">
                                <button onClick={() => { handleDelete(item); setActionMode(null); }} className={`${styles.actionBtn} bg-rose-600 text-white`}>Delete</button>
                                <button onClick={() => setActionMode(null)} className={`${styles.actionBtn} bg-slate-100 text-slate-500`}>No</button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}