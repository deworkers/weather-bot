import {apiUrl} from './const.js'
import fetch from 'node-fetch'

export const defaultGeo = {
    name: 'Екатеринбург',
    geo: {
        lat: 56.839104,
        lon: 60.60825
    }
};

export const getGeo = async function (cityName) {
    const url = apiUrl.geo;

    const params = new URLSearchParams();
    params.append('q', cityName);
    params.append('limit', '1');
    params.append('appid', process.env.API_KEY);

    const response = await fetch(`${url}?${params.toString()}`);
    const data = await response.json();

    return {
        name: data[0].local_names.ru,
        geo: {
            lat: data[0].lat,
            lon: data[0].lon
        }
    };
};