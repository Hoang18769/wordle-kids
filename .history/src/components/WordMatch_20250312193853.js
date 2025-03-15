const checkAnswer = () => {
  if (guess.toLowerCase() === questions[level]?.answer.toLowerCase()) {
    const newScore = score + 500;
    if (level < questions.length - 1) {
      setLevel(level + 1);
      setScore(newScore);
      updateProgress(userId, "wordmatch", level + 1, newScore);
    } else {
      alert("🎉 Chúc mừng! Bạn đã hoàn thành tất cả màn chơi!");
    }
    setGuess("");
  } else {
    setAttempts(attempts - 1);
    if (attempts <= 1) {
      alert("😢 Bạn đã thua! Chơi lại nhé!");
      setLevel(0);
      setScore(0);
      setAttempts(3);
      updateProgress(userId, "wordmatch", 0, 0);
    }
  }
};
