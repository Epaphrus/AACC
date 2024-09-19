/**
 * social-feed.js
 * This script handles the loading and display of the Twitter feed for the Asia Africa Chamber of Commerce website.
 */

/**
 * Fetches tweets from the server and displays them on the page.
 * @async
 * @function loadTwitterFeed
 */
async function loadTwitterFeed() {
    const twitterFeed = document.getElementById('twitter-feed');
    
    try {
        // Fetch tweets from the server
        const response = await fetch('/api/tweets');
        const tweets = await response.json();

        // Clear any existing content
        twitterFeed.innerHTML = '';

        // Create and append tweet elements
        tweets.data.forEach(tweet => {
            const tweetElement = createTweetElement(tweet);
            twitterFeed.appendChild(tweetElement);
        });
    } catch (error) {
        console.error('Error fetching tweets:', error);
        displayErrorMessage(twitterFeed);
    }
}

/**
 * Creates a DOM element for a single tweet.
 * @function createTweetElement
 * @param {Object} tweet - The tweet object containing text and created_at properties.
 * @returns {HTMLElement} A div element representing the tweet.
 */
function createTweetElement(tweet) {
    const tweetElement = document.createElement('div');
    tweetElement.className = 'col-md-4 mb-3';
    tweetElement.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <p class="card-text">${tweet.text}</p>
                <p class="card-text"><small class="text-muted">${formatDate(tweet.created_at)}</small></p>
            </div>
        </div>
    `;
    return tweetElement;
}

/**
 * Formats a date string into a more readable format.
 * @function formatDate
 * @param {string} dateString - The date string to format.
 * @returns {string} A formatted date string.
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Displays an error message when tweets cannot be loaded.
 * @function displayErrorMessage
 * @param {HTMLElement} container - The container element to display the error message in.
 */
function displayErrorMessage(container) {
    container.innerHTML = '<p class="text-center">Unable to load tweets at this time. Please check back later.</p>';
}

// Load the Twitter feed when the DOM content is loaded
document.addEventListener('DOMContentLoaded', loadTwitterFeed);
