// lib/presidents.ts
import presidentsData from '../data/presidents.json';
import { President } from '../models/presidents';
import { shuffle } from './shuffle';

export function fetchPresidents(): President[] {
  return presidentsData;
}

export function fetchPresidentShortname(shortname: string): President | undefined {
  return presidentsData.find(president => president.shortname === shortname);
}

export function fetchRandomPresident(excludeId?: string): President {
  const availablePresidents = excludeId
    ? presidentsData.filter(president => president.id !== excludeId)
    : presidentsData;
  return shuffle(availablePresidents)[0];
}

export function fetchNextPresident(currentShortname: string): President {
  const currentIndex = presidentsData.findIndex(president => president.shortname === currentShortname);
  const nextIndex = (currentIndex + 1) % presidentsData.length;
  return presidentsData[nextIndex];
}