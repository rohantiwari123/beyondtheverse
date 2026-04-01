import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase'; // Sahi path check kar lena
import { useAuth } from '../../context/AuthContext'; // Sahi path check kar lena

export default function VaultPage() {
  const { userId } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      // Agar user logged in nahi hai ya ID nahi mili toh aage mat badho
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // Firebase se sirf is user ke results nikalna (Naye wale sabse upar)
       // 🌟 WAPAS ORIGINAL CODE LAGAYEIN 🌟
const q = query(
  collection(db, "exam_results"),
  where("userId", "==", userId),
  orderBy("submittedAt", "desc")
);
        const querySnapshot = await getDocs(q);
        
        const list = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        
        setResults(list);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
        <i className="fa-solid fa-vault text-teal-600"></i> Your Knowledge Vault
      </h1>

      {results.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-slate-200 text-center text-slate-500">
          <i className="fa-solid fa-ghost text-4xl mb-4 text-slate-300"></i>
          <p className="font-bold text-lg">Abhi tak koi Mind Trial submit nahi kiya hai.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {results.map((res) => (
            <div key={res.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
              
              <div>
                <h3 className="text-xl font-bold text-slate-800">{res.examTitle}</h3>
                
                {/* Date rendering safely */}
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                  <i className="fa-regular fa-calendar"></i>
                  {res.submittedAt?.toDate ? res.submittedAt.toDate().toLocaleDateString() : "Just now"}
                </p>
              </div>
              
              <div className="text-right bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100">
                <div className={`text-4xl font-black ${res.totalScore >= 0 ? 'text-teal-500' : 'text-rose-500'}`}>
                  {res.totalScore}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                  Total Score
                </div>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}