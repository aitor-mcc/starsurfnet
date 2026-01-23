// Load navbar HTML into the page
fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-container').innerHTML = data;
    // Re-initialize draggable element after navbar is loaded
    if (typeof dragElement === 'function') {
      dragElement(document.getElementById("drag"));
    }
  })
  .catch(error => console.error('Error loading navbar:', error));
