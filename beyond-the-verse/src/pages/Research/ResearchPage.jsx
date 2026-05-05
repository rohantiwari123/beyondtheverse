import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import ResearchHeader from '../../components/Research/ResearchHeader';
import ResearchForm from '../../components/Research/ResearchForm';
import ResearchList from '../../components/Research/ResearchList';
import ResearchFilter from '../../components/Research/ResearchFilter';
import ResearchSearch from '../../components/Research/ResearchSearch';
import { useAuth } from '../../context/AuthContext';

const ResearchPage = ({ showToast }) => {
  const [researches, setResearches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'researches'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const researchList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setResearches(researchList);
    });

    return () => unsubscribe();
  }, []);

  const fields = useMemo(() => {
    const allFields = researches.map(r => r.field).filter(Boolean);
    return [...new Set(allFields)];
  }, [researches]);

  const filteredResearches = useMemo(() => {
    return researches.filter(res => {
      const matchesSearch = 
        res.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        res.body?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.field?.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesField = selectedField ? res.field === selectedField : true;

      return matchesSearch && matchesField;
    });
  }, [researches, searchQuery, selectedField]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 mt-6">
      <ResearchHeader />
      {isAdmin && <ResearchForm showToast={showToast} />}
      
      <div className="mb-8">
        <ResearchSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ResearchFilter 
          fields={fields} 
          selectedField={selectedField} 
          onSelectField={setSelectedField} 
        />
      </div>

      <ResearchList researches={filteredResearches} />
    </div>
  );
};

export default ResearchPage;