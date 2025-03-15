import React, { useState, useEffect } from 'react';
import { db } from 
import { collection, getDocs } from 'firebase/firestore';

function MathQuiz() {
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const data = querySnapshot.docs.find(doc => doc.data().game === 'math')?.data();
      if (data) {
        setQuestion(data.question);
        setCorrectAnswer(data.answer);
      }
    };
    fetchQuestion();
  }, []);

  const checkAnswer = () => {
    if (guess === correctAnswer) {
      alert('Chúc mừng!');
    } else {
      setAttempts(attempts - 1);
      if (attempts <= 1) alert('Thua rồi!');
    }
  };

  return (
    <div>
      <h2>Tính toán</h2>
      <p>Câu hỏi: {question}</p>
      <p>Còn {attempts} lượt</p>
      <input value={guess} onChange={(e) => setGuess(e.target.value)} />
      <button onClick={checkAnswer}>Kiểm tra</button>
    </div>
  );
}

export default MathQuiz;