const addReviewButton = document.getElementById('addReview');
const reviewHolder = document.getElementById('reviewHolder');
const submitReview = document.getElementById('submitReview');

const submitRev = (submit) => {
    submit.removeEventListener('click', (evt) => {
    evt.preventDefault();
    return console.log('hello')
})

}

addReviewButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    reviewHolder.classList.remove('visually-hidden');
    submitRev(submitReview)
})

