import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../firebase';

export const globalSearch = async (searchTerm) => {
    if (!searchTerm || searchTerm.trim().length < 2) return [];
    
    const term = searchTerm.toLowerCase().trim();
    const results = [];

    try {
        // 1. Search Users (by name or username)
        const usersRef = collection(db, 'users');
        const usersSnap = await getDocs(query(usersRef, limit(20))); // Get some users to filter client-side for better match
        usersSnap.forEach(doc => {
            const data = doc.data();
            if (data.name?.toLowerCase().includes(term) || data.username?.toLowerCase().includes(term)) {
                results.push({
                    id: doc.id,
                    type: 'user',
                    title: data.name || data.username,
                    subtitle: `@${data.username}`,
                    image: data.profilePic || null,
                    link: `/profile/${doc.id}`
                });
            }
        });

        // 2. Search Posts (by content or title)
        const postsRef = collection(db, 'posts');
        const postsSnap = await getDocs(query(postsRef, limit(30)));
        postsSnap.forEach(doc => {
            const data = doc.data();
            if (data.content?.toLowerCase().includes(term) || data.title?.toLowerCase().includes(term)) {
                results.push({
                    id: doc.id,
                    type: 'post',
                    title: data.title || 'Community Post',
                    subtitle: data.content?.substring(0, 60) + '...',
                    link: `/community/post/${doc.id}`
                });
            }
        });

        // 3. Search Research Papers
        const researchRef = collection(db, 'researches');
        const researchSnap = await getDocs(query(researchRef, limit(20)));
        researchSnap.forEach(doc => {
            const data = doc.data();
            if (data.title?.toLowerCase().includes(term) || data.abstract?.toLowerCase().includes(term)) {
                results.push({
                    id: doc.id,
                    type: 'research',
                    title: data.title,
                    subtitle: data.abstract?.substring(0, 60) + '...',
                    link: `/research/${doc.id}`
                });
            }
        });

        // 4. Search Library Items
        const libraryRef = collection(db, 'library');
        const librarySnap = await getDocs(query(libraryRef, limit(20)));
        librarySnap.forEach(doc => {
            const data = doc.data();
            if (data.title?.toLowerCase().includes(term) || data.description?.toLowerCase().includes(term)) {
                results.push({
                    id: doc.id,
                    type: 'library',
                    title: data.title,
                    subtitle: data.category || 'Library Item',
                    link: `/library`
                });
            }
        });

        return results.slice(0, 10); // Return top 10 matches
    } catch (error) {
        console.error("Global Search Error:", error);
        return [];
    }
};
