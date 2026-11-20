(() => {
  'use strict';

  const loader = document.querySelector('.demo-loader');
  if (!loader) return;

  const startedAt = performance.now();
  const content = [...document.body.children].filter(element => element !== loader);
  const priorInert = content.map(element => element.inert);
  content.forEach(element => { element.inert = true; });

  let finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    document.documentElement.classList.remove('demo-booting');
    content.forEach((element, index) => { element.inert = priorInert[index]; });
    loader.classList.add('is-finished');
    setTimeout(() => loader.remove(), 500);
  }

  const mobile = window.matchMedia('(max-width: 900px)').matches;
  const hero = new Image();
  hero.src = mobile
    ? 'assets/groovy-art-7e37082dc2085c.png'
    : 'assets/groovy-art-bed822aa70d528.png';
  const ready = Promise.allSettled([hero.decode(), document.fonts.ready]);
  const minimum = new Promise(resolve => setTimeout(resolve, 3000));
  const maximum = new Promise(resolve => setTimeout(resolve, 6500));
  Promise.race([Promise.all([ready, minimum]), maximum]).then(finish);

  window.addEventListener('pageshow', event => {
    if (event.persisted || performance.now() - startedAt > 6500) finish();
  });
})();
