import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Hàm cập nhật tiến trình game
export const updateProgress = async (userId, gameName, level, score) => {
  try {
    const userRef = doc(db, "progress", userId);
    const docSnap = await getDoc(userRef);

    let progressData = {};
    if (docSnap.exists()) {
      progressData = docSnap.data();
    }

    // Cập nhật tiến trình của gconst checkAnswer = () => {
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
ame cụ thể
    progressData[gameName] = { level, score, time: new Date().toISOString() };

    await setDoc(userRef, progressData);
    console.log("Tiến trình đã được cập nhật!");
  } catch (error) {
    console.error("Lỗi khi cập nhật tiến trình:", error);
  }
};
