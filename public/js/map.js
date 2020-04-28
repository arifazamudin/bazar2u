
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpZmF6YW11ZGRpbiIsImEiOiJjazlhMmN2cHEwNG8zM2VwNzY5NTRtMzlkIn0.CIYs1GQwP0womncEdjAcaw';
const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [103.680154,1.488741], // starting position [lng, lat]
    zoom: 11 // starting zoom
});

// // Fetch stores from API
// async function getCheckpoints() {
//   const res = await fetch('/checkpoints');
//   const data = await res.json();

//   const checkpoints = data.data.map(checkpoint => {
//     return {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [
//           store.location.coordinates[0],
//           store.location.coordinates[1]
//         ]
//       },
//       properties: {
//         title: checkpoint.title,
//         icon: 'shop'
//       }
//     };
//   });

//   loadMap(checkpoints);
// }

// Load map with stores
function loadMap() {
    map.on('load', function() {
        map.addLayer({
            id: 'points',
            type: 'symbol',
            source:{
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [103.680154, 1.488741]
                            },
                            properties:{
                                checkpoint:'s001',
                                icon:'shop'
                            }
                        }
                    ]
                },
                layout: {
                    'icon-image': '{icon}-15',
                    'icon-size': 1.5,
                    'text-field':'{checkpoint}',
                    'text-offset': [0, 0.9],
                    'text-anchor': 'top'

                }
            }
        });

        


    });

}

loadMap();
    



// getCheckpoints();