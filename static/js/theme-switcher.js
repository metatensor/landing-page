// applies theme and theme switching
(() => {
  const KEY = 'theme';                           // 'auto' | 'light' | 'dark'
  const ORDER = ['auto', 'light', 'dark'];       // cycle order like Furo
  const ICON = { auto: 'ti-sun-moon', light: 'ti-sun', dark: 'ti-moon' };
  const LABEL = {
    auto:  { now: 'System', next: 'Light' },
    light: { now: 'Light',  next: 'Dark'  },
    dark:  { now: 'Dark',   next: 'System'}
  };

  const prefersDark = matchMedia('(prefers-color-scheme: dark)');

  const resolve = (mode) =>
    mode === 'dark' ? 'dark' :
    mode === 'light' ? 'light' :
    (prefersDark.matches ? 'dark' : 'light');

  const apply = (mode) => {
    // apply theme to document
    document.documentElement.setAttribute('data-bs-theme', resolve(mode));
    // persist choice (store 'auto' explicitly)
    localStorage.setItem(KEY, mode);

    // refresh button UI
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = `ti ${ICON[mode]}`;
      icon.setAttribute('aria-hidden', 'true');
    }
    btn.title = `Theme: ${LABEL[mode].now} (click for ${LABEL[mode].next})`;
    btn.setAttribute('aria-label', btn.title);
  };

  const nextMode = (mode) => ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];

  // initial
  const start = localStorage.getItem(KEY) || 'auto';
  apply(start);

  // click to cycle
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#theme-toggle');
    if (!btn) return;
    const current = localStorage.getItem(KEY) || 'auto';
    apply(nextMode(current));
  });

  // keep in sync if OS theme changes while in 'auto'
  prefersDark.addEventListener('change', () => {
    if ((localStorage.getItem(KEY) || 'auto') === 'auto') {
      // only need to re-apply to update resolved theme (and tooltip if you like)
      apply('auto');
    }
  });
})();
