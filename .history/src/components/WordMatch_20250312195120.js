import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

function WordMatch() {
  const [questions, setQuestions] = useState([]);
  const [level, setLevel] = useState(1);
  const [attempts, setAttempts] = useState(3);
  const [guess, setGuess] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const data = querySnapshot.docs
        .map(doc => doc.data())
        .filter(item => item.game === 'word')
        .sort((a, b) => a.level - b.level); // Sắp xếp theo level

      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const checkAnswer = () => {
    if (questions.length === 0) return;

    if (guess.toLowerCase() === questions[level]?.answer.toLowerCase()) {
      if (level < questions.length - 1) {
        setLevel(prev => prev + 1); // Đảm bảo cập nhật đúng
        setGuess('');
      } else {
        alert('🎉 Chúc mừng! Bạn đã hoàn thành tất cả màn chơi!');
      }
    } else {
      setAttempts(prev => {
        if (prev <= 1) {
          alert('😢 Bạn đã thua! Chơi lại nhé!');
          setLevel(0);
          setAttempts(3);
        }
        return prev - 1;
      });
      setGuess('');
    }
  };

  return (
    <div>
      <h2>Ghép chữ - Màn {level + 1}</h2>
      {questions.length > 0 ? (
        <>
          <p>Gợi ý: {questions[level]?.question}</p>
          <p>Còn {attempts} lượt</p>
          <input value={guess} onChange={(e) => setGuess(e.target.value)} />
          <button onClick={checkAnswer}>Kiểm tra</button>
        </>
      ) : (
        <p>Đang tải câu hỏi...</p>
      )}
    </div>
  );
}

export default WordMatch;
