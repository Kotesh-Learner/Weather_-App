import React, { useState } from 'react'
import './Weatherapp.css'
import { CiSearch } from "react-icons/ci";
// import { WiDayCloudy } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { WiWindy } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
import { WiMoonAltNew } from "react-icons/wi";
import { WiCloudy } from "react-icons/wi";
import { WiNightCloudyHigh } from "react-icons/wi";
import { WiDayRainWind } from "react-icons/wi";
import { WiNightRainWind } from "react-icons/wi";
import { WiNightAltSnow } from "react-icons/wi";
import { WiDaySnow } from "react-icons/wi";
import { WiFog } from "react-icons/wi";

const Weatherapp = () => {

    let api_key = '3c48cb13e0e56d0cdc01393051b60208';

    const [weatherIcon, setWeatherIcon] = useState(WiWindy)

    const search = async () => {
        const element = document.getElementsByClassName('cityInput');
        const unitsElement = document.getElementsByClassName('unitsInput');
        console.log(element)
        if(element[0].value=== '')
        {
            return 0;
        }

        let URL = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=${unitsElement[0].value}&appid=${api_key}`;
        let data;
        try {
                // #Fetching Weather-data from URL
            let response = await fetch(URL);
            data = await response.json();
            // #Initalising weather-data.
            const Humidity = document.getElementsByClassName('humidity-percentage');
            const WindSpeed = document.getElementsByClassName("wind-rate");
            const Temperature = document.getElementsByClassName("weather-temp");  
            const Location = document.getElementsByClassName("weather-location");
                // # Calling Extracted Data
            Humidity[0].innerHTML = data.main.humidity+'%';
            WindSpeed[0].innerHTML = data.wind.speed+'MPH';
            Temperature[0].innerHTML = data.main.temp;
            Location[0].innerHTML = data.name;

            if(data.weather[0].icon==='01d')
            {
                setWeatherIcon(<WiDaySunny />)
            }
            else if(data.weather[0].icon==='01n')
            {
                setWeatherIcon(<WiMoonAltNew />)
            }
            else if(data.weather[0].icon==='02d'||data.weather[0].icon==='03d'||data.weather[0].icon==='04d'||data.weather[0].icon==='05d'||data.weather[0].icon==='06d'||data.weather[0].icon==='07d')
            {
                setWeatherIcon(< WiCloudy />)
            }
            else if(data.weather[0].icon==='02n'||data.weather[0].icon==='03n'||data.weather[0].icon==='04n'||data.weather[0].icon==='05n'||data.weather[0].icon==='06n'||data.weather[0].icon==='07n')
            {
                setWeatherIcon(< WiNightCloudyHigh />)
            }
            else if(data.weather[0].icon==='08d'||data.weather[0].icon==='09d'||data.weather[0].icon==='10d')
            {
                setWeatherIcon(< WiDayRainWind />)
            }
            else if(data.weather[0].icon==='08n'||data.weather[0].icon==='09n'||data.weather[0].icon==='10n')
            {
                setWeatherIcon(< WiNightRainWind />)
            }
            else if(data.weather[0].icon==='12d'||data.weather[0].icon==='13d')
            {
                setWeatherIcon(<WiDaySnow />)
            }
            else if(data.weather[0].icon==='12n'||data.weather[0].icon==='13n')
            {
                setWeatherIcon(<WiNightAltSnow />)
            }

            else{
                setWeatherIcon(<WiFog />)
            }

        } catch (error) {
            console.log('No Data Found');
        }
        

    }   


  return (
    // creating a Container
    <div className='container'>
        
        {/* #Creating a top-bar Container */}
      <div className='top_bar'>
        
        {/* #Creating a input tag for Searcg Bar */}
        <input type='text' className='cityInput' placeholder='Search'/>
        <input type='text' className='unitsInput' placeholder='Imperial/Metric'/>
          
            {/* #Creating a container for a Search_icon */}
        <div className='search_icon' onClick={()=>{search()}}>
            <CiSearch/>
        </div>
      </div>
       
        {/* #Creating Container for a Weather-icon */}
      <div className="weather-icon" ><p>{weatherIcon}</p> </div>
     
       {/* #Creating Container for a Weather-temp*/}
      <div className="weather-temp"> 40° </div>
     
      {/* #Creating Container for a Weather-location */}
      <div className="weather-location">Prosper</div>
     
      {/* #Creating Container for a Weather-Data */}
      <div className="data-container">
        <div className="element">
            <WiHumidity className='icon'/>
            <div className="data">
                <div className="humidity-percentage">50%</div>
                <div className="text">Humidity</div>
            </div>
        </div>
        
      <div className="element">
            <WiWindy className='icon'/>
            <div className="data">
                <div className="wind-rate">13Mph</div>
                <div className="text">WindSpeed</div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Weatherapp
