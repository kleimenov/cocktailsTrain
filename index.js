const addNewIngredient = (ingredient) => {
  
  const $ingredient = <

}


const createTweetElement = (tweet) => {
    let handler = tweet.user.handle;
    let userName = tweet.user.name;
    let userPic = tweet.user.avatars;
    let tweetContent = tweet.content.text;

    const $tweet = `<div class="tweet-wrapper">
                    <ul class="tweet-header">
                    <li><img src="${userPic}">${userName}</li>
                    <li>${handler}</li>
                    </ul>
                    <p class="tweet-body">${tweetContent}</p>
                    <ul class="tweet-footer">
                    <li class="tweet-data">${currentTime()}</li>
                    <li>Some icons</li>
                    </ul>
                    </div>`
   
    return $tweet
 }