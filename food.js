let trends = document.querySelectorAll(".trends");
let button = document.querySelectorAll(".cart");
let  cards = document.querySelectorAll(".card");

let count = 0;

trends.forEach((curElem, index)=>{
    curElem.style.left=`${index*100}%`;
})


const myFun  = ( ) =>{
    trends.forEach((curImg)=>{
        curImg.style.transform=`translateX(-${count * 100}%)`
    })

}

setInterval(()=>{
    count++;
    if(count == trends.length){
        count=0
    }
    myFun()
},4000)


document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form default submission

    const form = event.target;
    const formData = new FormData(form);
    const url = "https://script.google.com/macros/s/AKfycbz2jDsqNr7Ajb5wleUqoV00G4YPVP-dqvT9dYiluoS_18W2og6zplAZUb0-epYU2za5aA/exec";

    fetch(url, {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                showNotification("Your table has been booked successfully!");
                form.reset(); // Clear the form fields
            } else {
                throw new Error("Error in response");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showNotification("Something went wrong. Please try again.", "error");
        });
});

function showNotification(message, type = "success") {
    const notification = document.getElementById('popupNotification');
    notification.textContent = message;
    notification.style.backgroundColor = type === "success" ? "#4caf50" : "#f44336"; // Green for success, red for error
    notification.style.display = "block";

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}



    document.getElementById('feedbackForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from reloading page

        // Get input values
        var username = document.getElementById('username').value;
        var review = document.getElementById('review').value;
        var rating = document.getElementById('rating').value;

        // Create feedback item
        var feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item');
        
        feedbackItem.innerHTML = `
            <h4>${username}</h4>
            <p><strong>Rating:</strong> ${'★'.repeat(rating)} ${'☆'.repeat(5 - rating)}</p>
            <p>${review}</p>
        `;
        
        // Append feedback to the list
        document.getElementById('feedbackList').appendChild(feedbackItem);

        // Clear form fields after submission
        document.getElementById('feedbackForm').reset();
    });




    document.getElementById('feedbackForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent page reload
    
        // Get form data
        const username = document.getElementById('username').value;
        const review = document.getElementById('review').value;
        const rating = document.getElementById('rating').value;
    
        // Create a new review element
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review');
    
        // Generate stars based on rating
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    
        // Populate review content
        reviewItem.innerHTML = `
            <div class="review-header">
                <div class="username">${username}</div>
                <div class="stars">${stars}</div>
                <div class="description">${review}</div>
            </div>
        `;
    
        // Prepend the new review to the reviews list
        const reviewList = document.getElementById('reviewList');
        reviewList.insertBefore(reviewItem, reviewList.firstChild);
    
        // Clear the form
        document.getElementById('feedbackForm').reset();
    });
    