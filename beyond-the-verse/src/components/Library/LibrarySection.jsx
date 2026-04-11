import React, { useState, useEffect, useMemo, useCallback } from "react"; 
import { useAuth } from "../../context/AuthContext"; 
import { 
  subscribeToLibraryItems, createLibraryFolder, uploadLibraryFile, 
  renameLibraryItem, deleteLibraryItem, moveLibraryItem, copyLibraryItem
} from "../../services/firebaseServices"; 

// Components
import LibraryToolbar from "./LibraryToolbar";
import LibraryEmptyState from "./LibraryEmptyState";
import LibraryItemCard from "./LibraryItemCard";
import LibraryModal from "./LibraryModal";
import LoginOverlay from "../../components/common/LoginOverlay"; 
import Toast from "../../components/common/Toast"; 

export default function LibrarySection() {
  const { currentUser, isAdmin } = useAuth(); 
  
  // States
  const [toast, setToast] = useState({ show: false, message: '', isSuccess: true });
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

  // --- LOGIC (UNTOUCHED) ---
  const currentItems = useMemo(() => {
    return items.filter((item) => item.parentId === currentFolder);
  }, [items, currentFolder]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, isSuccess: type === 'success' });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000); 
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToLibraryItems((fetchedItems) => {
      setItems(fetchedItems);
      setIsLoading(false);
    });
    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    const closeMenu = () => setActiveMenu(null);
    if (activeMenu) window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [activeMenu]);

  const handleOpenFolder = useCallback((folder) => {
    setCurrentFolder(folder.id);
    setFolderHistory(prev => [...prev, folder]);
    setActiveMenu(null);
  }, []);

  const handleGoBack = useCallback((index) => {
    const newHistory = folderHistory.slice(0, index + 1);
    setFolderHistory(newHistory);
    setCurrentFolder(newHistory[newHistory.length - 1].id);
    setActiveMenu(null);
  }, [folderHistory]);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    setIsProcessing(true);
    try {
      if (modalType === "folder") {
        await createLibraryFolder(newItemName, currentFolder);
        showToast("Folder created successfully!");
      } else {
        await uploadLibraryFile(selectedFile, currentFolder, newItemName);
        showToast("PDF Link saved!");
      }
      closeModal(); 
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsProcessing(false); 
    }
  };

  const handleDelete = async (item) => {
    try {
      await deleteLibraryItem(item);
      showToast("Item deleted permanently.");
    } catch (error) { showToast(error.message, "error"); }
  };

  const handleRename = async (item, newName) => {
    try {
      await renameLibraryItem(item.id, newName);
      showToast("Renamed successfully!");
    } catch (error) { showToast(error.message, "error"); }
  };

  const handlePaste = async () => {
    if (!clipboard) return;
    setIsProcessing(true);
    try {
      if (clipboard.action === 'move') {
        await moveLibraryItem(clipboard.item.id, currentFolder);
      } else {
        await copyLibraryItem(clipboard.item, currentFolder);
      }
      showToast(`${clipboard.action === 'move' ? 'Moved' : 'Copied'} successfully!`);
      setClipboard(null); 
    } catch (error) { showToast(error.message, "error"); }
    finally { setIsProcessing(false); }
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

  const handleStartMoveCopy = (e, item, action) => {
    if(e) e.stopPropagation();
    setClipboard({ item, action });
    setActiveMenu(null);
  };

  const handleShareLink = (e, item) => {
    if(e) e.stopPropagation();
    navigator.clipboard.writeText(item.url);
    showToast("Shareable link copied!");
    setActiveMenu(null);
  };

  // --- RESPONSIVE JSX ---
  return (
    <section className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 min-h-[85vh] flex flex-col font-sans relative overflow-x-hidden">
      
      {/* 🌟 Toast - Position fixed by its own component */}
      <Toast toast={toast} />

      {/* Toolbar - Responsive spacing */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <LibraryToolbar 
          folderHistory={folderHistory} 
          handleGoBack={handleGoBack} 
          openModal={openModal} 
          isAdmin={isAdmin} 
          clipboard={clipboard} 
          handlePaste={handlePaste} 
          setClipboard={setClipboard} 
        />
      </div>

      <main className="flex-1 relative w-full">
        {!currentUser && (
          <LoginOverlay 
            icon="fa-solid fa-lock" 
            title="Access Restricted" 
            description="Unlock the wisdom inside. Join Beyond the Verse." 
          />
        )}
        
        <div className={`transition-all duration-300 h-full ${!currentUser ? "pointer-events-none opacity-20 blur-sm select-none" : ""}`}>
          {isLoading ? (
            <div className="absolute inset-0 flex justify-center items-center flex-col gap-4 min-h-[40vh]">
              <i className="fa-solid fa-spinner fa-spin text-3xl sm:text-4xl text-teal-600"></i>
              <p className="text-slate-400 text-sm sm:text-base font-medium animate-pulse tracking-wide">Fetching wisdom...</p>
            </div>
          ) : currentItems.length === 0 ? (
            <div className="py-12 sm:py-20">
              <LibraryEmptyState openModal={openModal} isAdmin={isAdmin} />
            </div>
          ) : (
            /* 🌟 RESPONSIVE GRID SYSTEM 🌟 */
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-5 lg:gap-6 mt-2">
              {currentItems.map((item) => (
                <LibraryItemCard 
                  key={item.id} 
                  item={item} 
                  handleOpenFolder={handleOpenFolder} 
                  activeMenu={activeMenu} 
                  setActiveMenu={setActiveMenu} 
                  handleRename={handleRename} 
                  handleDelete={handleDelete} 
                  isAdmin={isAdmin} 
                  handleStartMoveCopy={handleStartMoveCopy} 
                  handleShare={handleShareLink}
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