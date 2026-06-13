import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalSearch } from '../../services/searchService';

export default function GlobalSearch({ isMobileExpanded, onSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Auto-focus input when expanded on mobile
    useEffect(() => {
        if (isMobileExpanded && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 300);
        } else {
            setSearchTerm('');
            setIsOpen(false);
        }
    }, [isMobileExpanded]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm.trim().length >= 2) {
                setIsLoading(true);
                setIsOpen(true);
                const data = await globalSearch(searchTerm);
                setResults(data);
                setIsLoading(false);
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleSelect = (link) => {
        setSearchTerm('');
        setIsOpen(false);
        if (onSelect) onSelect();
        navigate(link);
    };

    const getIcon = (type) => {
        switch (type) {
            case 'user': return 'fa-user';
            case 'post': return 'fa-comment-dots';
            case 'research': return 'fa-microscope';
            case 'library': return 'fa-book';
            default: return 'fa-magnifying-glass';
        }
    };

    return (
        <div className={`relative flex-1 ${isMobileExpanded ? 'w-full mx-0' : 'max-w-md mx-4 hidden md:block'} transition-all duration-300`} ref={searchRef}>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className={`fa-solid fa-magnifying-glass text-xs transition-colors ${searchTerm ? 'text-teal-500' : 'text-slate-400 group-focus-within:text-teal-500'}`}></i>
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    className="block w-full pl-9 pr-3 py-2 bg-slate-100/50 border border-transparent rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500/50 transition-all"
                    placeholder="Search Verse, People, Research..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => searchTerm.trim().length >= 2 && setIsOpen(true)}
                />
                {isSearching && (
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        <i className="fa-solid fa-circle-notch fa-spin text-teal-500 text-[10px]"></i>
                    </div>
                )}
            </div>

            {isOpen && (
                <div className={`absolute mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-2xl z-[150] overflow-hidden animate-fade-in origin-top ${isMobileExpanded ? 'fixed left-0 right-0 mx-4 w-auto top-14' : ''}`}>
                    <div className="p-2">
                        {results.length > 0 ? (
                            <div className="max-h-[60vh] overflow-y-auto no-scrollbar space-y-0.5">
                                {results.map((item) => (
                                    <div
                                        key={`${item.type}-${item.id}`}
                                        onClick={() => handleSelect(item.link)}
                                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${item.type === 'user' ? 'bg-teal-50 text-teal-600 border-teal-100' : 'bg-slate-50 text-slate-400 border-slate-100 group-hover:border-teal-200 group-hover:text-teal-500'}`}>
                                            {item.image ? (
                                                <img src={item.image} alt="" className="w-full h-full rounded-lg object-cover" />
                                            ) : (
                                                <i className={`fa-solid ${getIcon(item.type)} text-[10px]`}></i>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[13px] font-bold text-slate-800 truncate leading-tight">{item.title}</p>
                                            <p className="text-[10px] text-slate-500 truncate mt-0.5 uppercase tracking-wider">{item.subtitle}</p>
                                        </div>
                                        <div className="text-[10px] font-black text-slate-300 group-hover:text-teal-400 transition-colors px-2">
                                            {item.type.toUpperCase()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <i className="fa-solid fa-magnifying-glass text-slate-300"></i>
                                </div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No results found in the Verse</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
