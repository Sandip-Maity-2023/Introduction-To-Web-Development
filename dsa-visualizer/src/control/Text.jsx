import React, { useState, useEffect } from "react";

const TextLoop = ({ texts, delay = 1500 }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, delay);
    return () => clearInterval(interval);
  }, [texts, delay]);
  return <span>{texts[index]}</span>;
};

export default TextLoop;
