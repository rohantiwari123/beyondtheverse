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

  const featuredResearch = filteredResearches[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-2 sm:pt-8">
      <div className="mx-auto max-w-6xl space-y-6 px-4 sm:space-y-8">
        <ResearchHeader stats={stats} />

        {isAdmin && <ResearchForm showToast={showToast} />}

        <section className="grid gap-4 lg:grid-cols-[1fr_280px] lg:items-start">
          <div className="space-y-4">
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
          </div>

          <aside className="hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm lg:block">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">Discovery Pulse</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-teal-50 p-4">
                <div className="font-cabinet text-3xl font-black text-teal-700">{stats.totalAuthors}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-teal-700/70">Contributors</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="font-cabinet text-3xl font-black text-slate-900">{featuredResearch ? getResearchReadTime(featuredResearch) : 0}m</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Featured read</div>
              </div>
            </div>
          </aside>
        </section>

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
      </div>
    </div>
  );
};

export default ResearchPage;
