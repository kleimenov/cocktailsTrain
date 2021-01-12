const likeButtons = document.querySelectorAll('.like-container');
const dislikeButtons = document.querySelectorAll('.dislike-container');


for (let likeButton of likeButtons) {
    likeButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        //let reviewId = likeButton.dataset.id;
        //let attitude = true;
        //let likesValue = likeButton.value;
        let likes = likeButton.value++;
        likeButton.textContent++;
        /*
        let data =  {
            reviewId: likeButton.dataset.id,
            attitude: true,
            amount: likes + 1
        }*/
        let json = JSON.stringify({
            reviewId: likeButton.dataset.id,
            attitude: true,
            amount: likes + 1
        })
        console.log('first step ' +json)
       
        const request = new XMLHttpRequest();
        request.open("POST", "/reviews/:reviewId/add", true);
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.send(json);
        request.addEventListener("load", function () {
            if (request.status == 200) {
                let data = JSON.parse(request.response);
                console.log('second step ' + data);
                console.log(data);
            } else {
                console.error('Something went wrong')
            }
         });
    })
}




for (let dislikeButton of dislikeButtons) {
    dislikeButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        //let reviewId = likeButton.dataset.id;
        //let attitude = true;
        //let likesValue = likeButton.value;
        let dislikes = dislikeButton.value++;
        dislikeButton.textContent++;
        
        let json = JSON.stringify({
            reviewId: dislikeButton.dataset.id,
            attitude: false,
            amount: dislikes + 1
        })
        console.log('first step dislike' +json)
       
        const request = new XMLHttpRequest();
        request.open("POST", "/reviews/:reviewId/add", true);
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.send(json);
        request.addEventListener("load", function () {
            if (request.status == 200) {
                let data = JSON.parse(request.response);
                console.log('second step dislike' + data);
                console.log(data);
            } else {
                console.error('Something went wrong')
            }
            
             
         });
    })
}