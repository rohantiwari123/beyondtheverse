import React from 'react';

export default function LibraryModal({ 
  isModalOpen, 
  closeModal, 
  modalType, 
  handleCreateSubmit, 
  newItemName, 
  setNewItemName, 
  selectedFile, 
  setSelectedFile,
  isProcessing // 🌟 YAHAN ISPROCESSING ADD KIYA HAI
}) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/30 backdrop-blur-sm">
      {/* 🌟 Agar process chal raha hai, to bahar click karke band na ho */}
      <div className="absolute inset-0 cursor-pointer" onClick={!isProcessing ? closeModal : undefined} aria-hidden="true"></div>
      
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative w-full max-w-md bg-white border-t sm:border border-slate-200 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 pb-10 sm:pb-8 z-10 animate-fade-in-up sm:animate-none shadow-2xl">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h3 id="modal-title" className="text-xl font-bold text-slate-900">
            {modalType === "folder" ? "New Folder" : "Add PDF Link"}
          </h3>
          <button 
            onClick={closeModal} 
            disabled={isProcessing} // 🌟 Uploading ke time close button disable
            aria-label="Close modal" 
            className={`w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900
              ${isProcessing ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100 active:bg-slate-200'}`}
          >
            <i className="fa-solid fa-xmark text-lg sm:text-base"></i>
          </button>
        </div>

        <form onSubmit={handleCreateSubmit} className="space-y-6">
          {modalType === "folder" ? (
            <div>
              <label htmlFor="folderName" className="block text-sm font-medium text-slate-700 mb-2">Folder Name</label>
              <input 
                id="folderName" type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)}
                placeholder="e.g. Cognitive Psychology" 
                disabled={isProcessing} // 🌟 Uploading ke time input disable
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-base transition-colors disabled:bg-slate-50 disabled:text-slate-400" required autoFocus
              />
            </div>
          ) : (
            /* 🌟 FILE INPUT HATA DIYA, AB SIRF NAME AUR LINK BOX HAI */
            <div className="space-y-4">
              <div>
                <label htmlFor="pdfName" className="block text-sm font-medium text-slate-700 mb-2">PDF Name</label>
                <input 
                  id="pdfName" type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. The Bhagavad Gita" 
                  disabled={isProcessing} 
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-base transition-colors disabled:bg-slate-50 disabled:text-slate-400" required 
                />
              </div>
              <div>
                <label htmlFor="pdfLink" className="block text-sm font-medium text-slate-700 mb-2">Google Drive / Direct Link</label>
                {/* Yahan selectedFile ab as a Text (URL) kaam karega */}
                <input 
                  id="pdfLink" type="url" value={selectedFile || ''} onChange={(e) => setSelectedFile(e.target.value)}
                  placeholder="Paste link here..." 
                  disabled={isProcessing} 
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-base transition-colors disabled:bg-slate-50 disabled:text-slate-400" required 
                />
              </div>
            </div>
          )}

          {/* 🌟 SUBMIT BUTTON WITH LOADING SPINNER */}
          <button 
            type="submit" 
            disabled={isProcessing}
            className={`w-full text-white font-semibold py-3.5 sm:py-4 rounded-xl text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 transition-all shadow-sm flex justify-center items-center gap-2
              ${isProcessing 
                ? 'bg-teal-600 cursor-not-allowed opacity-90' 
                : 'bg-slate-900 hover:bg-slate-800 active:bg-black active:scale-[0.98]'}`}
          >
            {isProcessing ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin"></i>
                {modalType === "folder" ? "Creating..." : "Saving Link..."}
              </>
            ) : (
              modalType === "folder" ? "Create Folder" : "Save PDF Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
              }
