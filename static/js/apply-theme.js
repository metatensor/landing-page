<script>
(() => {
    const KEY = 'theme';                 // 'auto' | 'light' | 'dark'
    const prefersDark = matchMedia('(prefers-color-scheme: dark)');
    const stored = localStorage.getItem(KEY) || 'auto';

    const resolve = (mode) =>
    mode === 'dark' ? 'dark' :
    mode === 'light' ? 'light' :
    (prefersDark.matches ? 'dark' : 'light');

    const apply = (mode) => {
    document.documentElement.setAttribute('data-bs-theme', resolve(mode));
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.setAttribute('content', resolve(mode) === 'dark' ? 'dark light' : 'light dark');
    };

    apply(stored);

    // If user is in 'auto', follow OS changes
    prefersDark.addEventListener('change', () => {
    if ((localStorage.getItem(KEY) || 'auto') === 'auto') apply('auto');
    });
})();
</script>
