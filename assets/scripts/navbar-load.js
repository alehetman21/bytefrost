fetch('./navbar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('navbars-container').innerHTML = data;
});