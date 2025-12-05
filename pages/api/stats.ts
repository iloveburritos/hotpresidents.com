// pages/api/stats.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../lib/firebase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        // Cache for 60s on CDN, serve stale while revalidating for 5 min
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

        const { id } = req.query;  // Get id from query params

        try {
            const db = await getDb();
            const { doc, getDoc } = await import('firebase/firestore');
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
