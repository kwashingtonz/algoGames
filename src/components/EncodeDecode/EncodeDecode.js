import React, { useState, useEffect, useRef } from 'react';
import './EncodeDecode.css';
import { useNavigate } from 'react-router-dom';


const EncodeDecode = () => {

  const encodeRef = useRef(null);
  const decodeRef = useRef(null);

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('guess'); // Track the selected option
  const [randomString1, setRandomString1] = useState('');
  const [randomString2, setRandomString2] = useState('');
  const [encodedString1, setEncodedString1] = useState('');
  const [encodedString2, setEncodedString2] = useState('');
  const [decodedString1, setDecodedString1] = useState('');
  const [decodedString2, setDecodedString2] = useState('');
  const [code1, setCode1] = useState();
  const [code2, setCode2] = useState();

  useEffect(() => {
    const generateRandomString = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let string1 = '';
      let string2 = '';

      for (let i = 0; i < 30; i++) {
        string1 += characters.charAt(Math.floor(Math.random() * characters.length));
        string2 += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      setRandomString1(string1);
      setRandomString2(string2);

      setEncodedString1(encodingText(string1, "one"));
      setEncodedString2(encodingText(string2, "two"));
    };

    generateRandomString();
  }, []);


  const handleBack = () => {
    navigate(-1);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const encodingText = (str, type) => {

    let codes = getCodesFromText(str);
    if (type === "one") {
      setCode1(codes);
    } else {
      setCode2(codes);
    }
    let encodedArray = encode(str, codes);

    let encodedText = encodedArray.join('');

    return encodedText;
  }

  const decodingText = (str, type) => {

    let code;

    if (type === "one") {
      code = code1;
    } else {
      code = code2;
    }

    let decodedText = decode(str, code);

    return decodedText;
  }

  //encode text
  const encode = (str, codes) => {
    const result = [];
    for (let i = 0; i < str.length; i++) {
      // @ts-ignore
      result.push(codes.get(str[i]));
    }
    return result;
  }

  //decode text
  const decode = (str, codes) => {
    let result = "";
    let i = 0;

    while (i < str.length) {
      let found = false;

      for (const obj of codes) {
        if (str.startsWith(obj[1], i)) {
          result += obj[0];
          i += obj[1].length;
          found = true;
          break;
        }
      }

      if (!found) {
        //console.error("Binary string not matching");
        break;
      }
    }
    return result;
  }


  // get symbol codes from the text
  const getCodesFromText = (str) => {
    const frequencyArr = getFrequency(str);
    const symbols = frequencyArr.map((item) => item[0]);
    const tree = getTree(frequencyArr);
    const codes = new Map(); // Array with symbols and codes
    symbols.forEach((element) => {
      codes.set(element, getSymbolCode(tree, element));
    });
    return codes;
  }

  //get relative frequency
  const getRelativeFrequency = (arr) => {
    let length = 0;
    const resArr = [];
    for (let i = 0; i < arr.length; i++) {
      length += arr[i][1];
    }
    for (let i = 0; i < arr.length; i++) {
      const relFreq = arr[i][1] / length;
      resArr.push([arr[i][0], relFreq]);
    }
    return resArr;
  }

  // get code for symbols
  const getSymbolCode = (tree, symbol, code = '') => {
    let arr = [];
    if (typeof tree.leafs === undefined) {
      return code;
    }
    arr = tree.leafs;
    if (arr[0].symbols.length === 1 && arr[0].symbols[0] === symbol)
      return code + 0;
    if (arr[0].symbols.length === 1 && arr[0].symbols[0] !== symbol) {
      if (arr[1].symbols.length === 1 && arr[1].symbols[0] === symbol)
        return code + 1;
      if (arr[1].symbols.includes(symbol) === true)
        return getSymbolCode(arr[1], symbol, code + 1);
    }
    if (arr[1].symbols.length === 1 && arr[1].symbols[0] === symbol)
      return code + 1;
    if (arr[1].symbols.length === 1 && arr[1].symbols[0] !== symbol) {
      if (arr[0].symbols.length === 1 && arr[0].symbols[0] === symbol)
        return code + 0;
      if (arr[0].symbols.includes(symbol) === true)
        return getSymbolCode(arr[0], symbol, code + 0);
    }
    if (arr[0].symbols.length >= 2 && arr[0].symbols.includes(symbol))
      return getSymbolCode(arr[0], symbol, code + 0);
    if (arr[1].symbols.length >= 2 && arr[1].symbols.includes(symbol))
      return getSymbolCode(arr[1], symbol, code + 1);
    return (Math.random() + 1).toString(36).substring(4);
  }

  //Get symbol frequencies from the string
  const getFrequency = (str) => {
    const freq = new Map();
    for (let i = 0; i < str.length; i++) {
      let counter = 0;
      for (let j = 0; j < str.length; j++) {
        if (!freq.has(str[i])) {
          if (str[i] === str[j] && i !== j) {
            counter++;
          }
        }
      }
      if (!freq.has(str[i])) {
        freq.set(str[i], counter + 1);
      }
    }
    return Array.from(freq).sort((a, b) => b[1] - a[1]); //Descending sort
  }

  //Generate Huffman tree
  const getTree = (arr) => {
    arr = arr.map((elem) => ({
      symbols: [elem[0]],
      weight: elem[1],
      leafs: [],
    }));
    let min1;
    let min2;
    let node;
    while (arr.length > 2) {
      min1 = searchMinWeightNode(arr);
      arr.splice(arr.indexOf(min1), 1);
      min2 = searchMinWeightNode(arr);
      arr.splice(arr.indexOf(min2), 1);
      node = createNode(min1, min2);
      arr.push(node);
    }
    return createNode(arr[0], arr[1]);
  }

  // Create tree node from two nodes
  const createNode = (node1, node2) => {
    const weight = node1.weight + node2.weight;
    const symbols = node1.symbols.concat(node2.symbols);
    const leafs = [node1, node2];
    return {
      symbols,
      weight,
      leafs,
    };
  }
  // Search Node with minimal weight in tree
  const searchMinWeightNode = (arr, minNumber = -1) => {
    let min = 9999;
    let result;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].weight <= min && arr[i].weight >= minNumber) {
        min = arr[i].weight;
        result = arr[i];
      }
    }
    return result;
  }

  const decodeSubmit = () => {
    if (encodeRef.current) {
      const value = encodeRef.current.value;
      if (value === "") {
        alert("Please enter an encoded value")
      } else {
        let text = decodingText(value, "one")
        if(text === randomString1){
          alert("You have successfully guessed the encoded value");
        }else{
          alert("You have failed to guess the encoded value");
        }
      }
    }
  };


  const encodeSubmit = () => {
    if (decodeRef.current) {
      const value = decodeRef.current.value;
      if (value === "") {
        alert("Please enter an decode value");
      } else {
        let encodedtext = encodingText(value, "two");
        if(encodedtext === encodedString2){
          alert("You have successfully guessed the decoded value");
        }else{
          alert("You have failed to guess the decoded value");
        }
      }
    }
  };

  const handleKeyDown = (event) => {
    const allowedKeys = ['0', '1', 'Backspace'];
    const { key } = event;

    if (!allowedKeys.includes(key)) {
      event.preventDefault();
    }
  };

  const handleKeyDownEn = (event) => {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))];
    const { key } = event;
  
    if (!allowedKeys.includes(key)) {
      event.preventDefault();
    }
  };
  


  return (
    <div className="center-container">
      <button className="back-button" onClick={handleBack}>Back</button>
      <h1 className="puzzle-title">Encode/Decode Using Huffman Coding</h1>
      <div className="radio-buttons">
        <label>
          <input
            type="radio"
            value="guess"
            checked={selectedOption === 'guess'}
            onChange={handleOptionChange}
          />
          Guess the Encoded
        </label>
        <label>
          <input
            type="radio"
            value="decode"
            checked={selectedOption === 'decode'}
            onChange={handleOptionChange}
          />
          Decode the Encoded
        </label>
      </div>

      {selectedOption === 'guess' && (
        <div className="guess-interface">
          <h1>Guess the Encoded</h1>
          <h3>Random string : {randomString1}</h3>
          <input type="text" placeholder="Enter encoded value (Binary [0s and 1s])" onKeyDown={handleKeyDown} ref={encodeRef} />
          <button onClick={decodeSubmit}>Check</button>
        </div>
      )}

      {selectedOption === 'decode' && (
        <div className="decode-interface">
          <h1>Guess the Decoded</h1>
          <h3>Encoded string : {encodedString2}</h3>
          <input type="text" placeholder="Enter decoded value" onKeyDown={handleKeyDownEn} ref={decodeRef} />
          <button onClick={encodeSubmit}>Check</button>
        </div>
      )}
    </div>
  );
};

export default EncodeDecode;
