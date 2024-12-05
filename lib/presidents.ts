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
        let recentlyViewed = getRecentlyViewed();
        // Add new president to front of array if not already present
        if (!recentlyViewed.includes(shortname)) {
            recentlyViewed = [shortname, ...recentlyViewed];
        }
        
        // If we've seen all presidents, reset the list
        if (recentlyViewed.length >= presidentsData.length) {
            recentlyViewed = [shortname];
        }

        window.sessionStorage.setItem('recentlyViewedPresidents', JSON.stringify(recentlyViewed));
    }
}

function resetRecentlyViewed() {
    if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem('recentlyViewedPresidents');
    }
}

export function fetchRandomPresident(excludeId?: string): President {
    const recentlyViewed = getRecentlyViewed();
    
    // Filter out the recently viewed presidents and excluded president (if any)
    const availablePresidents = presidentsData.filter(president => 
        !recentlyViewed.includes(president.shortname) && president.id !== excludeId
    );

    // If no available presidents, reset the list and use all presidents except excluded
    const presidentsPool = availablePresidents.length > 0 
        ? availablePresidents 
        : presidentsData.filter(president => president.id !== excludeId);

    // Get a random president from the available pool
    const randomPresident = shuffle(presidentsPool)[0];
    
    // Add the selected president to the recently viewed list
    addRecentlyViewed(randomPresident.shortname);

    return randomPresident;
}