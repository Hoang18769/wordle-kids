import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';

function WordMatch() {
  const [questions, setQuestions] = useState([]);
  const [level, setLevel] = useState(1);
  const [attempts, setAttempts] = useState(3);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const userId = "test_user"; // 🔥 Thay bằng user hiện tại

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const data = querySnapshot.docs
        .map(doc => doc.data())
        .filter(item => item.game === 'word')
        .sort((a, b) => a.level - b.level);

      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const updateUserProgress = async (newLevel, newScore) => {
    const userRef = doc(db, 'users', userId);
    try {
      await setDoc(userRef, { level: newLevel, score: newScore }, { merge: true });
    } catch (error) {
      console.error("Lỗi cập nhật Firebase:", error);
    }
  };

  const checkAnswer = async () => {
    if (questions.length === 0) return;

    if (guess.toLowerCase() === questions[level - 1]?.answer.toLowerCase()) {
      // const newLevel = level < questions.length ? level + 1 : level;
      const newLevel = level < questions.length ? level + 1 : level;

      const newScore = score + 10; // 🎯 Cộng điểm

      setLevel(newLevel);
      setScore(newScore);
      setGuess('');

      await updateUserProgress(newLevel, newScore);

      if (level === questions.length) {
        alert('🎉 Chúc mừng! Bạn đã hoàn thành tất cả màn chơi!');
      }
    } else {
      setAttempts(prev => {
        if (prev <= 1) {
          alert('😢 Bạn đã thua! Chơi lại nhé!');
          setLevel(1);
          setScore(0);
          setAttempts(3);
          updateUserProgress(1, 0);
        }
        return prev - 1;
      });
      setGuess('');
    }
  };

  return (
    <div>
      <h2>Ghép chữ - Màn {level}</h2>
      <p>Điểm: {score}</p>
      {questions.length > 0 ? (
        <>
          <p>Gợi ý: {questions[level - 1]?.question}</p>
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
