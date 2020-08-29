
mapboxgl.accessToken = 'pk.eyJ1IjoidG9tYWp1bGkiLCJhIjoiY2tlZGgzZTd3MGphbTJybHQwbGZtNmtqeiJ9.rNgtJwCEFGUHvdUHhZXDAQ';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  center: [-71.157895, 42.707741]
  });

 // Fetch stores from API
async function getLocations() {
  const res = await fetch('/api/v1/locations');
  const data = await res.json();

  const locations = data.data.map(location=> {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          location.location.coordinates[0],
          location.location.coordinates[1]
        ]
      },
      properties: {
        locationName: location.locationName,
        icon: 'shop'
      }
    };
  });

  loadMap(locations);
}

// Load map with stores
function loadMap(locations) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: locations
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getLocations();
