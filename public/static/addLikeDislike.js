const likeButtons = document.querySelectorAll('.like-container');
const dislikeButtons = document.querySelectorAll('.dislike-container');


for (let likeButton of likeButtons) {
    likeButton.addEventListener('click', (evt) => {

        evt.preventDefault();

        let likes = likeButton.value++;
        likeButton.textContent++;
        
        
        let json = JSON.stringify({
            reviewId: likeButton.dataset.id,
            attitude: true,
            amount: likes + 1
        })
       
        const request = new XMLHttpRequest();
        request.open("POST", "/reviews/:reviewId/add", true);
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.send(json);
        request.addEventListener("load", function () {
            if (request.status !== 200) {
                console.error('Something went wrong')
            } 
         });
    })
}

for (let dislikeButton of dislikeButtons) {
    dislikeButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        let dislikes = dislikeButton.value++;
        dislikeButton.textContent++;
        
        let json = JSON.stringify({
            reviewId: dislikeButton.dataset.id,
            attitude: false,
            amount: dislikes + 1
        })
        const request = new XMLHttpRequest();
        request.open("POST", "/reviews/:reviewId/add", true);
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.send(json);
        request.addEventListener("load", function () {
            if (request.status !== 200) {
                console.error('Something went wrong')
            } 
         });

         /* add fetch method (just for fun)
         postResource("/reviews/:reviewId/add", json)
         */
    })
}

/* function postResource was written just for exploring how method fetch works, but in this project I use XMLHttpRequest request

async function postResource(url, data) {
    const res = await fetch(`${url}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
    });
    if (!res.ok) {
        throw new Error(`Something went wrong with fetch ${url}, status: ${res.status}`)
    }
    return await res.json()

}
*/