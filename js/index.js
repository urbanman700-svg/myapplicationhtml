
// Add event listener to the learn more button
document.getElementById('learn-more').addEventListener('click', () => {
    alert('Learn More button clicked!');
});

// Add event listener to the sign up button
document.getElementById('sign-up').addEventListener('click', () => {
    alert('Sign Up button clicked!');
});

// Add event listener to the buy now button
document.getElementById('buy-now').addEventListener('click', () => {
    alert('Buy Now button clicked!');
});

// Add event listener to the send message button
document.getElementById('send-message').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Send Message button clicked!');
});
