import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import ResearchHeader from '../../components/Research/ResearchHeader';
import ResearchForm from '../../components/Research/ResearchForm';
import ResearchList from '../../components/Research/ResearchList';
import ResearchFilter from '../../components/Research/ResearchFilter';
import ResearchSearch from '../../components/Research/ResearchSearch';
import { useAuth } from '../../context/AuthContext';
import { getResearchReadTime, getResearchSources, getResearchTags, getResearchTimestamp } from '../../components/Research/researchUtils';

const ResearchPage = ({ showToast }) => {
  const [researches, setResearches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState(null);
  const [sortMode, setSortMode] = useState('newest');
  const [viewMode, setViewMode] = useState('cards');
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'researches'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const researchList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setResearches(researchList);
      setIsLoading(false);
    }, (error) => {
      console.error('Error loading researches:', error);
      if (showToast) showToast('Failed to load research library.', false);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [showToast]);

  const fields = useMemo(() => {
    const counts = researches.reduce((acc, research) => {
      const field = research.field || 'General';
      acc[field] = (acc[field] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [researches]);

  const stats = useMemo(() => {
    const totalSources = researches.reduce((sum, research) => sum + getResearchSources(research).length, 0);
    const totalAuthors = new Set(researches.map(research => research.authorId || research.authorName).filter(Boolean)).size;

    return {
      totalResearches: researches.length,
      totalFields: fields.length,
      totalSources,
      totalAuthors
    };
  }, [fields.length, researches]);

  const filteredResearches = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = researches.filter(res => {
      const searchableText = [
        res.title,
        res.abstract,
        res.body,
        res.field,
        res.authorName,
        ...getResearchSources(res),
        ...getResearchTags(res)
      ].filter(Boolean).join(' ').toLowerCase();

      const matchesSearch = normalizedQuery ? searchableText.includes(normalizedQuery) : true;
      const matchesField = selectedField ? (res.field || 'General') === selectedField : true;

      return matchesSearch && matchesField;
    });

    return [...filtered].sort((a, b) => {
      if (sortMode === 'oldest') return getResearchTimestamp(a) - getResearchTimestamp(b);
      if (sortMode === 'title') return (a.title || '').localeCompare(b.title || '');
      if (sortMode === 'sources') return getResearchSources(b).length - getResearchSources(a).length;
      if (sortMode === 'readTime') return getResearchReadTime(a) - getResearchReadTime(b);
      return getResearchTimestamp(b) - getResearchTimestamp(a);
    });
  }, [researches, searchQuery, selectedField, sortMode]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-0 sm:pt-6">
      <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
        
        {/* Header touches edges on mobile, rounded on desktop */}
        <ResearchHeader stats={stats} />

        {isAdmin && (
          <div className="px-4 sm:px-0">
            <ResearchForm showToast={showToast} />
          </div>
        )}

        {/* TOP TOOLBAR: Search and Filters stacked neatly */}
        <section className="sticky top-0 z-30 flex flex-col gap-2 bg-slate-50/95 px-4 py-3 backdrop-blur-md sm:static sm:gap-4 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
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

        {/* FULL WIDTH LIST: Cards will now stretch and fill the space better */}
        <main className="px-4 sm:px-0">
          {isLoading ? (
            <div className="flex justify-center py-20 text-teal-600">
              <i className="fa-solid fa-circle-notch fa-spin text-4xl"></i>
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