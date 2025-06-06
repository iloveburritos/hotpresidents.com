// hooks/usePresidentStats.ts
import { useState, useEffect } from 'react';
import { President } from '../models/presidents';

export const usePresidentStats = (president: President) => {
    const [hot, setHot] = useState<number>(0);
    const [not, setNot] = useState<number>(0);

    useEffect(() => {
        // TODO: implement stats fetching
    }, [president.id]);

    return { hot, not };
};