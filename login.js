document.getElementById('loginBtn').addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  if(username){
    // Optionally validate username from Google Sheets via API
    localStorage.setItem('username', username);
    window.location.href = 'phases.html';
  } else {
    alert("Please enter your username!");
  }
});
