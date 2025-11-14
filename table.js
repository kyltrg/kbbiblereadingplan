let username = localStorage.getItem('username');
let selectedPhase = localStorage.getItem('selectedPhase');

fetch('data/readingPlan.json')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#verseTable tbody');
    const verses = data[selectedPhase];

    verses.forEach((v, index) => {
      let tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${v.day}</td>
        <td>${v.verse}</td>
        <td id="status-${index}">❌</td>
        <td><button onclick="readVerse(${index})">Read Now!</button></td>
      `;
      tbody.appendChild(tr);
    });

    localStorage.setItem('currentVerses', JSON.stringify(verses));
  });

function readVerse(index){
  localStorage.setItem('currentVerseIndex', index);
  window.location.href = 'read.html';
}
