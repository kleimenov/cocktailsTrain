const addReviewButton = document.getElementById('addReview');
const reviewHolder = document.getElementById('reviewHolder');
const submitReview = document.getElementById('submitReview');




addReviewButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    reviewHolder.classList.remove('visually-hidden');
})

