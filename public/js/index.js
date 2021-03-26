const urlShortenerForm = document.querySelector('form');
const loadingSign = document.querySelector('.loading');
const urlTextbox = document.querySelector('input');
const error = document.querySelector('.error');
const shortenedUrl = document.querySelector('.shortened-url');
const shortenedLink = document.querySelector('.shortened-link');

urlShortenerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  loadingSign.textContent = 'Loading...';
  error.textContent = '';
  
  const originalUrl = document.querySelector('input').value;
  fetch(`/v1/shorten`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ originalUrl })
  }).then((response) => {
    response.json().then((response) => {
      if (!response.success) {
        loadingSign.textContent = '';
        shortenedLink.textContent = '';
        error.textContent = response.message;
      } else {
        loadingSign.textContent = '';
        error.textContent = '';
        shortenedLink.href = response.data.shortUrl;
        shortenedLink.innerHTML = response.data.shortUrl;
      }
    })
  });
});
