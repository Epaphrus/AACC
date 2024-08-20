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

    // MEMBERSHIP BENEFITS
    AOS.init({
        duration: 800,
        once: true
    });
    

    // UPCOMING EVENTS COUNT DOWN index.HTML
    const countdownElements = document.querySelectorAll('.countdown');

    countdownElements.forEach(element => {
        const eventDate = new Date(element.dataset.date).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            element.innerHTML = `
                <div class="countdown-item">${days}d</div>
                <div class="countdown-item">${hours}h</div>
                <div class="countdown-item">${minutes}m</div>
                <div class="countdown-item">${seconds}s</div>
            `;

            if (distance < 0) {
                clearInterval(interval);
                element.innerHTML = "Event has started!";
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
    });
});
