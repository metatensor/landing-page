(async () => {
  const injectHTML = async (selector, url) => {
    const element = document.querySelector(selector);
    if (!element) return;
    const html = await fetch(url, { cache: 'no-store' }).then(r => r.text());
    element.innerHTML = html;
  };

  // Inject header and footer content
  await injectHTML('#navbar', '/static/html/navbar.html');
  await injectHTML('#footer', '/static/html/footer.html');  
})();