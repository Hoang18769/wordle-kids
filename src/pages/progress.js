import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const userId = "abc123"; // Lấy từ hệ thống Auth sau này

function Progress() {
  const [progress, setProgress] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const docRef = doc(db, "progress", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProgress(docSnap.data());
      }
    };

    const fetchHistory = async () => {
      const querySnapshot = await getDocs(collection(db, "game_history", userId, "plays"));
      const historyData = querySnapshot.docs.map((doc) => doc.data());
      setHistory(historyData);
    };

    fetchProgress();
    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Tiến trình của bạn</h2>
      {progress ? (
        <div>
          <p>🎮 Game: {progress.game}</p>
          <p>📌 Cấp độ: {progress.level}</p>
          <p>⭐ Điểm số: {progress.score}</p>
        </div>
      ) : (
        <p>Chưa có tiến trình nào!</p>
      )}

      <h3>Lịch sử chơi</h3>
      {history.length > 0 ? (
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              {item.game} - Level {item.level} - {item.score} điểm - {item.timestamp}
            </li>
          ))}
        </ul>
      ) : (
        <p>Chưa có lịch sử chơi.</p>
      )}
    </div>
  );
}

export default Progress;
