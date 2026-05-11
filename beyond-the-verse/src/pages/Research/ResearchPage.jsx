import React, { useState, useEffect, useMemo } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import ResearchHeader from "../../components/Research/ResearchHeader";
import ResearchForm from "../../components/Research/ResearchForm";
import ResearchList from "../../components/Research/ResearchList";
import ResearchFilter from "../../components/Research/ResearchFilter";
import ResearchSearch from "../../components/Research/ResearchSearch";
import { useAuth } from "../../context/AuthContext";
import {
  getResearchReadTime,
  getResearchSources,
  getResearchTags,
  getResearchTimestamp,
} from "../../components/Research/researchUtils";

const ResearchPage = ({ showToast }) => {
  const [researches, setResearches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState(null);
  const [sortMode, setSortMode] = useState("newest");
  const [viewMode, setViewMode] = useState("cards");
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "researches"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const researchList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResearches(researchList);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error loading researches:", error);
        if (showToast) showToast("Failed to load research library.", false);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [showToast]);

  const fields = useMemo(() => {
    const counts = researches.reduce((acc, research) => {
      const field = research.field || "General";
      acc[field] = (acc[field] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [researches]);

  const stats = useMemo(() => {
    const totalSources = researches.reduce(
      (sum, research) => sum + getResearchSources(research).length,
      0
    );
    const totalAuthors = new Set(
      researches
        .map((research) => research.authorId || research.authorName)
        .filter(Boolean)
    ).size;

    return {
      totalResearches: researches.length,
      totalFields: fields.length,
      totalSources,
      totalAuthors,
    };
  }, [fields.length, researches]);

  const filteredResearches = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = researches.filter((res) => {
      const searchableText = [
        res.title,
        res.abstract,
        res.body,
        res.field,
        res.authorName,
        ...getResearchSources(res),
        ...getResearchTags(res),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = normalizedQuery
        ? searchableText.includes(normalizedQuery)
        : true;
      const matchesField = selectedField
        ? (res.field || "General") === selectedField
        : true;

      return matchesSearch && matchesField;
    });

    return [...filtered].sort((a, b) => {
      if (sortMode === "oldest")
        return getResearchTimestamp(a) - getResearchTimestamp(b);
      if (sortMode === "title")
        return (a.title || "").localeCompare(b.title || "");
      if (sortMode === "sources")
        return getResearchSources(b).length - getResearchSources(a).length;
      if (sortMode === "readTime")
        return getResearchReadTime(a) - getResearchReadTime(b);
      return getResearchTimestamp(b) - getResearchTimestamp(a);
    });
  }, [researches, searchQuery, selectedField, sortMode]);

  return (
    // Mobile: Pure white background (app-like). Desktop: Slate-50 for depth.
    <div className="min-h-screen bg-white pb-24 transition-colors duration-300 sm:bg-slate-50 sm:pb-20 sm:pt-6">
      
      <div className="mx-auto max-w-screen-xl space-y-6 sm:px-6 lg:px-8">
        
        {/* HEADER: Handles its own edge-to-edge layout inside */}
        <ResearchHeader stats={stats} />

        {/* ADMIN FORM: Padding applied on mobile so it doesn't hit edges */}
        {isAdmin && (
          <div>
            <ResearchForm showToast={showToast} />
          </div>
        )}

        {/* TOP TOOLBAR: Mobile-Native Frosted Glass Sticky Nav */}
        <section className="sticky top-0 z-40 -mt-2 flex flex-col gap-3 border-b border-slate-100 bg-white/80 px-4 py-3 pb-4 backdrop-blur-xl sm:static sm:mt-0 sm:gap-4 sm:border-none sm:bg-transparent sm:px-0 sm:py-0 sm:pb-0 sm:backdrop-blur-none">
          <ResearchSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortMode={sortMode}
            setSortMode={setSortMode}
            viewMode={viewMode}
            setViewMode={setViewMode}
            resultCount={filteredResearches.length}
          />
          <ResearchFilter
            fields={fields}
            selectedField={selectedField}
            onSelectField={setSelectedField}
          />
        </section>

        {/* MAIN LIST: px-4 on mobile matches the -mx-4 in ResearchList for edge-to-edge compact view */}
        <main className="px-4 sm:px-0">
          {isLoading ? (
            // Native-style loading state
            <div className="flex flex-col items-center justify-center py-[15vh] text-teal-600">
              <i className="fa-solid fa-circle-notch fa-spin text-3xl sm:text-4xl"></i>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Syncing Archive
              </p>
            </div>
          ) : (
            <ResearchList
              researches={filteredResearches}
              viewMode={viewMode}
              selectedField={selectedField}
              searchQuery={searchQuery}
            />
          )}
        </main>

      </div>
    </div>
  );
};

export default ResearchPage;