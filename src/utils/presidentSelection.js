function getNextPresident(previousPresidents = []) {
  console.log('Getting next president');
  console.log('Previous presidents:', previousPresidents);
  
  const availablePresidents = presidents.filter(p => !previousPresidents.includes(p.id));
  console.log('Available presidents pool size:', availablePresidents.length);
  
  // Log if we're resetting the pool
  if (availablePresidents.length === 0) {
    console.log('Resetting president pool - all presidents have been shown');
  }

  const selectedPresident = // ... existing selection logic ...
  
  console.log('Selected president:', selectedPresident);
  console.log('New previous presidents array:', [...previousPresidents, selectedPresident.id]);
  
  return selectedPresident;
} 