import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // 🌟 Auth Context (Ensure path is correct)
import { 
  subscribeToLibraryItems, 
  createLibraryFolder, 
  uploadLibraryFile, 
  renameLibraryItem, 
  deleteLibraryItem 
} from "../../services/firebaseServices"; // 🌟 Firebase Services Import

import LibraryToolbar from "./LibraryToolbar";
import LibraryEmptyState from "./LibraryEmptyState";
import LibraryItemCard from "./LibraryItemCard";
import LibraryModal from "./LibraryModal";

export default function LibrarySection() {
  const { isAdmin } = useAuth(); // 🌟 Sirf Admin ko add/delete permissions dikhane ke liye

  // 🌟 REAL FIREBASE STATE
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false); // Uploading state

  const [currentFolder, setCurrentFolder] = useState("root");
  const [folderHistory, setFolderHistory] = useState([{ id: "root", name: "Library" }]);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Menu State
  const [activeMenu, setActiveMenu] = useState(null);

  const currentItems = items.filter((item) => item.parentId === currentFolder);

  // 🌟 1. REAL-TIME LISTENER (Fetch Data)
  useEffect(() => {
    const unsubscribe = subscribeToLibraryItems((fetchedItems) => {
      setItems(fetchedItems);
      setIsLoading(false);
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Navigation Logic
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

  // 🌟 2. CREATE FOLDER / SAVE PDF LINK (Firebase)
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    
    // Naya Validation: Dono (folder aur file) ke liye naam chahiye, aur file me link (selectedFile)
    if (!newItemName.trim()) return;
    if (modalType === "file" && !selectedFile) return;

    setIsProcessing(true); // 🌟 Spinner Chalu
    console.log("🚀 Starting process...");

    try {
      if (modalType === "folder") {
        console.log("📂 Creating folder:", newItemName);
        await createLibraryFolder(newItemName, currentFolder);
      } else {
        // 🌟 Yahan selectedFile ab URL (link) hai, aur newItemName PDF ka naam hai
        console.log("📄 Saving PDF Link:", newItemName);
        await uploadLibraryFile(selectedFile, currentFolder, newItemName);
        console.log("✅ PDF Link Saved Successfully!");
      }
      closeModal(); // Save hone ke baad modal band
    } catch (error) {
      console.error("❌ Action Failed:", error);
      alert("Error: " + error.message);
    } finally {
      setIsProcessing(false); // 🌟 Spinner Band (Chahe pass ho ya fail)
      console.log("🛑 Process Finished. Spinner stopped.");
    }
  };

  // 🌟 3. DELETE LOGIC (Firebase)
  const handleDelete = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    
    if(window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      setActiveMenu(null);
      try {
        await deleteLibraryItem(item); // Storage + Firestore dono se delete
      } catch (error) {
        alert("Delete failed: " + error.message);
      }
    }
  };

  // 🌟 4. RENAME LOGIC (Firebase)
  const handleRename = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newName = prompt("Enter new name:", item.name);
    if (newName && newName.trim() !== "" && newName !== item.name) {
      setActiveMenu(null);
      try {
        await renameLibraryItem(item.id, newName);
      } catch (error) {
        alert("Rename failed: " + error.message);
      }
    } else {
      setActiveMenu(null);
    }
  };

  // 🌟 5. SHARE LOGIC (Copy URL)
  const handleShare = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (item.type === "file" && item.url) {
      navigator.clipboard.writeText(item.url);
      alert("PDF Link copied to clipboard!");
    } else {
      alert("Open the folder and share its contents.");
    }
    setActiveMenu(null);
  };

  // Modal Handlers
  const openModal = (type) => {
    if (!isAdmin) return alert("Only admins can do this.");
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewItemName("");
    setSelectedFile(null);
  };

  return (
    <section className="w-full max-w-7xl mx-auto pt-4 pb-12 sm:py-8 lg:py-12 min-h-[80vh] flex flex-col font-sans">

      {/* Toolbar Component */}
      <LibraryToolbar
        folderHistory={folderHistory}
        handleGoBack={handleGoBack}
        openModal={openModal}
        isAdmin={isAdmin} // Pass isAdmin to hide buttons if normal user
      />

      {/* Invisible overlay for closing dropdown menus */}
      {activeMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)} aria-hidden="true"></div>
      )}

      {/* Content Area */}
      <main className="w-full sm:px-6 lg:px-8 flex-1 outline-none" tabIndex={-1}>
        
        {isLoading ? (
          // 🌟 LOADING SPINNER
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
                isAdmin={isAdmin} // Pass isAdmin to hide 3-dots for normal users
              />
            ))}
          </div>

        )}
      </main>

      {/* Modal Component */}
      <LibraryModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalType={modalType}
        handleCreateSubmit={handleCreateSubmit}
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        isProcessing={isProcessing} // To show loading state on button
      />

    </section>
  );
          }
