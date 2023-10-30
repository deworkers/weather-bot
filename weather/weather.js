import fetch from 'node-fetch';
import { convertWindDirection, timestampToDate, getTimeLabel, getDayLabel } from './helpers.js';
import { apiUrl } from './const.js'


function messageNowGenerator(data, geoName) {
    return `
<b>Сейчас в ${geoName}</b>
${messageGenerator(data)}
    `
}

function  messageListGenerator(data, geoName) {
    let message = `<b>Погода в ${geoName}:</b>\n`;
    data.list.slice(0,9).forEach(element => {
        const dateObj = timestampToDate(element.dt);
        message += `<b>${getDayLabel(dateObj)} ${getTimeLabel(dateObj)}</b>${messageGenerator(element)}\n`
    });
    return message;
}

function getIcon(iconId) {
    switch (iconId) {
        case '01d':
            return '☀️';
        case '01n':
            return '🌙';
        case '02d':
            return '🌥';
        case '02n':
            return '🌥';
        case '03d':
            return '☁️';
        case '03n':
            return '☁️';
        case '04d':
            return '☁️';
        case '04n':
            return '☁️';
        case '09d':
            return '🌨';
        case '09n':
            return '🌨';
        case '10d':
            return '🌦';
        case '10n':
            return '🌦';
        case '11d':
            return '⛈';
        case '11n':
            return '⛈';
        case '13d':
            return '🌨';
        case '13n':
            return '🌨';
        case '50d':
            return '🌫';
        case '50n':
            return '🌫';
        default:
            return '☀️';
    }
}

function messageGenerator(data) {
    const message = `
Погода: ${getIcon(data.weather[0].icon)} ${data.weather[0].description}
Температура воздуха: ${Math.round(data.main.temp)}°C
Влажность: ${data.main.humidity}%
Ветер: ${convertWindDirection(data.wind.deg)}, ${data.wind.speed} м/с`
    return message;
}

export const getWeatherNow = async function(geoObj) {
    const url = apiUrl.weatherNow;
  
    const params = new URLSearchParams();
    params.append('lat', geoObj.geo.lat);
    params.append('lon', geoObj.geo.lon);
    params.append('appid', process.env.API_KEY);
    params.append('units', 'metric');
    params.append('lang', 'ru');
  
    const response = await fetch(`${url}?${params.toString()}`);
    const data = await response.json();
  
    const message = messageNowGenerator(data, geoObj.name);
  
    return message;
}

export const getWeatherList = async function(geoObj) {
    const url = apiUrl.weatherList;
  
    const params = new URLSearchParams();
    params.append('lat', geoObj.geo.lat);
    params.append('lon', geoObj.geo.lon);
    params.append('appid', process.env.API_KEY);
    params.append('units', 'metric');
    params.append('lang', 'ru');
  
    const response = await fetch(`${url}?${params.toString()}`);
    const data = await response.json();

    const message = messageListGenerator(data, geoObj.name);
  
    return message;
}