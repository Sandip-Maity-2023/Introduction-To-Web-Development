import React from "react";

export default function Binary(animations, speed, setisSorting) {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < animations.length; i++) {
    const [barIdx, found] = animations[i];
    const bar = bars[barIdx];

    setTimeout(() => {
      bar.style.backgroundColor = found ? "green" : "yellow";
      if (!found) {
        setTimeout(() => {
          bar.style.backgroundColor = "blue";
        }, speed);
      }
    }, i * speed);
  }
  setTimeout(() => {
    setisSorting(false);
  }, animations.length * speed);
}
