import { db } from "../config/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

export const updateProgress = async (userId, game, level, score) => {
  // Cập nhật tiến trình
  await setDoc(doc(db, "progress", userId), {
    userId,
    game,
    level,
    score,
    timestamp: new Date().toISOString(),
  });

  // Lưu lịch sử chơi
  await addDoc(collection(db, "game_history", userId, "plays"), {
    game,
    level,
    score,
    timestamp: new Date().toISOString(),
  });
};
