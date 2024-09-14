am5.ready(function () {

    // Create root element
    var root = am5.Root.new("mapDiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    var chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator()
    }));

    // Create main polygon series for countries
    var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"]
    }));

    polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        toggleKey: "active",
        interactive: true
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
        fill: root.interfaceColors.get("primaryButtonHover")
    });

    // Create point series for markers
    var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    pointSeries.bullets.push(function () {
        var circle = am5.Circle.new(root, {
            radius: 7,
            tooltipText: "{title}",
            fill: am5.color(0xff0000),
            stroke: root.interfaceColors.get("background"),
            strokeWidth: 2
        });

        return am5.Bullet.new(root, {
            sprite: circle
        });
    });

    // Add data for chamber locations
    pointSeries.data.setAll([
        { geometry: { type: "Point", coordinates: [36.8219, -1.2921] }, title: "Nairobi, Kenya" },
        { geometry: { type: "Point", coordinates: [101.6869, 3.1390] }, title: "Kuala Lumpur, Malaysia" },
        { geometry: { type: "Point", coordinates: [55.2708, 25.2048] }, title: "Dubai, UAE" },
        // Add more locations as needed
    ]);

    // Make the map full-screen
    chart.appear(1000, 100);
});