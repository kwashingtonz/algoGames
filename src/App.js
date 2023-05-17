import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import AlgoGames from './components/Home/algoGames';
import EightQueensPuzzle from './components/EightQueensPuzzle/EightQueensPuzzle';
import EncodeDecode from './components/EncodeDecode/EncodeDecode';
import MinConnectors from './components/MinConnectors/MinConnectors';
import ShortPath from './components/ShortPath/ShortPath';
import TicTacToe from './components/TicTacToe/TicTacToe';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AlgoGames/>}/>
        <Route path="/eightQueens" element={<EightQueensPuzzle/>}/>
        <Route path="/endecode" element={<EncodeDecode/>}/>
        <Route path="/tictactoe" element={<TicTacToe/>}/>
        <Route path="/shortpath" element={<ShortPath/>}/>
        <Route path="/minconnectors" element={<MinConnectors/>}/>
      </Routes>
    </Router>

  );
}

export default App;
