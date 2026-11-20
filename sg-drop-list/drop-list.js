/* Groovy Shisha Lounge demo newsletter dialog. */
(function(){
  'use strict';
  var overlay=null,previousFocus=null,pending=false;

  function buildDialog(){
    var el=document.createElement('div');
    el.className='sgdl-overlay';
    el.innerHTML=`
      <section class="sgdl-dialog" role="dialog" aria-modal="true" aria-labelledby="sgdl-title" aria-describedby="sgdl-description" tabindex="-1">
        <button type="button" class="sgdl-close" aria-label="Close The Drop List signup">&times;</button>
        <div class="sgdl-content">
          <p class="sgdl-topline">GROOVY SHISHA LOUNGE PRESENTS</p>
          <h2 id="sgdl-title" class="sgdl-heading"><span class="sgdl-sr-only">THE DROP LIST.</span><img src="assets/drop-list-retro-wordmark.svg" alt="" aria-hidden="true"/></h2>
          <p id="sgdl-description" class="sgdl-intro">Get first word on new house blends, listening sessions, artist collaborations, and news from Groovy Shisha Lounge.</p>
          <form class="sgdl-form" name="the-drop-list" method="POST" data-netlify="true" netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="the-drop-list"/>
            <input type="hidden" name="consent_version" value="2026-11-v1"/>
            <input type="hidden" name="source" value="drop-list-sitewide-modal"/>
            <div class="sgdl-bot" aria-hidden="true"><label>Do not fill this in: <input name="bot-field" autocomplete="off" tabindex="-1"/></label></div>
            <label class="sgdl-sr-only" for="sgdl-email">Email address</label>
            <input class="sgdl-email" id="sgdl-email" type="email" name="email" placeholder="YOUR EMAIL ADDRESS" autocomplete="email" inputmode="email" maxlength="254" required/>
            <div class="sgdl-consent">
              <label class="sgdl-checkline"><input type="checkbox" name="marketing_consent" value="yes" required/><span>I would like updates about house blends, listening sessions, and collaborations.</span></label>
            </div>
            <p class="sgdl-message" role="status" aria-live="polite"></p>
            <button class="sgdl-submit" type="submit">GET ON THE LIST</button>
            <p class="sgdl-legal">Demo preview. No signup details are sent.</p>
            <p class="sgdl-policy">See our <a href="privacy.html" target="_blank" rel="noopener noreferrer">Privacy Notice</a>. This signup form is a visual demonstration.</p>
          </form>
        </div>
        <div class="sgdl-success" data-visible="false" role="status" aria-live="polite">
          <p class="sgdl-topline">GROOVY SHISHA LOUNGE PRESENTS</p>
          <h3>YOU’RE ON<br/>THE LIST.</h3>
          <p>You're signed up for news about new releases, listening sessions, collaborations, and where to find Groovy Shisha Lounge.</p>
          <button type="button" class="sgdl-done">BACK TO THE MUSIC</button>
        </div>
      </section>`;
    return el;
  }

  function closeDialog(){
    if(!overlay||pending)return;
    overlay.remove();overlay=null;
    document.documentElement.classList.remove('sgdl-open');
    document.removeEventListener('keydown',onKeys,true);
    if(previousFocus&&previousFocus.isConnected)previousFocus.focus({preventScroll:true});
    previousFocus=null;
  }

  function onKeys(event){
    if(!overlay)return;
    if(event.key==='Escape'){event.preventDefault();closeDialog();return;}
    if(event.key!=='Tab')return;
    var items=Array.from(overlay.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])'))
      .filter(function(elem){return elem.getClientRects().length>0;});
    if(!items.length)return;
    var first=items[0],last=items[items.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }

  function submit(event){
    event.preventDefault();
    if(!overlay)return;
    var form=event.currentTarget;
    if(!form.reportValidity())return;
    form.querySelector('.sgdl-message').textContent='Demo preview. No signup details have been sent.';
  }

  function openDialog(event){
    if(event)event.preventDefault();
    if(overlay){var email=overlay.querySelector('.sgdl-email');if(email&&email.getClientRects().length)email.focus();return;}
    previousFocus=event&&event.currentTarget?event.currentTarget:document.activeElement;
    var mobileState=document.getElementById('sg-menu-state');if(mobileState)mobileState.checked=false;
    var mobileHome=document.getElementById('sgmh-links');if(mobileHome)mobileHome.classList.remove('is-open');
    var mobileHomeButton=document.getElementById('sgmh-menu');if(mobileHomeButton)mobileHomeButton.setAttribute('aria-expanded','false');
    document.querySelectorAll('.site-nav.is-open').forEach(function(el){el.classList.remove('is-open');});
    document.querySelectorAll('.nav-toggle,.menu-toggle').forEach(function(el){el.setAttribute('aria-expanded','false');});
    overlay=buildDialog();document.body.appendChild(overlay);document.documentElement.classList.add('sgdl-open');
    overlay.querySelector('.sgdl-close').addEventListener('click',closeDialog);
    overlay.querySelector('.sgdl-done').addEventListener('click',closeDialog);
    overlay.querySelector('.sgdl-form').addEventListener('submit',submit);
    overlay.addEventListener('pointerdown',function(e){if(e.target===overlay)closeDialog();});
    document.addEventListener('keydown',onKeys,true);
    overlay.querySelector('.sgdl-email').focus({preventScroll:true});
  }

  function init(){document.querySelectorAll('[data-sg-drop-list-open]').forEach(function(a){a.addEventListener('click',openDialog);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();