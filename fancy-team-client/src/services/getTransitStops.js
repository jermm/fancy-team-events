import config from '../config';

const appId = config.hereApi.appId;
const appCode = config.hereApi.appCode;

export const getStopsFromId = (id) => {
    /*global google*/
    var service = new google.maps.places.PlacesService(document.getElementById('placeholder'));

    return new Promise(function (resolve, reject) {
        service.getDetails({placeId: id, fields: ['geometry','address_component','name']}, function (place) {
            getStopsFromGeo(place.geometry.location.lat(), place.geometry.location.lng()).then(function (result) {
                resolve(result);
            });
        });
    });
};

export const getStopsFromGeo = (lat, long) => {
    const requestAddress = `https://transit.api.here.com/v3/stations/by_geocoord.json?app_id=${appId}&app_code=${appCode}&radius=500&max=20&center=${lat},${long}`;
    return fetch(requestAddress).then(response => {
        return response.json();
    }).then(res => {
        let transportNames = [];
        let result = res.Res;
        if (result && result.Stations && result.Stations.Stn && result.Stations.Stn.length > 0) {
            result.Stations.Stn.forEach(function (stations) {
                stations.Transports["Transport"].forEach(function (transport) {
                    const transportMatch = (name) => {
                        return name === transport.name;
                    };
                    if (transportNames.findIndex(transportMatch) === -1)  {
                        transportNames.push(transport.name);
                    }
                });
            });
        }
        return transportNames;
    })
    .catch(err => {
        console.log(err);
    });
};