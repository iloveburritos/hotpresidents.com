// lib/presidents.ts
import { President } from '../models/presidents';
import presidentsData from '../data/presidents.json';
import { shuffle } from './shuffle';

const STORAGE_KEY = 'presidentSequence';

// Get/Set sequence from sessionStorage
function getStoredSequence(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setStoredSequence(sequence: string[]) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sequence));
}

// For static paths/props
export function fetchPresidents(): President[] {
  return presidentsData;
}

export function fetchPresidentShortname(shortname: string): President | undefined {
  return presidentsData.find(president => president.shortname === shortname);
}

export function fetchRandomPresident(excludeId?: string): President {
  let sequence = getStoredSequence();
  
  // If sequence is empty, generate new shuffled order
  if (sequence.length === 0) {
    sequence = shuffle([...presidentsData])
      .map(p => p.id)
      .filter(id => id !== excludeId);
    setStoredSequence(sequence);
  }

  // Get next ID and update sequence
  const nextId = sequence[0];
  setStoredSequence(sequence.slice(1));

  const president = presidentsData.find(p => p.id === nextId);
  if (!president) {
    // If president not found, try again
    return fetchRandomPresident(excludeId);
  }

  return president;
}

