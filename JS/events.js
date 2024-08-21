function updateCountdown(element, targetDate) {
    const now = new Date().getTime();
    const distance = new Date(targetDate).getTime() - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    element.innerHTML = `
        <div class="countdown-item">
            <span class="countdown-value">${days}</span>
            <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-value">${hours}</span>
            <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-value">${minutes}</span>
            <span class="countdown-label">Minutes</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-value">${seconds}</span>
            <span class="countdown-label">Seconds</span>
        </div>
    `;

    // 'changed' class when the value changes:
    element.querySelectorAll('.countdown-value').forEach((valueElement, index) => {
        const newValue = [days, hours, minutes, seconds][index];
        if (valueElement.textContent !== newValue.toString()) {
            valueElement.classList.add('changed');
            setTimeout(() => valueElement.classList.remove('changed'), 500);
        }
        valueElement.textContent = newValue;
    });
}

// Initialize countdowns
document.querySelectorAll('.countdown').forEach(countdown => {
    const targetDate = countdown.getAttribute('data-date');
    setInterval(() => updateCountdown(countdown, targetDate), 1000);
});

function addToCalendar(event) {
    const button = event.target.closest('.add-to-calendar');
    const eventName = button.getAttribute('data-event-name');
    const eventDate = button.getAttribute('data-event-date');
    const eventLocation = button.getAttribute('data-event-location');

    const startDate = new Date(eventDate);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Assume 2-hour event

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${eventName}
LOCATION:${eventLocation}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${eventName}.ics`;
    link.click();
}

// Add event listeners for "Add to Calendar" buttons
document.querySelectorAll('.add-to-calendar').forEach(button => {
    button.addEventListener('click', addToCalendar);
});

// EVENTS MAP SCRIPT 
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: { lat: 0, lng: 0 }
    });

    const events = [
        {
            name: 'CEO Conclave & Investors Dinner 2nd Edition',
            location: { lat: -1.2921, lng: 36.8219 }, // Nairobi coordinates
            date: 'November 15, 2024'
        },
        {
            name: 'Asia Smart Farming',
            location: { lat: 3.1390, lng: 101.6869 }, // Kuala Lumpur coordinates
            date: 'October 25th - 27th, 2024'
        },
        {
            name: 'Empower Her',
            location: { lat: -1.2921, lng: 36.8219 }, // Nairobi coordinates
            date: 'February 8, 2025'
        }
    ];

    events.forEach(event => {
        const marker = new google.maps.Marker({
            position: event.location,
            map: map,
            title: event.name
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${event.name}</h3><p>${event.date}</p>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });

    // Enhance map markers:
    events.forEach(event => {
        const marker = new google.maps.Marker({
            position: event.location,
            map: map,
            title: event.name,
            animation: google.maps.Animation.DROP
        });

        marker.addListener('mouseover', () => {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        });

        marker.addListener('mouseout', () => {
            marker.setAnimation(null);
        });

        marker.addListener('click', () => {
            map.setZoom(8);
            map.setCenter(marker.getPosition());
            infoWindow.open(map, marker);
        });
    });
}

// SOCIAL MEDIA EVENTS SHARE 
document.querySelectorAll('.share-event').forEach(button => {
    button.addEventListener('click', function () {
        const platform = this.getAttribute('data-platform');
        const eventName = this.getAttribute('data-event-name');
        const eventDate = this.getAttribute('data-event-date');
        const eventLocation = this.getAttribute('data-event-location');
        const eventUrl = window.location.href;

        let shareUrl;
        const message = `Join me at ${eventName} on ${eventDate} at ${eventLocation}. Learn more: `;

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}&quote=${encodeURIComponent(message)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(eventUrl)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(eventUrl)}&title=${encodeURIComponent(eventName)}&summary=${encodeURIComponent(message)}`;
                break;
        }

        window.open(shareUrl, '_blank', 'width=600,height=400');
    });
});

// Implement smooth scrolling:
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});