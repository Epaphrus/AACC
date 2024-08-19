// js/main.js
// Add your custom JavaScript here
document.addEventListener('DOMContentLoaded', function () {
    // Your code here    


    // BACK TO TOP ARROW 
    var backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 100) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});