import React, { useState, useEffect, useCallback } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { updateProgress } from "../services/SaveProgressService";

const userId = "userId_123"; // Tạm thời, sẽ lấy từ hệ thống xác thực

function MathQuiz() {
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const data = querySnapshot.docs.find((doc) => doc.data().game === "math")?.data();
      if (data) {
        setQuestion(data.question);
        setCorrectAnswer(data.answer.toString()); // Chuyển thành chuỗi để so sánh dễ dàng hơn
      }
    };
    fetchQuestion();
  }, []);

  const checkAnswer = () => {
    if (guess === correctAnswer) {
      alert("🎉 Chúc mừng!");
      updateProgress(userId, "mathquiz", level + 1, score + 500);
    } else {
      setAttempts(attempts - 1);
      if (attempts <= 1) {
        alert("😢 Bạn đã thua!");
      }
    }
  };
  

  return (
    <div>
      <h2>Tính toán</h2>
      <p>Câu hỏi: {question}</p>
      <p>Còn {attempts} lượt</p>
      <input
        type="text"
        value={guess}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*$/.test(value)) setGuess(value); // Chỉ cho phép nhập số
        }}
      />
      <button onClick={checkAnswer} disabled={!guess}>Kiểm tra</button>
    </div>
  );
}

export default MathQuiz;
