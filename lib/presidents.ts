// lib/presidents.ts
import presidentsData from '../data/presidents.json';
import { shuffle } from './shuffle';
import { President } from '../models/presidents';

const RECENTLY_VIEWED_LIMIT_PERCENTAGE = 0.2; // 20% of total presidents

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
        recentlyViewed = [shortname, ...recentlyViewed.filter(sn => sn !== shortname)];
        
        // Dynamically calculate limit based on the current number of presidents
        const recentlyViewedLimit = Math.floor(presidentsData.length * RECENTLY_VIEWED_LIMIT_PERCENTAGE);
        if (recentlyViewed.length > recentlyViewedLimit) {
            recentlyViewed.pop(); // Remove the oldest entry
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

    // Refresh if all presidents have been viewed recently
    if (recentlyViewed.length >= presidentsData.length) {
        resetRecentlyViewed();
    }

    // Filter out the recently viewed presidents and excluded president (if any)
    const availablePresidents = presidentsData.filter(president => 
        !recentlyViewed.includes(president.shortname) && president.id !== excludeId
    );

    // If all have been viewed, re-shuffle the entire list
    const presidentsPool = availablePresidents.length ? availablePresidents : presidentsData;
    const randomPresident = shuffle(presidentsPool)[0];
    
    // Add the selected president to the recently viewed list
    addRecentlyViewed(randomPresident.shortname);

    return randomPresident;
}