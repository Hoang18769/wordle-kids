import React from 'react';
import WordMatch from './components/WordMatch';
import MathQuiz from './components/MathQuiz';
import './App.css';

function App() {
  const [game, setGame] = React.useState(null);

  return (
    <div className="App">
      <h1>Wordle Kids</h1>
      {!game ? (
        <div>
          <button onClick={() => setGame('word')}>Ghép chữ</button>
          <button onClick={() => setGame('math')}>Tính toán</button>
        </div>
      ) : game === 'word' ? (
        <WordMatch />
      ) : (
        <MathQuiz />
      )}
    </div>
  );
}

export default App;