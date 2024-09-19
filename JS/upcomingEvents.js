/**
 * events.js
 * This script handles the dynamic generation and display of upcoming events.
 */

// Array of event objects
const events = [
    {
        title: "CEO Conclave & Investors Dinner 2nd Edition",
        category: "Business",
        icon: "bi-briefcase-fill",
        date: "2024-11-16",
        location: "Villa Rosa Kempinski, Nairobi",
        description: "Join top CEOs and investors for an exclusive networking dinner, fostering partnerships between Asia and Africa.",
        link: "events.html#C.E.O-Conclave"
    },
    {
        title: "Asia Smart Farming",
        category: "Agriculture",
        icon: "bi-tree-fill",
        date: "2024-10-25",
        location: "Kuala Lumpur, Malaysia",
        description: "Explore cutting-edge agricultural technologies and sustainable farming practices in this three-day conference.",
        link: "events.html#ASF2024"
    },
    {
        title: "Empower Her",
        category: "Empowerment",
        icon: "bi-people-fill",
        date: "2025-02-08",
        location: "Nairobi, Kenya",
        description: "A transformative event dedicated to empowering women in business and leadership across Asia and Africa.",
        link: "events.html#EmpowerHer"
    }
];

/**
 * Creates and returns an event card element.
 * @param {Object} event - The event object containing event details.
 * @returns {HTMLElement} The event card element.
 */
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    card.innerHTML = `
        <div class="card event-card h-100 border-0 shadow-lg rounded-lg overflow-hidden">
            <div class="card-header bg-primary text-white p-3">
                <div class="d-flex justify-content-between align-items-center">
                    <span class="event-category badge bg-light text-primary">${event.category}</span>
                    <i class="bi ${event.icon} fs-4"></i>
                </div>
            </div>
            <div class="card-body d-flex flex-column p-4">
                <h5 class="card-title fw-bold mb-3">${event.title}</h5>
                <p class="card-text text-muted mb-2"><i class="bi bi-calendar-event me-2"></i>${formatDate(event.date)}</p>
                <p class="card-text text-muted mb-3"><i class="bi bi-geo-alt me-2"></i>${event.location}</p>
                <p class="card-text event-description flex-grow-1">${event.description}</p>
                <div class="countdown mt-3 mb-4 d-flex justify-content-between" data-date="${event.date}"></div>
                <div class="d-flex justify-content-between align-items-center">
                    <a href="${event.link}" class="btn btn-outline-primary rounded-pill px-4">More info</a>
                    <div class="social-share">
                        <a href="#" class="btn btn-sm btn-light rounded-circle me-1"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="btn btn-sm btn-light rounded-circle me-1"><i class="bi bi-twitter"></i></a>
                        <a href="#" class="btn btn-sm btn-light rounded-circle"><i class="bi bi-linkedin"></i></a>
                    </div>
                </div>
            </div>
        </div>
    `;
    return card;
}

/**
 * Formats a date string into a more readable format.
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string.
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Updates the countdown for all event cards.
 */
function updateCountdowns() {
    const countdowns = document.querySelectorAll('.countdown');
    countdowns.forEach(countdown => {
        const eventDate = new Date(countdown.dataset.date).getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdown.innerHTML = `
            <div class="countdown-item">${days}d</div>
            <div class="countdown-item">${hours}h</div>
            <div class="countdown-item">${minutes}m</div>
            <div class="countdown-item">${seconds}s</div>
        `;
    });
}

/**
 * Initializes the events display.
 */
function initEvents() {
    const container = document.getElementById('event-container');
    const currentDate = new Date();

    events.forEach(event => {
        if (new Date(event.date) > currentDate) {
            const card = createEventCard(event);
            container.appendChild(card);
        }
    });

    updateCountdowns();
    setInterval(updateCountdowns, 1000);
}

// Initialize events when the DOM is loaded
document.addEventListener('DOMContentLoaded', initEvents);