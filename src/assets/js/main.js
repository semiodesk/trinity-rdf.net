$(document).ready(function() {
  // Enable the hamburger menu.
  $(".hamburger").click(function(e) {
    $(e.currentTarget).toggleClass("is-active");
  });

  // Set the trinity version in the header.
  $(".trinity-version").text(version);

  $("#btn-contact").click(function(e) {
    $("#contact-dialog").modal("show");

    e.preventDefault();
  });

  // Enable smooth scrolling.
  new SmoothScroll('a[href*="#"]');

  // Clear the contents of the code block so typed.js does not go crazy.
  $("#nuget").text("");

  var typed = undefined;

  var observeVisibility = function(element, callback) {
    var options = {
      root: document.root,
      rootMargin: "0px",
      threshold: 1.0
    };

    var observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        callback(entry.intersectionRatio > 0);
      });
    }, options);

    observer.observe(element);
  };

  observeVisibility(document.getElementById("nuget"), function(visible) {
    if (visible && !typed) {
      // Enable typing animation on Nuget code.
      typed = new Typed("#nuget", {
        strings: ["PM> Install-Package Trinity.RDF"],
        startDelay: 500,
        typeSpeed: 40,
        loopCount: 1
      });
    }
  });

  // Initialize the contact form.
  const form = $("#contact-form");

  if (form) {
    $(".form-status-sending").css("display", "none");
    $(".form-status-ok").css("display", "none");
    $(".form-status-error").css("display", "none");

    $('.btn-submit').click(function(e) {
      form.submit();
    });
    
    form.submit(function(e) {
      e.preventDefault();

      // Prepare data to send
      const data = {};
      const formElements = Array.from(form);
      formElements.map(input => (data[input.name] = input.value));

      // Log what our lambda function will receive
      console.log(JSON.stringify(data));

      $(".btn-submit").prop("disabled", true);
      $(".form-status-sending").css("display", "block");
      $(".form-status-ok").css("display", "none");
      $(".form-status-error").css("display", "none");

      sendEmail(data, function(err, response) {
        if (err) {
          $(".btn-submit").prop("disabled", false);
          $(".form-status-sending").css("display", "none");
          $(".form-status-ok").css("display", "none");
          $(".form-status-error").css("display", "block");

          console.error(response);
        } else {
          $(".btn-submit").prop("disabled", true);
          $(".form-status-sending").css("display", "none");
          $(".form-status-ok").css("display", "block");
          $(".form-status-error").css("display", "none");

          form.reset();

          console.log(response);
        }
      });
    });

    var sendEmail = function(data, callback) {
      // Construct an HTTP request
      var xhr = new XMLHttpRequest();

      // Callback function
      xhr.onloadend = response => {
        if (response.target.status === 200) {
          callback(false, response.target.response);
        } else {
          callback(true, response.target.response);
        }
      };

      xhr.onerror = response => {
        console.log(response);

        callback(true, response.target.response);
      };

      xhr.open(form.method, form.action, true);
      xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

      // Send the collected data as JSON
      xhr.send(JSON.stringify(data));
    };
  }
});