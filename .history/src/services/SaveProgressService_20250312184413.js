import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

// Hàm lưu hoặc cập nhật tiến trình của bé
export const updateProgress = async (userId, gameName, level, score) => {
  try {
    const userRef = doc(db, "progress", userId);

    // Cập nhật tiến trình của game cụ thể
    const progressUpdate = {
      [gameName]: { level, score, time: new Date().toISOString() },
    };

    // setDoc với { merge: true } để giữ dữ liệu cũ và cập nhật mới
    await setDoc(userRef, progressUpdate, { merge: true });

    console.log("Tiến trình đã được lưu/cập nhật!");
  } catch (error) {
    console.error("Lỗi khi lưu tiến trình:", error);
  }
};
