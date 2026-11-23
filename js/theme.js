// Light/dark theme toggle.
// The inline script in <head> applies any saved choice before first paint;
// this file wires up the header button. With no saved choice the page follows
// the OS preference. The button's label is constant ("Dark theme") and its
// pressed state reports whether the dark theme is currently shown.
(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function effectiveTheme() {
    var chosen = root.getAttribute('data-theme');
    if (chosen === 'light' || chosen === 'dark') return chosen;
    return media && media.matches ? 'dark' : 'light';
  }

  function render() {
    button.setAttribute('aria-pressed', effectiveTheme() === 'dark' ? 'true' : 'false');
  }

  button.addEventListener('click', function () {
    var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      // Storage unavailable (private mode, blocked cookies): the choice lasts for this page view.
    }
    render();
  });

  if (media) {
    if (media.addEventListener) media.addEventListener('change', render);
    else if (media.addListener) media.addListener(render);
  }

  render();
})();
