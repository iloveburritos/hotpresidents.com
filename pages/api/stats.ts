// pages/api/stats.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        // Set minimal caching to ensure fresh data
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        
        const { id } = req.query;  // Get id from query params
        
        try {
            const docRef = doc(db, 'hotpresidents', id as string);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                res.status(200).json({ hot: data.hot, not: data.not });
            } else {
                res.status(404).json({ error: 'President not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching stats' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
