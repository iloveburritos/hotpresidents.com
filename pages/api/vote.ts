// pages/api/vote.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

const vote = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, voteType } = req.body;

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
        return;
    }

    if (!id || !voteType || (voteType !== 'hot' && voteType !== 'not')) {
        res.status(400).json({ error: 'Missing or invalid id or vote type' });
        return;
    }

    const voteRef = doc(db, 'hotpresidents', id);

    try {
        await updateDoc(voteRef, {
            [voteType]: increment(1),
        });
        res.status(200).json({ success: true, message: `Voted ${voteType} for ${id}` });
    } catch (error) {
        console.error('Error updating Firebase record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default vote;
