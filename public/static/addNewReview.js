const addReviewButton = document.getElementById('addReview');
const reviewHolder = document.getElementById('reviewHolder');
const submitReview = document.getElementById('submitReview');




addReviewButton.addEventListener('click', () => {
    reviewHolder.classList.remove('visually-hidden');

})
submitReview.addEventListener('click', () => {
    reviewHolder.classList.add('visually-hidden');
})

