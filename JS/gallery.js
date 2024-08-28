/**
 * Gallery functionality for the Asia Africa Chamber of Commerce website.
 * This script handles image loading, layout, filtering, and search.
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM element references
    const gallery = document.getElementById('gallery');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let galleryItems = [];

    /**
     * Fetch gallery data from JSON file and initialize gallery
     */
    fetch('js/gallery-data.json')
        .then(response => response.json())
        .then(data => {
            galleryItems = data;
            renderGallery(galleryItems);
            initializeMasonry();
            initializeFilters();
        });

    /**
     * Renders gallery items to the DOM
     * @param {Array} items - Array of gallery item objects
     */
    function renderGallery(items) {
        gallery.innerHTML = items.map((item, index) => `
            <div class="col-md-4 col-sm-6 gallery-item ${item.category}" data-category="${item.category}">
                <div class="image-container">
                    <img src="${item.image}" alt="${item.title}" class="img-fluid" data-index="${index}">
                </div>
                <p class="image-title">${item.title}</p>
            </div>
        `).join('');
    }

    /**
     * Initializes Masonry layout for the gallery
     */
    function initializeMasonry() {
        new Masonry(gallery, {
            itemSelector: '.gallery-item',
            columnWidth: '.gallery-item',
            percentPosition: true
        });
    }

    /**
     * Sets up event listeners for filter buttons
     */
    function initializeFilters() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const filter = this.dataset.filter;
                filterGallery(filter);
            });
        });
    }

    /**
     * Filters gallery items based on selected category
     * @param {string} filter - Category to filter by
     */
    function filterGallery(filter) {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        gallery.masonry('layout');
    }

    /**
     * Event listener for search functionality
     */
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredItems = galleryItems.filter(item => 
            item.title.toLowerCase().includes(searchTerm) || 
            item.category.toLowerCase().includes(searchTerm)
        );
        renderGallery(filteredItems);
        gallery.masonry('layout');
    });
});
