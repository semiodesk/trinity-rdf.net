$(document).ready(function() {
  // Enable the hamburger menu.
  $('.hamburger').click(function(e) {
    $(e.currentTarget).toggleClass('is-active');
  });

  // Set the trinity version in the header.
  $('.trinity-version').text(version);

  $('#btn-contact').click(function(e) {
    $("#contact-dialog").modal('show');

    e.preventDefault();
  });

  // Enable smooth scrolling.
  new SmoothScroll('a[href*="#"]');

  // Clear the contents of the code block so typed.js does not go crazy.
  $('#nuget').text('');

  var typed = undefined;

  observeVisibility(document.getElementById('nuget'), function(visible) {
    if(visible && !typed) {
      // Enable typing animation on Nuget code.
      typed = new Typed('#nuget', {
        strings: ['PM> Install-Package Trinity.RDF'],
        startDelay: 500,
        typeSpeed: 40,
        loopCount: 1
      });
    }
  })
});

function observeVisibility(element, callback) {
  var options = {
    root: document.root,
    rootMargin: '0px',
    threshold: 1.0
  }

  var observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      callback(entry.intersectionRatio > 0);
    });
  }, options);

  observer.observe(element);
}