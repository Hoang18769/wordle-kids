import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';

const userId = "abc123"; // Tạm thời, sẽ thay bằng Auth sau này

function WordMatch() {
  const [questions, setQuestions] = useState([]);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(3);
  const [guess, setGuess] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const data = querySnapshot.docs
        .filter(doc => doc.data().game === 'word')
        .map(doc => doc.data());
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const loadProgress = async () => {
      const docRef = doc(db, 'progress', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLevel(data.level || 0);
        setScore(data.score || 0);
      }
    };

    loadProgress();
  }, [userId]);

  const saveProgress = useCallback(async (newLevel, newScore) => {
    await setDoc(doc(db, 'progress', userId), {
      game: "wordmatch",
      level: newLevel,
      score: newScore,
      timestamp: new Date().toISOString(),
    }, { merge: true }); // Giữ lại dữ liệu cũ
  }, []);

  const resetGame = useCallback(() => {
    setLevel(0);
    setScore(0);
    setAttempts(3);
    saveProgress(0, 0);
  }, [saveProgress]);

  const checkAnswer = () => {
    if (guess.toLowerCase() === questions[level]?.answer.toLowerCase()) {
      const newScore = score + 500;
      if (level < questions.length - 1) {
        setLevel(level + 1);
        setScore(newScore);
        saveProgress(level + 1, newScore);
      } else {
        alert('🎉 Chúc mừng! Bạn đã hoàn thành tất cả màn chơi!');
      }
      setGuess('');
    } else {
      setAttempts(prev => prev - 1);
      if (attempts <= 1) {
        alert('😢 Bạn đã thua! Chơi lại nhé!');
        resetGame();
      }
    }
  };

  return (
    <div>
      <h2>Ghép chữ - Màn {level + 1}</h2>
      <p>Điểm: {score}</p>
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
