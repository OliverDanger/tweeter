console.log('tomato');

$(document).ready(function() {
  console.log('The page is loaded!');

  $("textarea").on('input', event => {
    console.log(event.target.value);
    let tweetLength = event.target.value.length;
    $(".counter").text(140 - tweetLength)
    if (tweetLength > 140) {
      $(".counter").css( "color", "red")
    } else {
      $(".counter").css( "color", "#4056A1")
    }
  });
});

