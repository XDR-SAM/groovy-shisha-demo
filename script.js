const toggle=document.querySelector('#menu-toggle'),nav=document.querySelector('#nav');toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));

const mobileHomeToggle = document.getElementById('sgmh-menu');
const mobileHomeLinks = document.getElementById('sgmh-links');
if (mobileHomeToggle && mobileHomeLinks) {
  mobileHomeToggle.addEventListener('click', () => {
    const open = mobileHomeLinks.classList.toggle('is-open');
    mobileHomeToggle.setAttribute('aria-expanded', String(open));
  });
  mobileHomeLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileHomeLinks.classList.remove('is-open');
    mobileHomeToggle.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileHomeLinks.classList.contains('is-open')) {
      mobileHomeLinks.classList.remove('is-open');
      mobileHomeToggle.setAttribute('aria-expanded', 'false');
      mobileHomeToggle.focus();
    }
  });
}
