let verses = JSON.parse(localStorage.getItem('currentVerses'));
let index = parseInt(localStorage.getItem('currentVerseIndex'));
let verse = verses[index];

document.getElementById('verseTitle').innerText = verse.verse;
document.getElementById('verseText').innerText = verse.text;

let minTime = 30; // seconds
let interacted = false;
let startTime = Date.now();

document.getElementById('verseText').addEventListener('scroll', () => { interacted = true; });

window.addEventListener('scroll', () => { interacted = true; }); // optional

// Show Finish button when at bottom + minTime passed
document.getElementById('verseText').addEventListener('scroll', function(){
  let el = this;
  if(el.scrollTop + el.clientHeight >= el.scrollHeight){
    let timeSpent = (Date.now() - startTime)/1000;
    if(timeSpent >= minTime && interacted){
      document.getElementById('finishBtn').style.display = 'block';
    }
  }
});

document.getElementById('finishBtn').addEventListener('click', () => {
  // Update Google Sheets via API (doPost)
  fetch('YOUR_GOOGLE_SCRIPT_URL', {
    method:'POST',
    body: JSON.stringify({
      userId: username,
      phase: localStorage.getItem('selectedPhase'),
      day: verse.day,
      verse: verse.verse,
      timeSpent: (Date.now()-startTime)/1000,
      completed: true
    })
  }).then(res => res.json()).then(console.log);

  // Mark as completed in localStorage (for table)
  let statusCell = document.getElementById(`status-${index}`);
  if(statusCell) statusCell.innerText = '✅';

  window.location.href = 'table.html';
});
