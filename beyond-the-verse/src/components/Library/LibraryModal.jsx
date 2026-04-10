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
            {modalType === "folder" ? "New Folder" : "Upload File"}
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
            <div className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center relative transition-all
              ${isProcessing ? 'border-slate-200 bg-slate-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900 cursor-pointer'}`}>
              
              <input 
                type="file" 
                accept="application/pdf, .pdf" // 🌟 Best practice for PDF
                onChange={(e) => setSelectedFile(e.target.files[0])}
                disabled={isProcessing} // 🌟 Uploading ke time file change disable
                className={`absolute inset-0 w-full h-full opacity-0 z-10 ${isProcessing ? 'cursor-not-allowed' : 'cursor-pointer'}`} 
                required 
                aria-label="File upload input"
              />
              
              <div className={`w-14 h-14 border rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm transition-colors
                ${isProcessing ? 'bg-slate-100 border-slate-200' : 'bg-white border-slate-200'}`}>
                <i className={`fa-solid fa-arrow-up text-lg ${isProcessing ? 'text-slate-300' : 'text-slate-700'}`}></i>
              </div>
              <p className={`text-base font-semibold truncate px-2 ${isProcessing ? 'text-slate-400' : 'text-slate-900'}`}>
                {selectedFile ? selectedFile.name : "Select a PDF"}
              </p>
              <p className={`text-sm mt-1 ${isProcessing ? 'text-slate-300' : 'text-slate-500'}`}>
                {isProcessing ? "Uploading in progress..." : "or drag and drop here"}
              </p>
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
                {modalType === "folder" ? "Creating..." : "Uploading PDF..."}
              </>
            ) : (
              modalType === "folder" ? "Create Folder" : "Confirm Upload"
            )}
          </button>
        </form>
      </div>
    </div>
  );
        }
