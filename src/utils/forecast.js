const request = require('request')
forecast = (latitude, longitude, callback)=>{
    const url= 'https://api.darksky.net/forecast/d23374a0b6366de2920b798647c5b17a/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=us&lang=en'
    request({url, json:true}, (error, {body})=>{
        if(error){ 
            callback('unable to connect to weather servies', undefined)
        }else if(body.error){
            callback('Unable to find location',undefined )
        }else{
            callback(undefined, body.daily.data[0].summary + "It is currently " + body.currently.temperature+ " degrees out there is "+ body.currently.precipIntensity+"% chance of rain ")
        }
    })
}

module.exports = forecast