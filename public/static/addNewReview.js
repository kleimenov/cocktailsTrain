const addReviewButton = document.getElementById('addReview');
const reviewHolder = document.getElementById('reviewHolder');
const submitReview = document.getElementById('submitReview');




addReviewButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    reviewHolder.classList.remove('visually-hidden');
})
submitReview.addEventListener('click', (evt) => {
    evt.preventDefault();
    console.log('Hello')
    reviewHolder.classList.add('visually-hidden');
})

