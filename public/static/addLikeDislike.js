const likeButtons = document.querySelectorAll('.like-container');
const dislikeButtons = document.querySelectorAll('.dislike-container');
/*
function req() {
    const request = new XMLHttpRequest();
    request.open("POST", "/reviews/:reviewId/add", true);
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    request.send(body);
    console.log(body)
}
*/
for (let likeButton of likeButtons) {
    likeButton.addEventListener('click', () => {
        //let reviewId = likeButton.dataset.id;
        //let attitude = true;
        //let likesValue = likeButton.value;
        let likes = likeButton.value++;
        likeButton.textContent++;
        
        let data =  {
            reviewId: likeButton.dataset.id,
            attitude: true,
            amount: likes + 1
        }

        let json = JSON.stringify(data)
        console.log(json)
    })
}





for (let dislikeButton of dislikeButtons) {
    dislikeButton.addEventListener('click', () => {
        let attitude = false;
        let reviewId = dislikeButton.dataset.id;
        //let dislikesValue = dislikeButton.value;
        dislikeButton.textContent++;
        dislikeButton.value++;
        
    })

}