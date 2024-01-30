fetch('./footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footer-section').innerHTML = data;
});