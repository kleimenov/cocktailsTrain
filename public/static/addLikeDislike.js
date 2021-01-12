const likeButtons = document.querySelectorAll('.like-container');
const dislikeButtons = document.querySelectorAll('.dislike-container');


for (let likeButton of likeButtons) {
    likeButton.addEventListener('click', () => {
        let reviewId = likeButton.dataset.id;
        console.log(reviewId);
    })
}

for (let dislikeButton of dislikeButtons) {
    dislikeButton.addEventListener('click', () => {
        let reviewId = dislikeButton.dataset.id;
        console.log(reviewId);
    })

}