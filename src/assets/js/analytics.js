var property = 'UA-145472631-1';

window.dataLayer = window.dataLayer || [];

function gtag(){dataLayer.push(arguments);}

gtag('js', new Date());
gtag('config', property);

// Disable tracking if the opt-out cookie exists.
var disableStr = 'ga-disable-' + property;

if (document.cookie.indexOf(disableStr + '=true') > -1) {
  window[disableStr] = true;
}

// Opt-out function
var gaOptIn = function() {
  document.cookie = disableStr + '=false; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
  window[disableStr] = false;
}

var gaOptOut = function() {
  document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
  window[disableStr] = true;
}

var hidePrivacyNotice = function() {
  $('#privacy-notice').hide();
}

var showPrivacyNotice = function() {
  $('#privacy-notice').show();
}
    
if(document.cookie.indexOf(disableStr) == -1) {
  showPrivacyNotice();
}