function scrollToTop() {
  var body = document.body;
  var html = document.documentElement;

  var maxHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}