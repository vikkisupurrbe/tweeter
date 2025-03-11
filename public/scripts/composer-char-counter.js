$(document).ready(function() {
  // --- our code goes here ---
  // make sure the DOM is fully loaded
  console.log("Document is ready!");

  // target id="tweet-text" to respond to the input
  $("#tweet-text").on("input", function() {
    const value = $(this).val(); // 'this' is the DOM element that triggered the event

    // remaining word count = counter (140) - this.value.length
    // traverse up to get form
    const form = $(this).closest("form");

    // traverse down to get counter
    const counter = form.find(".counter");
    console.log($(".counter").val());
    

    // update counter value while typing
    const remainingCount = 140 - (value.length);
    counter.text(remainingCount);
    
    // counter number turns red if remaining count < 0
    if (remainingCount < 0) {
      $(".counter").css("color", turnColor());
    } else {
      $(".counter").css("color", "");
    }
    
  });
});

// change color function
const turnColor = () => {
  const r = 255;
  const g = 0;
  const b = 0;
  
  return `rgb(${r},${g},${b})`;
};