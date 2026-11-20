/* Groovy Shisha Lounge demo inquiry form. */
(() => {
  const form = document.querySelector('#sg-trade-form');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const notice = document.querySelector('#trade-demo-notice');
    notice.textContent = 'Demo preview. No message has been sent.';
    notice.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  });
})();
