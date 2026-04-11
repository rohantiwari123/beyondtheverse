import React, { memo } from 'react';

const LibraryToolbar = memo(({ 
  folderHistory, 
  handleGoBack, 
  openModal, 
  isAdmin, 
  clipboard, 
  handlePaste, 
  setClipboard 
}) => {

  // --- 🎨 DESIGN SYSTEM (Variables) ---
  const styles = {
    header: "px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 mt-2",
    // Mobile पर ऊपर-नीचे (col), Desktop पर आमने-सामने (row)
    wrapper: "flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6",
    
    // Breadcrumbs: Mobile पर टच-स्क्रोल आसान बनाने के लिए overflow
    nav: "flex items-center gap-1 overflow-x-auto no-scrollbar py-1 flex-1 -mx-2 px-2 sm:mx-0 sm:px-0",
    breadcrumbBtn: (isLast) => `whitespace-nowrap text-[13px] sm:text-[15px] font-bold px-2.5 py-1.5 rounded-xl transition-all duration-150 ${
      isLast 
        ? 'text-slate-900 cursor-default' 
        : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100 active:scale-95'
    }`,
    separator: "text-slate-300 shrink-0",

    // Actions Container: Mobile पर बटन फुल विड्थ ले सकते हैं
    actions: "flex items-center gap-2 sm:gap-3 shrink-0",
    
    // Buttons: Card के डिजाइन से मैच करते हुए (rounded-xl + No shadow)
    btnBase: "h-10 sm:h-11 px-4 sm:px-5 rounded-xl text-[11px] sm:text-[12px] font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2.5 border",
    btnFolder: "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 flex-1 sm:flex-none",
    btnUpload: "bg-slate-900 border-slate-900 text-white hover:bg-slate-800 flex-1 sm:flex-none",
    
    // Paste Mode UI
    pasteBox: "flex items-center gap-1.5 bg-teal-50 border border-teal-100 p-1 rounded-2xl w-full sm:w-auto",
    btnPaste: "h-8 sm:h-9 px-4 bg-teal-600 border border-teal-600 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95 flex items-center gap-2",
    btnCancel: "w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-teal-700 hover:bg-teal-100 rounded-xl transition-colors"
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        
        {/* 1. BREADCRUMBS: स्लीक नेविगेशन */}
        <nav aria-label="Breadcrumb" className={styles.nav}>
          <ol className="flex items-center min-w-0">
            {folderHistory.map((folder, index) => {
              const isLast = index === folderHistory.length - 1;
              return (
                <li key={folder.id} className="flex items-center shrink-0">
                  <button  
                    onClick={() => handleGoBack(index)} 
                    disabled={isLast}
                    className={styles.breadcrumbBtn(isLast)}
                  >
                    {folder.name}
                  </button>
                  
                  {!isLast && (
                    <span className={styles.separator}>
                      <i className="fa-solid fa-chevron-right text-[9px] mx-1"></i>
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* 2. ADMIN ACTIONS: बटन्स */}
        {isAdmin && (
          <div className={styles.actions}>
            
            {clipboard ? (
              /* 📋 PASTE MODE: No shadows, clean borders */
              <div className={styles.pasteBox}>
                <button onClick={handlePaste} className={styles.btnPaste}>
                  <i className="fa-solid fa-paste"></i>
                  Paste
                </button>
                <button onClick={() => setClipboard(null)} className={styles.btnCancel}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            ) : (
              /* 📂 DEFAULT MODE: Side-by-side buttons */
              <>
                <button onClick={() => openModal("folder")} className={`${styles.btnBase} ${styles.btnFolder}`}>
                  <i className="fa-solid fa-folder-plus text-[14px]"></i>
                  <span className="hidden xs:inline">Folder</span>
                  <span className="xs:hidden text-[10px]">Folder</span>
                </button>
                <button onClick={() => openModal("file")} className={`${styles.btnBase} ${styles.btnUpload}`}>
                  <i className="fa-solid fa-upload text-[14px]"></i>
                  <span className="hidden xs:inline">Upload</span>
                  <span className="xs:hidden text-[10px]">Upload</span>
                </button>
              </>
            )}
            
          </div>
        )}
      </div>
    </header>
  );
});

export default LibraryToolbar;