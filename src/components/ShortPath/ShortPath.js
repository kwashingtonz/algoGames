import React, { useEffect, useState, useRef } from 'react';
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

  const aRef = useRef(null);
  const bRef = useRef(null);
  const cRef = useRef(null);
  const dRef = useRef(null);
  const eRef = useRef(null);
  const fRef = useRef(null);
  const gRef = useRef(null);
  const hRef = useRef(null);
  const iRef = useRef(null);
  const jRef = useRef(null);

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

  let tryCount = 3;

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

  const checkValidity = () => {

    let a, b, c, d, e, f, g, h, i, j;

    let answerObj = {}

    if (aRef.current) {
      a = parseInt(aRef.current.value);
    }
    if (bRef.current) {
      b = parseInt(bRef.current.value);
    }
    if (cRef.current) {
      c = parseInt(cRef.current.value);
    }
    if (dRef.current) {
      d = parseInt(dRef.current.value);
    }
    if (eRef.current) {
      e = parseInt(eRef.current.value);
    }
    if (fRef.current) {
      f = parseInt(fRef.current.value);
    }
    if (gRef.current) {
      g = parseInt(gRef.current.value);
    }
    if (hRef.current) {
      h = parseInt(hRef.current.value);
    }
    if (iRef.current) {
      i = parseInt(iRef.current.value);
    }
    if (jRef.current) {
      j = parseInt(jRef.current.value);
    }

    if (startCity === "City A") {

      if (!isNaN(b) && !isNaN(c) && !isNaN(d) && !isNaN(e) && !isNaN(f) && !isNaN(g) && !isNaN(h) && !isNaN(i) && !isNaN(j)) {
        answerObj = { "City A": 0, "City B": b, "City C": c, "City D": d, "City E": e, "City F": f, "City G": g, "City H": h, "City I": i, "City J": j };
      } else {
        alert("Please enter all distances!");
      }

    } else if (startCity === "City B") {

      if (!isNaN(a) && !isNaN(c) && !isNaN(d) && !isNaN(e) && !isNaN(f) && !isNaN(g) && !isNaN(h) && !isNaN(i) && !isNaN(j)) {
        answerObj = { "City A": a, "City B": 0, "City C": c, "City D": d, "City E": e, "City F": f, "City G": g, "City H": h, "City I": i, "City J": j };
      } else {
        alert("Please enter all distances!");
      }

    } else if (startCity === "City C") {

      if (!isNaN(a) && !isNaN(b) && !isNaN(d) && !isNaN(e) && !isNaN(f) && !isNaN(g) && !isNaN(h) && !isNaN(i) && !isNaN(j)) {
        answerObj = { "City A": a, "City B": b, "City C": 0, "City D": d, "City E": e, "City F": f, "City G": g, "City H": h, "City I": i, "City J": j };
      } else {
        alert("Please enter all distances!");
      }

    } else if (startCity === "City D") {

      if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(e) && !isNaN(f) && !isNaN(g) && !isNaN(h) && !isNaN(i) && !isNaN(j)) {
        answerObj = { "City A": a, "City B": b, "City C": c, "City D": 0, "City E": e, "City F": f, "City G": g, "City H": h, "City I": i, "City J": j };
      } else {
        alert("Please enter all distances!");
      }

    } else if (startCity === "City E") {

      if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d) && !isNaN(f) && !isNaN(g) && !isNaN(h) && !isNaN(i) && !isNaN(j)) {
        answerObj = { "City A": a, "City B": b, "City C": c, "City D": d, "City E": 0, "City F": f, "City G": g, "City H": h, "City I": i, "City J": j };
      } else {
        alert("Please enter all distances!");
      }

    } else if (startCity === "City F") {

      if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d) && !isNaN(e) && !isNaN(g) && !isNaN(h) && !isNaN(i) && !isNaN(j)) {
        answerObj = { "City A": a, "City B": b, "City C": c, "City D": d, "City E": e, "City F": 0, "City G": g, "City H": h, "City I": i, "City J": j };
      } else {
        alert("Please enter all distances!");
      }

    } else if (startCity === "City G") {

      if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d) && !isNaN(e) && !isNaN(f) && !isNaN(h) && !isNaN(i) && !isNaN(j)) {
        answerObj = { "City A": a, "City B": b, "City C": c, "City D": d, "City E": e, "City F": f, "City G": 0, "City H": h, "City I": i, "City J": j };
      } else {
        alert("Please enter all distances!");
      }

    } else if (startCity === "City H") {

      if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d) && !isNaN(e) && !isNaN(f) && !isNaN(g) && !isNaN(i) && !isNaN(j)) {
        answerObj = { "City A": a, "City B": b, "City C": c, "City D": d, "City E": e, "City F": f, "City G": g, "City H": 0, "City I": i, "City J": j };
      } else {
        alert("Please enter all distances!");
      }

    } else if (startCity === "City I") {

      if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d) && !isNaN(e) && !isNaN(f) && !isNaN(g) && !isNaN(h) && !isNaN(j)) {
        answerObj = { "City A": a, "City B": b, "City C": c, "City D": d, "City E": e, "City F": f, "City G": g, "City H": h, "City I": 0, "City J": j };
      } else {
        alert("Please enter all distances!");
      }

    } else {

      if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d) && !isNaN(e) && !isNaN(f) && !isNaN(g) && !isNaN(h) && !isNaN(i)) {
        answerObj = { "City A": a, "City B": b, "City C": c, "City D": d, "City E": e, "City F": f, "City G": g, "City H": h, "City I": i, "City J": 0 };
      } else {
        alert("Please enter all distances!");
      }

    }

    if (Object.keys(answerObj).length !== 0) {
        let ans = JSON.stringify(answerObj);
        let sol = JSON.stringify(shortDistances);

        if(ans === sol){
          alert("Correct!");

          


          tryCount = 3;
        }else{
          alert(`Not a valid answer! ${tryCount === 0 ? `No` : tryCount} tries left`);
          tryCount -= 1;
        }

        if(tryCount < 0 ){

          if(startCity !== 'City A'){
            aRef.current.value = "";
          }
          if(startCity !== 'City B'){
            bRef.current.value = "";
          }
          if(startCity !== 'City C'){
            cRef.current.value = "";
          }
          if(startCity !== 'City D'){
            dRef.current.value = "";
          }
          if(startCity !== 'City E'){
            eRef.current.value = "";
          }
          if(startCity !== 'City F'){
            fRef.current.value = "";
          }
          if(startCity !== 'City G'){
            gRef.current.value = "";
          }
          if(startCity !== 'City H'){
            hRef.current.value = "";
          }
          if(startCity !== 'City I'){
            iRef.current.value = "";
          }
          if(startCity !== 'City J'){
            jRef.current.value = "";
          }

          tryCount = 3;
          generateCityDistances();
        }

    }


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
        {startCity !== 'City A' ? <input type='number' placeholder='City A (km)' className='dist-input' ref={aRef} /> : <></>}
        {startCity !== 'City B' ? <input type='number' placeholder='City B (km)' className='dist-input' ref={bRef} /> : <></>}
        {startCity !== 'City C' ? <input type='number' placeholder='City C (km)' className='dist-input' ref={cRef} /> : <></>}
        {startCity !== 'City D' ? <input type='number' placeholder='City D (km)' className='dist-input' ref={dRef} /> : <></>}
        {startCity !== 'City E' ? <input type='number' placeholder='City E (km)' className='dist-input' ref={eRef} /> : <></>}
        {startCity !== 'City F' ? <input type='number' placeholder='City F (km)' className='dist-input' ref={fRef} /> : <></>}
        {startCity !== 'City G' ? <input type='number' placeholder='City G (km)' className='dist-input' ref={gRef} /> : <></>}
        {startCity !== 'City H' ? <input type='number' placeholder='City H (km)' className='dist-input' ref={hRef} /> : <></>}
        {startCity !== 'City I' ? <input type='number' placeholder='City I (km)' className='dist-input' ref={iRef} /> : <></>}
        {startCity !== 'City J' ? <input type='number' placeholder='City J (km)' className='dist-input' ref={jRef} /> : <></>}
        <button onClick={checkValidity}>Submit</button>
      </div>
    </div>
  );
};

export default ShortPath;
