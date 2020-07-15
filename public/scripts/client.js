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
      <span>${tweetObj.created_at}</span>
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
  for (obj of arrayOfTweetObj) {
    $('.tweet-container').prepend(createTweetElement(obj))
  }
}

const ajaxPost = (url, data, callback) => {
  $.post(url, data, callback);
}

const getTextLength = queryString => {
  let text = '';
  for (index in queryString) {
    //text= is 5 chars long
    if (index > 4) {
      text += queryString[index];
    }
  }
  return text.replace(/%20/g, " ").length;
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
    console.log(getTextLength(data));

    const dataToPost = ajaxPost('/tweets', data, function() {
      //console.log(data)
    })
  })
})