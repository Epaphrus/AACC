/**
 * global-connections.js
 * This script creates an interactive animation representing the connections
 * between Africa, the Middle East, and Asia, including animated industry icons
 * and a stylized world map background.
 */

// Configuration for the animation
const config = {
    width: 800,
    height: 400,
    regions: [
        { name: 'Africa', x: 100, y: 200, color: '#4CAF50' },
        { name: 'Middle East', x: 400, y: 100, color: '#FFC107' },
        { name: 'Asia', x: 700, y: 200, color: '#2196F3' }
    ],
    lineColor: '#E0E0E0',
    lineWidth: 2,
    circleRadius: 15,
    animationDuration: 2000,
    industries: [
        { name: 'agriculture', icon: '🌾' },
        { name: 'technology', icon: '💻' },
        { name: 'finance', icon: '💰' },
        { name: 'energy', icon: '⚡' },
        { name: 'manufacturing', icon: '🏭' }
    ],
    mapColor: '#F0F0F0'
};

/**
 * Creates the SVG element and sets its attributes.
 * @returns {SVGElement} The created SVG element.
 */
function createSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${config.width} ${config.height}`);
    return svg;
}

/**
 * Creates a stylized world map background.
 * @returns {SVGElement} The created path element for the world map.
 */
function createWorldMap() {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M50,180 Q200,120 400,180 T750,180 M100,100 Q250,150 400,100 T700,100');
    path.setAttribute('stroke', config.mapColor);
    path.setAttribute('stroke-width', '30');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('opacity', '0.6');
    return path;
}

/**
 * Creates a region circle with a pulsating animation.
 * @param {Object} region - The region data.
 * @returns {SVGElement} The created circle element.
 */
function createRegionCircle(region) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', region.x);
    circle.setAttribute('cy', region.y);
    circle.setAttribute('r', config.circleRadius);
    circle.setAttribute('fill', region.color);

    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', 'r');
    animate.setAttribute('values', `${config.circleRadius};${config.circleRadius * 1.2};${config.circleRadius}`);
    animate.setAttribute('dur', '2s');
    animate.setAttribute('repeatCount', 'indefinite');

    circle.appendChild(animate);
    return circle;
}

/**
 * Creates a text label for a region.
 * @param {Object} region - The region data.
 * @returns {SVGElement} The created text element.
 */
function createRegionLabel(region) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', region.x);
    text.setAttribute('y', region.y + config.circleRadius + 20);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#333');
    text.textContent = region.name;
    return text;
}

/**
 * Creates a connection line between two regions with a unique ID.
 * @param {Object} region1 - The first region.
 * @param {Object} region2 - The second region.
 * @param {number} index - The index of the connection.
 * @returns {SVGElement} The created path element.
 */
function createConnectionLine(region1, region2, index) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M${region1.x},${region1.y} Q${(region1.x + region2.x) / 2},${Math.min(region1.y, region2.y) - 50} ${region2.x},${region2.y}`;
    path.setAttribute('d', d);
    path.setAttribute('stroke', config.lineColor);
    path.setAttribute('stroke-width', config.lineWidth);
    path.setAttribute('fill', 'none');
    path.setAttribute('id', `connection-${index}`);

    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', 'stroke-dasharray');
    animate.setAttribute('from', '0, 1000');
    animate.setAttribute('to', '1000, 0');
    animate.setAttribute('dur', `${config.animationDuration}ms`);
    animate.setAttribute('repeatCount', 'indefinite');

    path.appendChild(animate);
    return path;
}

/**
 * Creates an animated industry icon that moves along a path.
 * @param {string} pathId - The ID of the path element.
 * @param {Object} industry - The industry object containing name and icon.
 * @returns {SVGElement} The created animated icon element.
 */
function createAnimatedIcon(pathId, industry) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.textContent = industry.icon;
    text.setAttribute('font-size', '20');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');

    const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
    animateMotion.setAttribute('dur', `${config.animationDuration * 2}ms`);
    animateMotion.setAttribute('repeatCount', 'indefinite');
    animateMotion.setAttribute('rotate', 'auto');
    animateMotion.innerHTML = `<mpath href="#${pathId}"/>`;

    group.appendChild(text);
    group.appendChild(animateMotion);
    return group;
}

/**
 * Initializes the global connections animation.
 */
function initGlobalConnections() {
    const container = document.getElementById('connection-animation');
    const svg = createSVG();

    // Add world map background
    svg.appendChild(createWorldMap());

    // Create connection lines
    let connectionIndex = 0;
    for (let i = 0; i < config.regions.length; i++) {
        for (let j = i + 1; j < config.regions.length; j++) {
            const line = createConnectionLine(config.regions[i], config.regions[j], connectionIndex);
            svg.appendChild(line);

            // Add animated icons for each industry
            config.industries.forEach(industry => {
                const icon = createAnimatedIcon(`connection-${connectionIndex}`, industry);
                svg.appendChild(icon);
            });

            connectionIndex++;
        }
    }

    // Create region circles and labels
    config.regions.forEach(region => {
        svg.appendChild(createRegionCircle(region));
        svg.appendChild(createRegionLabel(region));
    });

    container.appendChild(svg);
}

// Initialize the animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', initGlobalConnections);
