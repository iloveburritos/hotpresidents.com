import assert from 'assert';
import { shuffle } from '../lib/shuffle';

const original = [1, 2, 3, 4];
const result = shuffle(original);

assert.notStrictEqual(result, original, 'Shuffled array should not be the same reference as original');
assert.deepStrictEqual([...result].sort(), [...original].sort(), 'Shuffled array should contain the same elements as original');

console.log('shuffle test passed');

