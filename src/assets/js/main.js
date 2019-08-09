$(document).ready(function() {
  // Enable the hamburger menu.
  $(".hamburger").click(function(e) {
    $(e.currentTarget).toggleClass("is-active");
  });

  // Set the trinity version in the header.
  $(".trinity-version").text(version);

  // Enable smooth scrolling.
  new SmoothScroll('a[href*="#"]', {speed:333});

  // Initialize the contact form.
  const form = $("#form-contact");

  if (form) {
    $(".form-status-sending").css("display", "none");
    $(".form-status-ok").css("display", "none");
    $(".form-status-error").css("display", "none");
    
    form.submit(function(e) {
      e.preventDefault();

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

      sendEmail(data, function(err, response) {
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
        callback(true, response.target.response);
      };

      xhr.open(form.attr('method'), form.attr('action'), true);
      xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

      // Send the collected data as JSON
      //xhr.send(JSON.stringify(data));
      xhr.send("{ email: 'sebastian@semiodesk.com'");
    };
  }
});
