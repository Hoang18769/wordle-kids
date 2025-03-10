import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function WordMatch() {
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [question, setQuestion] = useState('');
  const [correctWord, setCorrectWord] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const data = querySnapshot.docs.find(doc => doc.data().game === 'word')?.data();
      if (data) {
        setQuestion(data.question);
        setCorrectWord(data.answer);
      }
    };
    fetchQuestion();
  }, []);

  const checkAnswer = () => {
    if (guess.toLowerCase() === correctWord) {
      alert('Chúc mừng!');
    } else {
      setAttempts(attempts - 1);
      if (attempts <= 1) alert('Thua rồi!');
    }
  };

  return (
    <div>
      <h2>Ghép chữ</h2>
      <p>Gợi ý: {question}</p>
      <p>Còn {attempts} lượt</p>
      <input value={guess} onChange={(e) => setGuess(e.target.value)} />
      <button onClick={checkAnswer}>Kiểm tra</button>
    </div>
  );
}

export default WordMatch;