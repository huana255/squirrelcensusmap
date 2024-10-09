var map = L.map('map').setView([40.7831, -73.9712], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to determine marker color based on furcolor
function getColor(furColor) {
    return furColor === "Gray" ? '#808080' :
           furColor === "Black" ? '#000000' :
           furColor === "Cinnamon" ? '#d2691e' :
           '#ffffff';
}

// Function to style the GeoJSON layer
function markerStyle(furColor) {
    return {
        radius: 3,
        fillColor: getColor(furColor),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
}

var markersLayer = L.layerGroup().addTo(map);

function squirrelLayer(filter) {
    markersLayer.clearLayers();
    L.geoJSON(squirrelData, {
        filter: function(feature) {
            return filter === 'all' || feature.properties.primary_fur_color === filter;
        },
        pointToLayer: function(feature, latlng) {
            var furColor = feature.properties.primary_fur_color;
            var marker = L.circleMarker(latlng, markerStyle(furColor));
            marker.furColor = furColor;
            return marker;
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
                '<b>Squirrel ID:</b> ' + feature.properties.unique_squirrel_id + '<br>' +
                '<b>Fur Color:</b> ' + feature.properties.primary_fur_color + '<br>' +
                '<b>Age Group:</b> ' + feature.properties.age + '<br>'
            );
        }
    }).addTo(markersLayer);
}

function showAllsq() { squirrelLayer('all'); }
function showGraySq() { squirrelLayer('Gray'); }
function showBlackSq() { squirrelLayer('Black'); }
function showCinnamonSq() { squirrelLayer('Cinnamon'); }
showAllsq();