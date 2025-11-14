let startTime;
let minTime = 30; // seconds minimum reading
let interacted = false;
let currentChapter = 0;
let verses = [];

// Load verses from JSON
fetch('verses/readingPlan.json')
  .then(response => response.json())
  .then(data => {
    verses = data;
    displayChapter(currentChapter);
  });

function displayChapter(index) {
  document.getElementById('verseContainer').innerText = verses[index].verses;
  startTime = Date.now();
  interacted = false;
}

// Detect interaction
document.addEventListener('scroll', () => interacted = true);
document.addEventListener('click', () => interacted = true);

// Next Chapter Button
document.getElementById('nextChapterBtn').addEventListener('click', () => {
  let timeSpent = (Date.now() - startTime) / 1000;
  if(timeSpent >= minTime && interacted){
    // Send progress to Google Sheets
    fetch('YOUR_GOOGLE_SCRIPT_URL', {
      method: 'POST',
      body: JSON.stringify({
        userId: 'u001', // Example user
        chapter: verses[currentChapter].chapter,
        timeSpent: timeSpent,
        completed: true
      })
    })
    .then(res => res.json())
    .then(data => console.log(data));

    // Move to next chapter
    if(currentChapter + 1 < verses.length){
      currentChapter++;
      displayChapter(currentChapter);
    } else {
      alert("All chapters completed!");
    }
  } else {
    alert(`Please read at least ${minTime} seconds and interact with the page!`);
  }
});
