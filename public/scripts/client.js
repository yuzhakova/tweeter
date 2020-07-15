/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = tweetObj => {
  //responsible for returning a tweet <article>
  //Must contain entire HTML structure of the tweet
  const newTweet =
  `
  <article>
  <header class="tweet-head">
    <div>
      <img src=${tweetObj.user.avatars}/>
      <span>${tweetObj.user.name}</span>
    </div>
    <div>
      <span>${tweetObj.user.handle}</span>
    </div>
  </header>
    <div>
      <span>${escape(tweetObj.content.text)}</span>
    </div>
  <footer class="tweet-foot">
    <div>
    <span>${moment(tweetObj.created_at).fromNow()}</span>
    </div>
    
    <div class="tweet-reactions"> 
      <span><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span>
    </div>
  </footer>
  </article>
  `;
  return newTweet;
};

const renderTweets = arrayOfTweetObj => {
  //Need to prepend (to see latest tweets first) to .tweets-container
  for (let obj of arrayOfTweetObj) {
    $('.tweet-container').prepend(createTweetElement(obj));
  }
};

const ajaxPost = (url, data, callback) => {
  $.post(url, data, callback);
};

const getText = queryString => {
  let text = '';
  for (let index in queryString) {
    //text= is 5 chars long
    if (index > 4) {
      text += queryString[index];
    }
  }
  return decodeURIComponent(text);
};

const resetErrorMessage = violation => {
  if (violation === 'over count') {
    $(".error-message").hide();
    $(".error-message").empty();
    $(".error-message").append("<p>Your tweet is too long</p>");
    $(".error-message").slideDown("slow");
  } else if (violation === 'empty') {
    $(".error-message").hide();
    $(".error-message").empty();
    $(".error-message").append("<p>Keep typing...</p>");
    $(".error-message").slideDown("slow");
  } else {
    $(".error-message").hide();
    $(".error-message").empty();
  }
};

$(document).ready(function() {
  // get tweets
  const loadtweets = $.get('/tweets', function(data) {
    renderTweets(data);
  });

  //When the button is clicked, ie when the form is submitted
  $('button').click(function(event) {
    event.preventDefault();
    const data = $('form').serialize();
    const dataLength = (getText(data)).length;
    if (dataLength > 140) {
      resetErrorMessage('over count');
    } else if (dataLength === 0) {
      resetErrorMessage('empty');
    } else {
      resetErrorMessage();
      const dataToPost = ajaxPost('/tweets', data, function() {
        $.get('/tweets', function(data) {
          renderTweets(data);
        });
        // clear the box after tweets are posted
        $('textarea').val("");
      });
    }
  });
});
