$(document).ready(function() {
  console.log('The page loads!');

  $("textarea").on('input', event => {
    $('#tweet-error').empty()
    let tweetLength = event.target.value.length;
    $(".counter").text(140 - tweetLength)
    if (tweetLength > 140) {
      $(".counter").css( "color", "red")
    } else {
      $(".counter").css( "color", "#4056A1")
    }
  });
});

