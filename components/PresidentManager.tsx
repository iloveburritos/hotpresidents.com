'use client';

import { useEffect, useState } from 'react';
import { President } from '../models/presidents';

const STORAGE_KEY = 'presidentViewOrder';

export function usePresidentManager(currentId?: string) {
    const [nextPresident, setNextPresident] = useState<President | null>(null);

    function getViewOrder(): string[] {
        const stored = window.sessionStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    function setViewOrder(order: string[]) {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    }

    function getNextPresident(presidentsData: President[], excludeId?: string): President {
        let viewOrder = getViewOrder();
        
        if (viewOrder.length === 0) {
            viewOrder = [...presidentsData]
                .sort(() => Math.random() - 0.5)
                .map(p => p.shortname);
            setViewOrder(viewOrder);
        }

        // Find next valid president
        while (viewOrder.length > 0) {
            const nextShortname = viewOrder[0];
            viewOrder = viewOrder.slice(1);
            
            const candidate = presidentsData.find(p => p.shortname === nextShortname);
            if (candidate && candidate.id !== excludeId) {
                setViewOrder(viewOrder);
                return candidate;
            }
        }

        // If we've seen all presidents, start over
        setViewOrder([]);
        return getNextPresident(presidentsData, excludeId);
    }

    return { nextPresident, getNextPresident };
}