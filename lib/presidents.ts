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
        
        // Remove the president if they're already in the list
        const filteredList = recentlyViewed.filter(sn => sn !== shortname);
        
        // Add to front of list
        filteredList.unshift(shortname);
        
        window.sessionStorage.setItem('recentlyViewedPresidents', JSON.stringify(filteredList));
    }
}

function resetRecentlyViewed() {
    if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem('recentlyViewedPresidents');
    }
}

export function fetchRandomPresident(excludeId?: string): President {
    const recentlyViewed = getRecentlyViewed();
    
    // Get all presidents except the excluded one
    let availablePresidents = presidentsData.filter(president => 
        president.id !== excludeId
    );

    // Sort presidents by how recently they were viewed
    availablePresidents.sort((a, b) => {
        const aIndex = recentlyViewed.indexOf(a.shortname);
        const bIndex = recentlyViewed.indexOf(b.shortname);
        
        // If neither was viewed recently, randomize their order
        if (aIndex === -1 && bIndex === -1) {
            return Math.random() - 0.5;
        }
        
        // If only one was viewed recently, prioritize the unviewed one
        if (aIndex === -1) return -1;
        if (bIndex === -1) return 1;
        
        // If both were viewed, prefer the one viewed longer ago
        return bIndex - aIndex;
    });

    // Take the first president after sorting (least recently viewed)
    const selectedPresident = availablePresidents[0];
    
    // Add to recently viewed list
    addRecentlyViewed(selectedPresident.shortname);

    // If we've seen all presidents, reset the list but keep the current one
    if (recentlyViewed.length >= presidentsData.length - 1) {
        resetRecentlyViewed();
        addRecentlyViewed(selectedPresident.shortname);
    }

    return selectedPresident;
}