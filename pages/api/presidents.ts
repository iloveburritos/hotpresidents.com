import { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const querySnap = await getDocs(collection(db, 'presidents'));
    const shortnames = querySnap.docs.map(doc => doc.data().shortname);
    res.status(200).json({ shortnames });
  } catch (error) {
    console.error('Error fetching presidents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 