// lib/presidents.ts
import presidentsData from '../data/presidents.json';
import { shuffle } from './shuffle';
import { President } from '../models/presidents';

export function fetchPresidents(): President[] {
    return presidentsData;
}

export function fetchPresidentShortname(shortname: string): President | undefined {
    return presidentsData.find(president => president.shortname === shortname);
}

function getRecentlyViewed(): string[] {
    if (typeof window !== 'undefined') {
        const recentlyViewed = window.sessionStorage.getItem('recentlyViewedPresidents');
        return recentlyViewed ? JSON.parse(recentlyViewed) : [];
    }
    return [];
}

function addRecentlyViewed(shortname: string) {
    if (typeof window !== 'undefined') {
        const recentlyViewed = getRecentlyViewed();
        if (!recentlyViewed.includes(shortname)) {
            recentlyViewed.push(shortname);
            window.sessionStorage.setItem('recentlyViewedPresidents', JSON.stringify(recentlyViewed));
        }
    }
}

function resetRecentlyViewed() {
    if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem('recentlyViewedPresidents');
    }
}

export function fetchRandomPresident(excludeId?: string): President {
    const recentlyViewed = getRecentlyViewed();
    
    // Get unviewed presidents (excluding current)
    const unviewedPresidents = presidentsData.filter(president => 
        !recentlyViewed.includes(president.shortname) && 
        president.id !== excludeId
    );

    // If we've seen all presidents, reset the list
    if (unviewedPresidents.length === 0) {
        resetRecentlyViewed();
        return fetchRandomPresident(excludeId);
    }

    // Get a random unviewed president
    const randomPresident = shuffle(unviewedPresidents)[0];
    addRecentlyViewed(randomPresident.shortname);
    
    return randomPresident;
}