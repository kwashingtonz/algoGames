import React, { useEffect, useState } from 'react';
import './ShortPath.css';
import { useNavigate } from 'react-router-dom';

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(item, priority) {
    this.queue.push({ item, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.queue.shift().item;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}


const ShortPath = () => {
  const navigate = useNavigate();
  const [cityDistances, setCityDistances] = useState({});
  
  const [startCity, setStartCity] = useState('');
  const [filteredDistances, setFilteredDistances] = useState({});
  const [shortDistances, setShortDistances] = useState({});

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    generateCityDistances();
    
  }, []);

  const generateCityDistances = () => {
    const cities = ['City A', 'City B', 'City C', 'City D', 'City E', 'City F', 'City G', 'City H', 'City I', 'City J'];
    const distances = {};

    //select strat city
    const randomIndex = Math.floor(Math.random() * cities.length);
    const startCity = cities[randomIndex];
    setStartCity(startCity);


    //setting random distances between each cities
    cities.forEach(city => {
      distances[city] = {};
      cities.forEach(otherCity => {
        if (city !== otherCity) {
          const distance = Math.floor(Math.random() * (50 - 5 + 1) + 5); // Generate random distance between 5km and 50km
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

    // console.log(filteredData)

    setFilteredDistances(filteredData)
    
    const shortestDistances = dijkstra(startCity, filteredData);

    setShortDistances(shortestDistances);
    console.log(shortestDistances)
  };


  const dijkstra = (startCity, distances) => {
    const shortestDistances = {};
  
    // Initialize all distances as infinity except the start city
    for (const city in distances) {
      shortestDistances[city] = city === startCity ? 0 : Infinity;
    }
  
    const visited = new Set();
    const queue = new PriorityQueue();
    queue.enqueue(startCity, 0);
  
    while (!queue.isEmpty()) {
      const currentCity = queue.dequeue();
      visited.add(currentCity);
  
      // Process neighbors of the current city
      for (const neighborCity in distances[currentCity]) {
        if (!visited.has(neighborCity)) {
          const distanceToNeighbor = distances[currentCity][neighborCity];
          const totalDistance = shortestDistances[currentCity] + distanceToNeighbor;
  
          // Update shortest distance if a shorter path is found
          if (totalDistance < shortestDistances[neighborCity]) {
            shortestDistances[neighborCity] = totalDistance;
            queue.enqueue(neighborCity, totalDistance);
          }
        }
      }
    }
  
    return shortestDistances;
  };
  

  return (

    
    <div className="center-container">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <h1 className="puzzle-title">Identify Shortest Path (Dijkstra's Algorithm)</h1>
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
      <h1>Start City : {startCity} &nbsp; (Enter Shortest Path for Each City)</h1>
      <div class="input-row">
        {startCity!=='City A' ? <input type='number' placeholder='City A (km)' className='dist-input'></input> :<></>}
        {startCity!=='City B' ? <input type='number' placeholder='City B (km)' className='dist-input'></input> :<></>}
        {startCity!=='City C' ? <input type='number' placeholder='City C (km)' className='dist-input'></input> :<></>}
        {startCity!=='City D' ? <input type='number' placeholder='City D (km)' className='dist-input'></input> :<></>}
        {startCity!=='City E' ? <input type='number' placeholder='City E (km)' className='dist-input'></input> :<></>}
        {startCity!=='City F' ? <input type='number' placeholder='City F (km)' className='dist-input'></input> :<></>}
        {startCity!=='City G' ? <input type='number' placeholder='City G (km)' className='dist-input'></input> :<></>}
        {startCity!=='City H' ? <input type='number' placeholder='City H (km)' className='dist-input'></input> :<></>}
        {startCity!=='City I' ? <input type='number' placeholder='City I (km)' className='dist-input'></input> :<></>}
        {startCity!=='City J' ? <input type='number' placeholder='City J (km)' className='dist-input'></input> :<></>}
        <button>Submit</button>
      </div>
    </div>
  );
};

export default ShortPath;
