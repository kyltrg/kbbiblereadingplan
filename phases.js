document.getElementById('startPhase').addEventListener('click', () => {
  const selectedPhase = document.getElementById('phaseSelect').value;
  localStorage.setItem('selectedPhase', selectedPhase);
  window.location.href = 'table.html';
});
