/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
      <span>${tweetObj.content.text}</span>
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
  `
  return newTweet;
}

const renderTweets = arrayOfTweetObj => {
  //Need to prepend (to see latest tweets first) to .tweets-container
  for (let obj of arrayOfTweetObj) {
    $('.tweet-container').prepend(createTweetElement(obj))
  }
}

const ajaxPost = (url, data, callback) => {
  $.post(url, data, callback);
}

const getText = queryString => {
  let text = '';
  for (let index in queryString) {
    //text= is 5 chars long
    if (index > 4) {
      text += queryString[index];
    }
  }
  return text.replace(/%20/g, " ");
}

$(document).ready(function() {
  //Want to make a GET request
  const loadtweets = $.get('/tweets', function(data) {
      renderTweets(data);
  })

  //When the button is clicked, ie when the form is submitted
  $('button').click(function(event) {
    event.preventDefault();
    const data = $('form').serialize()
    const dataLength = (getText(data)).length;
    if (dataLength > 140) {
      alert('You wrote too many characters');
    } else if (dataLength === 0) {
      alert("You didn't write anything");
    } else {
      const dataToPost = ajaxPost('/tweets', data, function() {
        $.get('/tweets', function(data) {
          renderTweets(data)
          //need to figure out how to clear the text box after tweets are posted
        })
      })
    }
    })
  })
