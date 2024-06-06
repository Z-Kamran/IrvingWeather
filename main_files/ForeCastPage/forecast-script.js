

function call(){axios.get("https://api.open-meteo.com/v1/forecast?latitude=32.814&longitude=-96.9489&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,uv_index_max,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=ms&precipitation_unit=inch")
.then(res=>{
    console.log(res)

    const dateNode = document.querySelectorAll('.date')
    const dateData = res.data.daily.time

    for (let i=0; i<dateNode.length; i++){
        dateNode[i].innerHTML = dateData[i]
    }

    const dayNode = document.querySelectorAll('.day')
    const daysOfTheWeek = ["Monday","Tuesday", "Wednesday","Thursday","Friday", "Saturday", "Sunday"];

    for(let i=0; i<dayNode.length; i++){
       let getDay =  new Date(dateData[i]).getDay();
        dayNode[i].innerHTML = daysOfTheWeek[getDay]
    }

    const tempMax = res.data.daily.temperature_2m_max
    const tempUnit = res.data.daily_units.temperature_2m_max
    const tempMin = res.data.daily.temperature_2m_min
    const sunRise = res.data.daily.sunrise[3]
    const sunSet = res.data.daily.sunset[3]
    const highTemp = res.data.daily.temperature_2m_max
    const lowTemp = res.data.daily.temperature_2m_min
    const windSpeed = res.data.daily.wind_speed_10m_max
    const uvIdx = res.data.daily.uv_index_max
    const weatherCode = res.data.daily.weather_code
    
    // As the time for the sunrise was not accurate on API, made some changes to
    // correct it.
    let sunRiseSlice = sunRise.slice(11,16)
    let sunRiseSplit = sunRiseSlice.split(':')
    let sunRiseHour = Number(sunRiseSplit[0])-5
    let SunRiseMin = Number(sunRiseSplit[1])
    correctSunRise = sunRiseHour +':'+SunRiseMin

    // As the time for the sunset was not accurate on API, made some changes to
    // correct it.
    let sunSetSlice = sunSet.slice(11,16)
    let sunSetSplit = sunSetSlice.split(':')
    let sunSetHour = Number(sunSetSplit[0]) + 7
    let SunSetMin = Number(sunSetSplit[1])
    correctSunSet = sunSetHour +':'+SunSetMin
    

    const tempMaxNode = document.querySelectorAll('.temp-max')
    const tempMinNode = document.querySelectorAll('.temp-min')
    const sunRiseNode = document.querySelectorAll(".sunRise")
    const sunSetNode = document.querySelectorAll(".sunSet")
    const highTempNode = document.querySelectorAll(".high")
    const lowTempNode = document.querySelectorAll(".low")
    const windSpeedNode = document.querySelectorAll(".windSpeed")
    const uvIdxNode = document.querySelectorAll(".uvIdx")
    const weatherCond = document.querySelectorAll(".weatherCondition")

    for (let i=0; i<3; i++){
        tempMaxNode[i].innerHTML = Math.floor(tempMax[i] )+' '+ tempUnit
        tempMinNode[i].innerHTML = Math.floor(tempMin[i] )+' '+ tempUnit
        sunRiseNode[i].innerHTML = correctSunRise +' '+ 'AM'
        sunSetNode[i].innerHTML = correctSunSet + ' '+ 'PM'
        highTempNode[i].innerHTML = Math.floor(highTemp[i] )+' '+ tempUnit
        lowTempNode[i].innerHTML = Math.floor(lowTemp[i])+' '+ tempUnit
        windSpeedNode[i].innerHTML = windSpeed[i] + ' '+'m/s';
        uvIdxNode[i].innerHTML = uvIdx[i]
        

        const currentCond = Object.keys(currentConditionInfo)
        .find(key=>currentConditionInfo[key] === weatherCode[i])
        weatherCond[i].innerHTML = currentCond
}})}
call()
setInterval(()=>call(),10000)


const currentConditionInfo = { "Sunny":0, "Mainly Clear" : 1, "Partly Cloudy":2, "Overcast":3, "Fog":45, "Gentle Rain":48, 
"Rains Slowly":51, "Steady Rain":53, "Moderate Rain": 55, "Slow Rain": 56, "Raining":61, "Rainy":63, "Fast Rain":65, "Freezing Rain": 66,
 "Freezing with Rain": 67, "Snowing": 71, "Snow Fall": 73, "Snowy": 75, "Snow Grains": 77, "Rain": 80, 
 "Showers": 81, "Rain Showers": 82, "Snow":85, "Snow Showers":86, "Thunderstorm": 95, 
 "Thunderstorm(with hails)": 96, "Thunderstorm(with hails*)":99}


 const backHomeButt = document.querySelector('.onlyButton')
 backHomeButt.addEventListener('click', ()=>{
    window.location.href = '../index.html'
 })
