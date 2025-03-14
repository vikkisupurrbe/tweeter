/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// send a new tweet
$(document).ready(function () {
  // show the error message div
  const errorDiv = $("#tweet-error");

  console.log("Listening tweet form.")
  // select the form id tweet-form to listen for the submit event
  const tweetForm = document.querySelector("#tweet-form");

  tweetForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // prevent default form submission behavior
    
    // disallow submission when the tweet area is empty, or > 140 limit
    const tweetText = $("#tweet-text").val().trim(); // trim spaces

    // validate tweet before sending
    if (!isTweetValid(tweetText)) {
      return; // stop execution
    }

    // serialize the form data
    const formData = $(this).serialize();

    // send an ajax POST request
    $.ajax ({
      url: "/api/tweets",
      method: "POST",
      data: formData,
      success: function (response) {
        console.log(`Tweet submitted successfully: ${formData}`, response);
        // hide error if it;s a successful submission
        errorDiv.slideUp();
        // render the last tweet
        loadTweets();
        // clear the form after a successful submission
        $("#tweet-text").val("");
        // reset counter back to 140 after submitting the new tweet
        $("#tweet-form .counter").text(140);
      },
      error: function(xhr, status, error) {
        console.log("Error submitting tweet:", xhr.responseText);
      }
    })
  });

  // escape function to prevent XSS attacks
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // dynamically fetching tweets
  // fake data taken from initial-tweets.json
  const createTweetElement = function(tweet) {
    let $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user">
            <img src="${tweet.user.avatars}">
            <h4 class="nickname">${tweet.user.name}</h4>
          </div>
          <span class="username">${tweet.user.handle}</span>
        </header>
        <p class="tweet-text">${escape(tweet.content.text)}</p>
        <footer>
          <div class="timestamp">${timeago.format(tweet.created_at)}</div>
          <div class="actions">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-reply"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  }
  
  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $("#tweets-container").prepend($tweetElement);
      }
      $("#tweet-text").val("");
    }

  const loadTweets = function() {
    $.ajax({
      url: "/api/tweets",
      method: "GET",
      success: function(data) {
        console.log(data, "data", $("#tweets-container").length);
        renderTweets(data);
      }
    });
  };
  loadTweets()
  
  // form validation function
  const isTweetValid = function(tweet) {
    if (tweet.length === 0) {
      showError("Tweet content cannot be empty!");
      return false;
    }
    if (tweet.length > 140) {
      showError("Character count cannot go over 140!");
      return false;
    }
    return true;
  }
  
  // display error message function
  function showError(message) {
    errorDiv.html(
      `<i class="fa-solid fa-triangle-exclamation"></i> <span>${message}</span>`
    );
    errorDiv.slideDown();
  }

});
