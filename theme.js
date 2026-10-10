// Light/dark theme toggle. With no stored choice the page follows the OS
// preference through CSS; a click stores an explicit choice that overrides it.
(function () {
  var KEY = 'theme';
  var root = document.documentElement;
  var osDark = window.matchMedia('(prefers-color-scheme: dark)');

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(theme) {
    try { localStorage.setItem(KEY, theme); } catch (e) {}
  }
  function isDark() {
    var theme = root.getAttribute('data-theme');
    return theme ? theme === 'dark' : osDark.matches;
  }

  var initial = stored();
  if (initial === 'light' || initial === 'dark') root.setAttribute('data-theme', initial);

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.theme-toggle');
    if (!button) return;
    function sync() {
      button.setAttribute('aria-pressed', String(isDark()));
      button.title = isDark() ? 'Switch to light theme' : 'Switch to dark theme';
    }
    button.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store(next);
      sync();
    });
    if (osDark.addEventListener) osDark.addEventListener('change', sync);
    else if (osDark.addListener) osDark.addListener(sync);
    button.hidden = false;
    sync();
  });
})();
