// Clickjacking guard. GitHub Pages can't send the header that stops other sites from framing this
// page, so the page hides itself (see #antiClickjack in index.html) and only shows when it is the
// top window. Inside someone else's frame it tries to break out and otherwise stays hidden.
(function () {
  if (window.self === window.top) {
    var hide = document.getElementById("antiClickjack");
    if (hide && hide.parentNode) hide.parentNode.removeChild(hide);
    return;
  }
  try { window.top.location = window.self.location.href; } catch (_) {}
})();
