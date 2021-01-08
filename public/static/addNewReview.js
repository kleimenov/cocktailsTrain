const addReviewButton = document.getElementById('addReview');
const reviewHolder = document.getElementById('reviewHolder');
const submitReview = document.getElementById('submitReview');




addReviewButton.addEventListener('click', (evt) => {

    reviewHolder.classList.remove('visually-hidden');

})
submitReview.addEventListener('click', (evt) => {
    reviewHolder.classList.add('visually-hidden');
})

