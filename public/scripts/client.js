/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//for sanitizing data
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createTweetElement = (data) => {
  return (`
    <article class="posted-tweet">

      <header class="tweet-header">
        <div>
          <img src="${data.user.avatars}">
        </div>
        <div>
          <span>
            @${data.user.name}
          </span>
        </div>
      </header>

      <p class="tweet-body">
        ${escape(data.content.text)}
      </p>

      <footer class="tweet-footer">
        <div>
          <span>Created ${timeago.format(data.created_at)}</span>
        </div>
        <div>
          <span class="icon">
            <i class="fa-solid fa-flag"></i>
          </span>
          <span class="icon">
            <i class="fa-solid fa-retweet"></i>
          </span>
          <span class="icon">
            <i class="fa-solid fa-heart"></i>
          </span>
        </div>
      </footer>

    </article>
  `)
};


const loadTweets = () => {
$.get('/tweets')
  .then(function(data) {
    const tweetsChrono = data.reverse()
    for (const tweet of tweetsChrono) {
      const $tweet = (createTweetElement(tweet));
      $('#tweets-container').append($tweet);

    }
  })
};


//____________________________________________________________________

$(document).ready( function() {
  $('form.composer').on('submit', function(event) {
    event.preventDefault()

    let $input = $(this);
    const $tweetText = $input.find('#tweet-text');
    const tweetLength = $tweetText.val().length;

    if (tweetLength === 0) {
      $('#tweet-error').empty().append(
      `<p><b>Error:</b> Enter tweet prior to clicking submit.</p>`
      )
      return;
    }
    if (tweetLength > 140) {
      $('#tweet-error').empty().append(
        `<p><b>Error:</b> Ensure tweet is under 140 characters.</p>`
        )
      return;
    }

    $.post(`/tweets?${$( this ).serialize()}`, $( this ).serialize())
    .then(function(data) {
      $('.posted-tweet').remove();
      $('#tweet-text').val('')
      $('.counter').val('140')
      loadTweets();
    })
    .catch(function(err) {
      console.log(err);
    })
      
  });

  loadTweets();


})
