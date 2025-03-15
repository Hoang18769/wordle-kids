import { db } from "./src/config/firebase.js"; // Cần đổi đuôi `.js` nếu Firebase đang dùng ESM
import { collection, addDoc } from "firebase/firestore";

const addQuestions = async () => {
  const questions = [
    { game: "word", question: "Loài vật kêu 'gâu gâu'?", answer: "chó" },
    { game: "word", question: "Trái cây màu đỏ, thường dùng ép nước?", answer: "dâu" },
    { game: "math", question: "5 + 7 = ?", answer: "12" },
    { game: "math", question: "10 - 3 = ?", answer: "7" }
  ];

  for (let q of questions) {
    await addDoc(collection
        (db, "questions"), q);
  }
  console.log("Thêm câu hỏi thành công!");
};

addQuestions().then(() => process.exit());
