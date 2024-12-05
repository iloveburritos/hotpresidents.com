// lib/presidents.ts
import presidentsData from '../data/presidents.json';
import { shuffle } from './shuffle';
import { President } from '../models/presidents';

const STORAGE_KEY = 'presidentViewOrder';

export function fetchPresidents(): President[] {
    return presidentsData;
}

export function fetchPresidentShortname(shortname: string): President | undefined {
    return presidentsData.find(president => president.shortname === shortname);
}

function getViewOrder(): string[] {
    if (typeof window === 'undefined') return [];
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function setViewOrder(order: string[]) {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

function generateNewOrder(): string[] {
    return shuffle([...presidentsData]).map(p => p.shortname);
}

export function fetchRandomPresident(excludeId?: string): President {
    let viewOrder = getViewOrder();
    
    // If we're at the end or haven't started, generate new shuffled order
    if (viewOrder.length === 0) {
        viewOrder = generateNewOrder();
        setViewOrder(viewOrder);
    }

    // Find the next valid president
    let nextPresident: President | undefined;
    while (viewOrder.length > 0 && !nextPresident) {
        const nextShortname = viewOrder[0];
        const candidate = presidentsData.find(p => p.shortname === nextShortname);
        
        if (candidate && candidate.id !== excludeId) {
            nextPresident = candidate;
        }
        // Remove this president from the order regardless
        viewOrder = viewOrder.slice(1);
    }

    // If we couldn't find a valid president, generate new order and try again
    if (!nextPresident) {
        setViewOrder([]);
        return fetchRandomPresident(excludeId);
    }

    // Save the updated order
    setViewOrder(viewOrder);
    return nextPresident;
}