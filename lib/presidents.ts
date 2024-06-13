// lib/presidents.ts
import fs from 'fs';
import path from 'path';
import { President } from '../models/presidents';
import { shuffleArray } from './shuffle';

const jsonFilePath = path.join(process.cwd(), 'data', 'presidents.json');

let shuffledPresidents: President[] = [];
let currentIndex = 0;

export const fetchPresidents = (): President[] => {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    return JSON.parse(jsonData);
};

export const fetchPresidentId = (id: string): President | undefined => {
    const presidents = fetchPresidents();
    return presidents.find((president) => president.id === id);
};

export const fetchPresidentShortname = (shortname: string): President | undefined => {
    const presidents = fetchPresidents();
    return presidents.find((president) => president.shortname === shortname);
};

export const fetchRandomPresident = (currentPresidentId?: string): President | undefined => {
    const presidents = fetchPresidents();
    if (presidents.length === 0) return undefined;

    if (shuffledPresidents.length === 0) {
        shuffledPresidents = shuffleArray([...presidents]);
    }

    // Ensure the next president is different from the current one
    let nextPresident = shuffledPresidents[currentIndex];
    currentIndex = (currentIndex + 1) % shuffledPresidents.length;

    if (nextPresident.id === currentPresidentId) {
        // If the next president is the same as the current one, get another one
        nextPresident = shuffledPresidents[currentIndex];
        currentIndex = (currentIndex + 1) % shuffledPresidents.length;
    }

    return nextPresident;
};
