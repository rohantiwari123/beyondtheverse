import React from 'react';

export default function LibraryModal({ 
  isModalOpen, 
  closeModal, 
  modalType, 
  handleCreateSubmit, 
  newItemName, 
  setNewItemName, 
  selectedFile, 
  setSelectedFile 
}) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/30 backdrop-blur-sm">
      <div className="absolute inset-0 cursor-pointer" onClick={closeModal} aria-hidden="true"></div>
      
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="relative w-full max-w-md bg-white border-t sm:border border-slate-200 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 pb-10 sm:pb-8 z-10 animate-fade-in-up sm:animate-none shadow-2xl">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h3 id="modal-title" className="text-xl font-bold text-slate-900">
            {modalType === "folder" ? "New Folder" : "Upload File"}
          </h3>
          <button onClick={closeModal} aria-label="Close modal" className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 active:bg-slate-200 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900">
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
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-base transition-colors" required autoFocus
              />
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-10 text-center bg-slate-50 hover:bg-slate-100 focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900 transition-all relative cursor-pointer">
              <input 
                type="file" accept=".pdf" onChange={(e) => setSelectedFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" required aria-label="File upload input"
              />
              <div className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <i className="fa-solid fa-arrow-up text-slate-700 text-lg"></i>
              </div>
              <p className="text-base font-semibold text-slate-900 truncate px-2">
                {selectedFile ? selectedFile.name : "Select a PDF"}
              </p>
              <p className="text-sm text-slate-500 mt-1">or drag and drop here</p>
            </div>
          )}

          <button type="submit" className="w-full bg-slate-900 text-white font-semibold py-3.5 sm:py-4 rounded-xl text-sm sm:text-base hover:bg-slate-800 active:bg-black active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 transition-all shadow-sm">
            {modalType === "folder" ? "Create Folder" : "Confirm Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}