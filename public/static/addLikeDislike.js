const likeButtons = document.querySelectorAll('.like-container');
const dislikeButtons = document.querySelectorAll('.dislike-container');


let liked;
let cnt=0;
let likes;
let json;

for (let likeButton of likeButtons) {
    liked = likeButton.dataset.liked;
    console.log(`${cnt} first step ` + liked)
    cnt++

    likeButton.addEventListener('click', (evt) => {

        evt.preventDefault();
        //let liked = likeButton.dataset.liked;
        
        
        console.log('inside step ' + liked)

        if (liked && likeButton.classList.contains('added')) {
            likes = likeButton.value--;
            likeButton.textContent--;

            json = JSON.stringify({
                reviewId: likeButton.dataset.id,
                attitude: true,
                amount: likes - 1,
                liked: liked
            })

        } else {
            likes = likeButton.value++;
            likeButton.textContent++;

            json = JSON.stringify({
                reviewId: likeButton.dataset.id,
                attitude: true,
                amount: likes + 1,
                liked: liked
            })
        }
        likeButton.classList.toggle('added')

        //let likes = likeButton.value++;
        //likeButton.textContent++;
        
        


        const request = new XMLHttpRequest();
        request.open("POST", "/reviews/:reviewId/add", true);
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.send(json);
        request.addEventListener("load", function () {
            if (request.status !== 200) {
                console.error('Something went wrong')
            } 
        });

        /*
        let liked = likeButton.dataset.liked;
        let likes;
        if (liked) {
            likes = likeButton.value--;
            likeButton.textContent--;
        } else {
            likes = likeButton.value++;
            likeButton.textContent++;
        }
        
        let json = JSON.stringify({
            reviewId: likeButton.dataset.id,
            attitude: true,
            amount: likes,
            liked: liked
        })
        console.log(likes);
        
        const request = new XMLHttpRequest();
        request.open("POST", "/reviews/:reviewId/add", true);
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.send(json);
        request.addEventListener("load", function () {
            if (request.status !== 200) {
                console.error('Something went wrong')
            } 
        });

        let newAttr = !likeButton.dataset.liked;
        likeButton.setAttribute('data-liked', newAttr)
        */
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