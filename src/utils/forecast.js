const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/1d4b4bcc2b50955b375c356db3defa71/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!')
        } else if (body.error) {
            callback('Unable to find location.')
        } else {
            const temperature       = body.currently.temperature,
                  precipProbability = body.currently.precipProbability,
                  todayData         = body.daily.data[0];
            
            callback(undefined ,`${todayData.summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of raining`);
        }
    })
}

module.exports = forecast;