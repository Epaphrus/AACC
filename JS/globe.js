/**
 * Globe class for creating an interactive 3D globe visualization
 * using WebGL Earth to display member locations and trade routes.
 */
class Globe {
    /**
     * Create a new Globe instance.
     * @param {HTMLElement} container - The DOM element to render the globe in.
     */
    constructor(container) {
        this.container = container;
        this.earth = null;
        this.members = [];
        this.tradeRoutes = [];
        this.dataUpdateInterval = null;

        this.init();
    }

    /**
     * Initialize the globe and set up necessary components.
     */
    init() {
        this.createGlobe();
        this.startRotation();
        this.startRealTimeUpdates();
    }    

    /**
     * Create the 3D globe using WebGL Earth.
     */
    createGlobe() {
        this.earth = new WE.map(this.container, {
            sky: true,
            atmosphere: true
        });

        WE.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.earth);

        this.earth.setView([20, 0], 2.5);
    }

    /**
     * Start the continuous rotation of the globe.
     */
    startRotation() {
        const rotationSpeed = 0.1; // Adjust this value to change rotation speed
        let lastTime = Date.now();
    
        const animate = () => {
            const currentTime = Date.now();
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;
    
            const center = this.earth.getCenter();
            center[0] += rotationSpeed * (deltaTime / 1000);
            if (center[0] > 180) center[0] -= 360;
            this.earth.setCenter(center);
    
            requestAnimationFrame(animate);
        };
    
        animate();
    }
    

    /**
     * Fetch member data from the API.
     * @returns {Promise<Array>} A promise that resolves to an array of member data.
     */
    async fetchMemberData() {
        const response = await fetch('https://api.asiaafrica-chamber.com/members');
        const data = await response.json();
        return data;
    }

    /**
     * Load member data and update the globe visualization.
     */
    async loadMemberData() {
        this.showLoadingIndicator();
        const memberData = await this.fetchMemberData();
        this.clearExistingData();
        memberData.forEach(member => {
            this.addMember(member);
        });
        this.createTradeRoutes();
        this.hideLoadingIndicator();
    }

    /**
     * Clear existing member and trade route data from the globe.
     */
    clearExistingData() {
        this.members.forEach(member => this.earth.removeMarker(member));
        this.members = [];
        this.tradeRoutes.forEach(route => this.earth.removePolyline(route));
        this.tradeRoutes = [];
    }

    /**
     * Add a member to the globe visualization.
     * @param {Object} member - The member data object.
     */
    addMember(member) {
        const marker = WE.marker([member.lat, member.lon]).addTo(this.earth);
        marker.bindPopup(`<h3>${member.name}</h3><p>${member.description}</p>`);
        this.members.push(marker);
    }

    /**
     * Create trade routes between members.
     */
    createTradeRoutes() {
        for (let i = 0; i < this.members.length; i++) {
            for (let j = i + 1; j < this.members.length; j++) {
                const start = this.members[i].getPosition();
                const end = this.members[j].getPosition();

                const line = WE.polyline([
                    [start.lat, start.lng],
                    [end.lat, end.lng]
                ], {color: '#00ff00', opacity: 0.5, width: 2}).addTo(this.earth);

                this.tradeRoutes.push(line);
            }
        }
    }

    /**
     * Start real-time updates of member data.
     */
    startRealTimeUpdates() {
        this.loadMemberData(); // Initial load
        this.dataUpdateInterval = setInterval(() => {
            this.loadMemberData();
        }, 60000); // Update every minute
    }

    /**
     * Stop real-time updates of member data.
     */
    stopRealTimeUpdates() {
        if (this.dataUpdateInterval) {
            clearInterval(this.dataUpdateInterval);
        }
    }

    /**
     * Show loading indicator while updating data.
     */
    showLoadingIndicator() {
        let loadingDiv = document.getElementById('globe-loading');
        if (!loadingDiv) {
            loadingDiv = document.createElement('div');
            loadingDiv.id = 'globe-loading';
            this.container.appendChild(loadingDiv);
        }
        loadingDiv.textContent = 'Updating data...';
        loadingDiv.style.display = 'block';
    }

    /**
     * Hide loading indicator after data update.
     */
    hideLoadingIndicator() {
        const loadingDiv = document.getElementById('globe-loading');
        if (loadingDiv) {
            loadingDiv.style.display = 'none';
        }
    }
}

// Initialize the globe when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('globe-container');
    if (container) {
        new Globe(container);
    }
});
