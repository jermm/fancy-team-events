import config from '../config';

const appId = config.hereApi.appId;
const appCode = config.hereApi.appCode;


export const getStopsFromGeo = (lat, long) => {
    const requestAddress = `https://transit.api.here.com/v3/stations/by_geocoord.json?app_id=${appId}&app_code=${appCode}&radius=1000&center=${lat},${long}`;
    return fetch(requestAddress).then(response => {
        return response.json();
    }).then(res => {
        let transportNames = [];
        let result = res.Res;
        if (result && result.Stations && result.Stations.Stn && result.Stations.Stn.length > 0) {
            console.log(result.Stations.Stn[0]);

            result.Stations.Stn[0].Transports["Transport"].forEach(function (transport) {
                const transportMatch = (name) => {
                    return name === transport.name;
                };
                if (transportNames.findIndex(transportMatch) === -1)  {
                    transportNames.push(transport.name);
                }
            });
        }
        return transportNames;
    })
    .catch(err => {
        console.log(err);
    });
};