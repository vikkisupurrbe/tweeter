/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  console.log("Listening tweet form.")
  // select the form id tweet-form to listen for the submit event
  const tweetForm = document.querySelector("#tweet-form");
  tweetForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // prevent default form submission behavior
    
    // serialize the form data
    const formData = $(this).serialize();

    // send an ajax POST request
    $.ajax ({
      url: "/api/tweets",
      method: "POST",
      data: formData,
      success: function (response) {
        console.log(`Tweet submitted successfully: ${formData}`, response);
        // clear the form after submission
        $("#tweet-text").val(""); 
      },
      error: function(xhr, status, error) {
        console.log("Error submitting tweet:", xhr.responseText);
      }
    })
  });
});