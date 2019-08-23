$(document).ready(function() {
  // Enable the hamburger menu.
  $(".hamburger").click(function(e) {
    $(e.currentTarget).toggleClass("is-active");
  });

  // Enable smooth scrolling.
  new SmoothScroll('a[href*="#"]', { speed: 333 });

  // Send an HTTP request.
  var sendRequest = function(method, url, data, callback) {
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
      callback(true, response.target.response);
    };

    xhr.open(method, url, true);
    xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    if (data) {
      // Send the collected data as JSON
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  };

  // Retrieve latest Trinity version from NuGet.
  sendRequest(
    "GET",
    "https://api.nuget.org/v3/registration3-gz-semver2/semiodesk.trinity/index.json",
    undefined,
    function(err, response) {
      if (response) {
        var catalog = JSON.parse(response);

        if (catalog.items && catalog.items.length > 0) {
          // Set the Trinity RDF version number.
          $(".trinity-version").text(catalog.items[0].upper);
        }
      }
    }
  );

  // Initialize the contact form.
  const form = $("#form-contact");

  if (form) {
    $(".form-status-sending").css("display", "none");
    $(".form-status-ok").css("display", "none");
    $(".form-status-error").css("display", "none");

    form.submit(function(e) {
      e.preventDefault();

      if(gtag) {
        gtag("event", "generate_lead", {
          event_category: "engagement"
        });
      }

      // Prepare data to send
      data = {
        name: form.find("#name").val(),
        reply_to: form.find("#email").val(),
        organization: form.find("#organization").val(),
        subject: form.find("#subject").val(),
        message: form.find("#message").val()
      };

      $(".btn-submit").prop("disabled", true);
      $(".form-status-sending").css("display", "block");
      $(".form-status-ok").css("display", "none");
      $(".form-status-error").css("display", "none");

      var method = form.attr("method");
      var url = form.attr("action");

      sendRequest(method, url, data, function(err, response) {
        if (err) {
          $(".btn-submit").prop("disabled", false);
          $(".form-status-sending").css("display", "none");
          $(".form-status-ok").css("display", "none");
          $(".form-status-error").css("display", "block");
        } else {
          $(".btn-submit").prop("disabled", true);
          $(".form-status-sending").css("display", "none");
          $(".form-status-ok").css("display", "block");
          $(".form-status-error").css("display", "none");
        }
      });
    });
  }
});
