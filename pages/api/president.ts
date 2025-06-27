import { NextApiRequest, NextApiResponse } from 'next';
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, shortname } = req.query;

  try {
    let docSnap;

    if (id) {
      // Fetch by ID
      docSnap = await getDoc(doc(db, 'presidents', id as string));
    } else if (shortname) {
      // Fetch by shortname
      const q = query(
        collection(db, 'presidents'), 
        where('shortname', '==', shortname)
      );
      const querySnap = await getDocs(q);
      docSnap = querySnap.docs[0];
    } else {
      return res.status(400).json({ error: 'Missing id or shortname parameter' });
    }

    if (!docSnap?.exists()) {
      return res.status(404).json({ error: 'President not found' });
    }

    res.status(200).json(docSnap.data());
  } catch (error) {
    console.error('Error fetching president:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 