// pages/api/rankings.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { fetchPresidents } from '../../lib/presidents';

interface PresidentRanking {
    id: string;
    name: string;
    shortname: string;
    imageURL: string;
    hot: number;
    not: number;
    delta: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        
        try {
            const presidents = fetchPresidents();
            const statsCollection = collection(db, 'hotpresidents');
            const statsSnapshot = await getDocs(statsCollection);
            
            const rankings: PresidentRanking[] = [];
            
            for (const president of presidents) {
                const statsDoc = statsSnapshot.docs.find(doc => doc.id === president.id);
                const stats = statsDoc?.data() || { hot: 0, not: 0 };
                
                const hot = stats.hot || 0;
                const not = stats.not || 0;
                const delta = hot - not;
                
                rankings.push({
                    id: president.id,
                    name: president.name,
                    shortname: president.shortname,
                    imageURL: president.imageURL,
                    hot,
                    not,
                    delta
                });
            }
            
            // Sort by delta (highest to lowest)
            rankings.sort((a, b) => b.delta - a.delta);
            
            res.status(200).json(rankings);
        } catch (error) {
            console.error('Error fetching rankings:', error);
            res.status(500).json({ error: 'Error fetching rankings' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;