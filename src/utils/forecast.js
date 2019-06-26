const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bf2ddc9cdd8cf520deb318d594074af9/' + latitude + ',' + longitude

    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect Weather Service', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,'It is currently '+body.currently.temperature + ' degrees out. There is a '+ body.currently.precipProbability+ '% of rain' );
        }
    })
}

module.exports = forecast
