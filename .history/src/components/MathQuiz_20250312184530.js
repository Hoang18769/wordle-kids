import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { updateProgress } from "../progressService";

function MathQuiz() {
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const userId = "userId_123"; // ID người chơi (lấy từ hệ thống xác thực sau)

  useEffect(() => {
    const fetchQuestion = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const data = querySnapshot.docs.find((doc) => doc.data().game === "math")?.data();
      if (data) {
        setQuestion(data.question);
        setCorrectAnswer(data.answer);
      }
    };
    fetchQuestion();
  }, []);

  const checkAnswer = () => {
    if (guess === correctAnswer) {
      alert("Chúc mừng!");
      updateProgress(userId, "mathquiz", 15, 4500); // Cập nhật level và điểm
    } else {
      setAttempts(attempts - 1);
      if (attempts <= 1) alert("Thua rồi!");
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
