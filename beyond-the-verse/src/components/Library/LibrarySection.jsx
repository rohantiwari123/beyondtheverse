import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; 
import { 
  subscribeToLibraryItems, 
  createLibraryFolder, 
  uploadLibraryFile, 
  renameLibraryItem, 
  deleteLibraryItem,
  moveLibraryItem,
  copyLibraryItem
} from "../../services/firebaseServices"; 
import LibraryToolbar from "./LibraryToolbar";
import LibraryEmptyState from "./LibraryEmptyState";
import LibraryItemCard from "./LibraryItemCard";
import LibraryModal from "./LibraryModal";
import LoginOverlay from "../../components/common/LoginOverlay"; 

export default function LibrarySection() {
  const { currentUser, isAdmin } = useAuth(); 

  const [toast, setToast] = useState(null);
  const [clipboard, setClipboard] = useState(null); 
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false); 

  const [currentFolder, setCurrentFolder] = useState("root");
  const [folderHistory, setFolderHistory] = useState([{ id: "root", name: "Library" }]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const currentItems = items.filter((item) => item.parentId === currentFolder);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); 
  };

  useEffect(() => {
    const unsubscribe = subscribeToLibraryItems((fetchedItems) => {
      setItems(fetchedItems);
      setIsLoading(false);
    });
    return () => unsubscribe(); 
  }, []);

  const handleOpenFolder = (folder) => {
    setCurrentFolder(folder.id);
    setFolderHistory([...folderHistory, folder]);
    setActiveMenu(null);
  };

  const handleGoBack = (index) => {
    const newHistory = folderHistory.slice(0, index + 1);
    setFolderHistory(newHistory);
    setCurrentFolder(newHistory[newHistory.length - 1].id);
    setActiveMenu(null);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    if (modalType === "file" && !selectedFile) return;

    setIsProcessing(true);
    try {
      if (modalType === "folder") {
        await createLibraryFolder(newItemName, currentFolder);
        showToast("Folder created successfully!");
      } else {
        await uploadLibraryFile(selectedFile, currentFolder, newItemName);
        showToast("PDF Link saved successfully!");
      }
      closeModal(); 
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsProcessing(false); 
    }
  };

  const handleDelete = async (item) => {
    setActiveMenu(null);
    try {
      await deleteLibraryItem(item);
      showToast("Item deleted successfully!");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleRename = async (item, newName) => {
    setActiveMenu(null);
    try {
      await renameLibraryItem(item.id, newName);
      showToast("Item renamed successfully!");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleShare = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMenu(null);
    
    if (item.type === "file" && item.url) {
      navigator.clipboard.writeText(item.url);
      showToast("PDF Link copied to clipboard!");
    } else {
      showToast("Please open the folder to share its contents.", "error");
    }
  };

  const handleStartMoveCopy = (e, item, action) => {
    e.preventDefault();
    e.stopPropagation();
    setClipboard({ item, action });
    setActiveMenu(null);
  };

  const handlePaste = async () => {
    if (!clipboard) return;
    setIsProcessing(true);
    try {
      if (clipboard.action === 'move') {
        await moveLibraryItem(clipboard.item.id, currentFolder);
        showToast("Item moved successfully!");
      } else {
        await copyLibraryItem(clipboard.item, currentFolder);
        showToast("Item copied successfully!");
      }
      setClipboard(null); 
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const openModal = (type) => {
    if (!isAdmin) return showToast("Only admins can perform this action.", "error");
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewItemName("");
    setSelectedFile(null);
  };

  return (
    <section className="w-full max-w-7xl mx-auto pt-4 pb-12 sm:py-8 lg:py-12 min-h-[80vh] flex flex-col font-sans relative">

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-[100] animate-fade-in-up pointer-events-none">
          <div className={`px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-sm sm:text-base font-medium text-white ${toast.type === 'error' ? 'bg-rose-600' : 'bg-slate-900'}`}>
            <i className={`fa-solid ${toast.type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check'}`}></i>
            {toast.message}
          </div>
        </div>
      )}

      {/* Toolbar Component */}
      <LibraryToolbar
        folderHistory={folderHistory}
        handleGoBack={handleGoBack}
        openModal={openModal}
        isAdmin={isAdmin}
        clipboard={clipboard}
        handlePaste={handlePaste}
        setClipboard={setClipboard}
      />

      {/* 🚨 YAHAN SE OVERLAY HATA DIYA GAYA HAI JO PAGE STUCK KAR RAHA THA 🚨 */}

      <main className="w-full sm:px-6 lg:px-8 flex-1 outline-none relative" tabIndex={-1}>
        {!currentUser && (
          <LoginOverlay 
            icon="fa-solid fa-lock" 
            title="Access Restricted" 
            description="Unlock the wisdom inside. Join Beyond the Verse to explore, read, and download from our exclusive library." 
          />
        )}

        <div className={`transition-all duration-300 h-full ${!currentUser ? "pointer-events-none opacity-30 select-none" : ""}`}>
          {isLoading ? (
            <div className="py-32 flex justify-center items-center">
              <i className="fa-solid fa-spinner fa-spin text-3xl text-teal-600"></i>
            </div>
          ) : currentItems.length === 0 ? (
            <LibraryEmptyState openModal={openModal} isAdmin={isAdmin} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 sm:gap-5 border-t border-slate-200 sm:border-none">
              {currentItems.map((item) => (
                <LibraryItemCard
                  key={item.id}
                  item={item}
                  handleOpenFolder={handleOpenFolder}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  handleRename={handleRename}
                  handleShare={handleShare}
                  handleDelete={handleDelete}
                  isAdmin={isAdmin}
                  handleStartMoveCopy={handleStartMoveCopy}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <LibraryModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalType={modalType}
        handleCreateSubmit={handleCreateSubmit}
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        isProcessing={isProcessing} 
      />

    </section>
  );
}