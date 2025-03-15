import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function WordMatch() {
  const [questions, setQuestions] = useState([]); // Lưu danh sách câu hỏi
  const [level, setLevel] = useState(0); // Màn chơi hiện tại
  const [attempts, setAttempts] = useState(3);
  const [guess, setGuess] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const data = querySnapshot.docs
        .filter(doc => doc.data().game === 'word') // Lọc câu hỏi của game WordMatch
        .map(doc => doc.data());
      
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const checkAnswer = () => {
    if (guess.toLowerCase() === questions[level]?.answer.toLowerCase()) {
      if (level < questions.length - 1) {
        setLevel(level + 1); // Chuyển sang màn tiếp theo
        setGuess('');
      } else {
        alert('🎉 Chúc mừng! Bạn đã hoàn thành tất cả màn chơi!');
      }
    } else {
      setAttempts(attempts - 1);
      if (attempts <= 1) {
        alert('😢 Bạn đã thua! Chơi lại nhé!');
        setLevel(0);
        setAttempts(3);
        setGuess('');
      }
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
