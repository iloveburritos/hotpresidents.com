import presidents from '../../data/presidents.json';

/**
 * Select a president that has not been shown previously.
 * If all presidents have been shown, reset the pool before selecting again.
 * @param {string[]} previousPresidents list of previously shown president IDs
 * @returns {object} The selected president object
 */
export default function getNextPresident(previousPresidents = []) {
  const available = presidents.filter(p => !previousPresidents.includes(p.id));
  const pool = available.length > 0 ? available : presidents;
  const selected = pool[Math.floor(Math.random() * pool.length)];
  return selected;
}
