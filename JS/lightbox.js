/**
 * Implements a lightbox functionality for the gallery.
 * Allows users to view the gallery images in a larger format.
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxContainer = document.createElement('div');
    lightboxContainer.classList.add('lightbox-container', 'd-none');
    const lightboxImage = document.createElement('img');
    lightboxImage.classList.add('lightbox-image');
    const closeButton = document.createElement('button');
    closeButton.classList.add('btn', 'btn-close', 'lightbox-close');
    closeButton.setAttribute('aria-label', 'Close lightbox');

    lightboxContainer.appendChild(lightboxImage);
    lightboxContainer.appendChild(closeButton);
    document.body.appendChild(lightboxContainer);

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imageUrl = item.querySelector('img').src;
            lightboxImage.src = imageUrl;
            lightboxContainer.classList.remove('d-none');
        });
    });

    closeButton.addEventListener('click', () => {
        lightboxContainer.classList.add('d-none');
    });

    lightboxContainer.addEventListener('click', (event) => {
        if (event.target === lightboxContainer) {
            lightboxContainer.classList.add('d-none');
        }
    });
}

// Call the initialization function when the page loads
document.addEventListener('DOMContentLoaded', initLightbox);