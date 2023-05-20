import React, { useEffect, useState, useRef } from 'react';
import './MinConnectors.css';
import { useNavigate } from 'react-router-dom';
import { insertPrimAnswer } from '../../api/api';

const MinConnectors = () => {

  const answerRef = useRef(null);

  const navigate = useNavigate();
  const [cityDistances, setCityDistances] = useState({});

  const [startCity, setStartCity] = useState('');
  const [filteredDistances, setFilteredDistances] = useState({});
  const [minimumDistance, setMinimumDistances] = useState(0);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    generateCityDistances();

  }, []);

  let tryCount = 3;

  const generateCityDistances = () => {
    const cities = ['City A', 'City B', 'City C', 'City D', 'City E', 'City F', 'City G', 'City H', 'City I', 'City J'];
    const distances = {};

    //select start city
    const randomIndex = Math.floor(Math.random() * cities.length);
    const startCity = cities[randomIndex];
    setStartCity(startCity);


    //setting random distances between each cities
    cities.forEach(city => {
      distances[city] = {};
      cities.forEach(otherCity => {
        if (city !== otherCity) {
          const distance = Math.floor(Math.random() * (100 - 10 + 1) + 10); // Generate random distance between 5km and 50km
          distances[city][otherCity] = distance;
        } else {
          distances[city][otherCity] = "";
        }
      });
    });

    // Set distances in reverse direction for symmetry
    cities.forEach(city => {
      cities.forEach(otherCity => {
        if (city !== otherCity) {
          distances[otherCity][city] = distances[city][otherCity];
        }
      });
    });

    cities.forEach(city => {
      cities.forEach(otherCity => {
        if (distances[otherCity][city] === distances[city][otherCity]) {
          distances[city][otherCity] = ""
        }
      });
    });

    setCityDistances(distances);

    const dis = JSON.parse(JSON.stringify(distances));;

    for (let city in dis) {
      for (let otherCity in dis[city]) {
        if (dis[city][otherCity] === "") {
          dis[city][otherCity] = dis[otherCity][city];
        }
      }
    }

    const filteredData = Object.entries(dis).reduce((acc, [city, innerObj]) => {
      const filteredInnerObj = Object.fromEntries(
        Object.entries(innerObj).filter(([innerCity, value]) => value !== "")
      );
      return { ...acc, [city]: filteredInnerObj };
    }, {});

    setFilteredDistances(filteredData)

    const minDistance = prim(startCity, filteredData);

    setMinimumDistances(minDistance);
    console.log(minDistance)
  };

  const prim = (startCity, distances) => {
    const visitedCities = new Set();
    visitedCities.add(startCity);
  
    const remainingCities = new Set(Object.keys(distances));
    remainingCities.delete(startCity);
  
    let totalDistance = 0;
  
    while (remainingCities.size > 0) {
      let minDistance = Infinity;
      let closestCity;
  
      visitedCities.forEach(visitedCity => {
        Object.entries(distances[visitedCity]).forEach(([city, distance]) => {
          if (remainingCities.has(city) && distance < minDistance) {
            minDistance = distance;
            closestCity = city;
          }
        });
      });
  
      visitedCities.add(closestCity);
      remainingCities.delete(closestCity);
      totalDistance += minDistance;
    }
  
    return totalDistance;
  };
  


  const checkValidity = async () => {

    let answer;

    if (answerRef.current) {
      answer = parseInt(answerRef.current.value);
    }

    if (!isNaN(answer)) {
      let ans = answer;
      let sol = minimumDistance;
      let data = JSON.stringify(filteredDistances);//1500 length

      if (ans === sol) {

        let userName = prompt("Correct! Please enter your name [Leave blank to be anonymous]");

        if (userName === "") {
          userName = "anonymous"
        }

        const insert = await insertPrimAnswer(userName, ans, data);
        alert(insert.data.message);

        resetGame();

      } else {
        alert(`Not a valid answer! ${tryCount === 0 ? `No` : tryCount} tries left`);
        tryCount -= 1;
      }

      if (tryCount < 0) {
        resetGame();
      }
    } else {
      alert("Please enter minimum distance!");
    }



  };

  const resetGame = () => {
    tryCount = 3;
    generateCityDistances();
  };

  return (

    <div className="center-container">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <h1 className="puzzle-title">Identify Minimum Connectors (Prim's Algorithm)</h1>
      {cityDistances && (
        <table className='city-distances-table'>
          <tbody>
            {Object.keys(cityDistances).map(city => (
              <tr key={city}>
                <td className='td-city'>{city}</td>
                {Object.keys(cityDistances[city]).filter(city => city !== 'City J').map(otherCity => (
                  <td key={otherCity}>{cityDistances[city][otherCity]}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tr>
            <th></th>
            {Object.keys(cityDistances).filter(city => city !== 'City J').map(city => (
              <th key={city}>{city}</th>
            ))}
          </tr>
        </table>
      )}
      <h1>Start City : {startCity} &nbsp; (Enter Minimum Distance To Reach Each City)</h1>
      <div class="input-row">
        <input type='number' placeholder='Enter Minimum Distance To Reach All Cities (km)' className='ans-input' ref={answerRef} />
        <button onClick={checkValidity}>Submit</button>
      </div>
    </div>
  );
};

export default MinConnectors;
