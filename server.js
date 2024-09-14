require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch tweets
app.get('/api/tweets', async (req, res) => {
    try {
        const response = await axios.get('https://api.twitter.com/2/tweets/search/recent', {
            params: {
                query: 'from:maxwel_kh', // Replace with the Chamber's Twitter handle
                max_results: 10,
                'tweet.fields': 'created_at'
            },
            headers: {
                'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching tweets:', error);
        res.status(500).json({ error: 'Unable to fetch tweets' });
    }
});

// Catch-all route to serve the main HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
