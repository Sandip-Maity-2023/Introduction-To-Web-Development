// animations.js
import React from "react";

/* ===========================
   Binary Search Animation
=========================== */
/* ===========================
   Linear Search Animation
=========================== */
export function LinearAnimation(animations, speed, setIsSorting) {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < animations.length; i++) {
    const [barIdx, found] = animations[i];
    const bar = bars[barIdx];

    setTimeout(() => {
      if (found === undefined) return;

      // Highlight bar being checked
      bar.style.backgroundColor = found ? "green" : "yellow";

      // If not found, reset it after delay
      if (!found) {
        setTimeout(() => {
          bar.style.backgroundColor = "blue";
        }, speed);
      }
    }, i * speed);
  }

  // Stop animation at the end
  setTimeout(() => {
    setIsSorting(false);
  }, animations.length * speed);
}






export function BinaryAnimation(animations, speed, setIsSorting) {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < animations.length; i++) {
    const [barIdx, found] = animations[i];
    const bar = bars[barIdx];

    setTimeout(() => {
      // Skip invalid frames
      if (barIdx === undefined || !bar) return;

      // Highlight current midpoint
      bar.style.backgroundColor = "yellow";

      if (found === true) {
        bar.style.backgroundColor = "green"; // found bar
      } else if (found === false) {
        // reset only if not found
        setTimeout(() => {
          if (bar.style.backgroundColor !== "green") {
            bar.style.backgroundColor = "blue";
          }
        }, speed);
      }
    }, i * speed);
  }

  // stop after animation
  setTimeout(() => {
    setIsSorting(false);
  }, animations.length * speed);
}

/* ===========================
   Bubble Sort Animation
=========================== */
export function BubbleAnimation(animations, speed, setIsSorting) {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < animations.length; i++) {
    const [barOneIdx, barTwoIdx, swap] = animations[i];
    const barOne = bars[barOneIdx];
    const barTwo = bars[barTwoIdx];

    setTimeout(() => {
      barOne.style.backgroundColor = swap ? "red" : "yellow";
      barTwo.style.backgroundColor = swap ? "red" : "yellow";

      if (swap) {
        const height = barOne.style.height;
        barOne.style.height = barTwo.style.height;
        barTwo.style.height = height;

        const content = barOne.innerText;
        barOne.innerText = barTwo.innerText;
        barTwo.innerText = content;
      }

      setTimeout(() => {
        barOne.style.backgroundColor = "blue";
        barTwo.style.backgroundColor = "blue";
      }, speed);
    }, i * speed);
  }

  setTimeout(() => {
    for (let j = 0; j < bars.length; j++) {
      setTimeout(() => {
        bars[j].style.backgroundColor = "green";
      }, j * speed);
    }
    setIsSorting(false);
  }, animations.length * speed + speed);
}

/* ===========================
   Insertion Sort Animation
=========================== */
export function InsertionAnimation(animations, speed, setIsSorting) {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < animations.length; i++) {
    const [barOneIdx, barTwoIdx, swap] = animations[i];
    const barOne = bars[barOneIdx];
    const barTwo = bars[barTwoIdx];

    setTimeout(() => {
      barOne.style.backgroundColor = swap ? "red" : "yellow";
      barTwo.style.backgroundColor = swap ? "red" : "yellow";

      if (swap) {
        const height = barOne.style.height;
        barOne.style.height = barTwo.style.height;
        barTwo.style.height = height;

        const content = barOne.innerText;
        barOne.innerText = barTwo.innerText;
        barTwo.innerText = content;
      }

      setTimeout(() => {
        barOne.style.backgroundColor = "blue";
        barTwo.style.backgroundColor = "blue";
      }, speed);
    }, i * speed);
  }

  setTimeout(() => {
    for (let j = 0; j < bars.length; j++) {
      setTimeout(() => {
        bars[j].style.backgroundColor = "green";
      }, j * speed);
    }
    setIsSorting(false);
  }, animations.length * speed);
}

/* ===========================
   Merge Sort Animation
=========================== */
export function MergeAnimation(animations, speed, setIsSorting) {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < animations.length; i++) {
    const isColorChange = i % 3 !== 2;

    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOne = bars[barOneIdx];
      const barTwo = bars[barTwoIdx];
      const color = i % 3 === 0 ? "yellow" : "blue";

      setTimeout(() => {
        barOne.style.backgroundColor = color;
        barTwo.style.backgroundColor = color;
      }, i * speed);
    } else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOne = bars[barOneIdx];
        barOne.style.height = `${newHeight}px`;
        barOne.innerText = newHeight;
      }, i * speed);
    }
  }

  setTimeout(() => {
    for (let j = 0; j < bars.length; j++) {
      setTimeout(() => {
        bars[j].style.backgroundColor = "green";
      }, j * speed);
    }
    setIsSorting(false);
  }, animations.length * speed);
}

/* ===========================
   Quick Sort Animation
=========================== */
export function QuickAnimation(animations, speed, setIsSorting) {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < animations.length; i++) {
    const [barOneIdx, barTwoIdx, swap] = animations[i];
    const barOne = bars[barOneIdx];
    const barTwo = bars[barTwoIdx];

    setTimeout(() => {
      barOne.style.backgroundColor = swap ? "red" : "yellow";
      barTwo.style.backgroundColor = swap ? "red" : "yellow";

      if (swap) {
        const height = barOne.style.height;
        barOne.style.height = barTwo.style.height;
        barTwo.style.height = height;

        const content = barOne.innerText;
        barOne.innerText = barTwo.innerText;
        barTwo.innerText = content;
      }

      setTimeout(() => {
        barOne.style.backgroundColor = "blue";
        barTwo.style.backgroundColor = "blue";
      }, speed);
    }, i * speed);
  }

  setTimeout(() => {
    for (let j = 0; j < bars.length; j++) {
      setTimeout(() => {
        bars[j].style.backgroundColor = "green";
      }, j * speed);
    }
    setIsSorting(false);
  }, animations.length * speed + speed);
}

/* ===========================
   Selection Sort Animation
=========================== */
export function SelectionAnimation(animations, speed, setIsSorting) {
  const bars = document.getElementsByClassName("bar");

  for (let i = 0; i < animations.length; i++) {
    const [barOneIdx, barTwoIdx, swap] = animations[i];
    const barOne = bars[barOneIdx];
    const barTwo = bars[barTwoIdx];

    setTimeout(() => {
      barOne.style.backgroundColor = swap ? "red" : "yellow";
      barTwo.style.backgroundColor = swap ? "red" : "yellow";

      if (swap) {
        const height = barOne.style.height;
        barOne.style.height = barTwo.style.height;
        barTwo.style.height = height;

        const content = barOne.innerText;
        barOne.innerText = barTwo.innerText;
        barTwo.innerText = content;
      }

      setTimeout(() => {
        barOne.style.backgroundColor = "blue";
        barTwo.style.backgroundColor = "blue";
      }, speed);
    }, i * speed);
  }

  setTimeout(() => {
    for (let i = 0; i < bars.length; i++) {
      setTimeout(() => {
        bars[i].style.backgroundColor = "green";
      }, i * speed);
    }
    setIsSorting(false);
  }, animations.length * speed);
}
