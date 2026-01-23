// Load accounts HTML into the page
fetch('accounts.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('accounts-container').innerHTML = data;
    // Re-initialize draggable element after accounts section is loaded
    if (typeof dragElement === 'function') {
      dragElement(document.getElementById("drag2"));
    }
  })
  .catch(error => console.error('Error loading accounts:', error));
