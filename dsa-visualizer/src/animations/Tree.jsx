import React from "react";

export default function Tree(animations, speed, setisSorting) {
  const nodes = document.getElementsByClassName("tree-node");

  for (let i = 0; i < animations.length; i++) {
    setTimeout(() => {
      const val = animations[i];
      for (let node of nodes) {
        if (node.innerHTML === String(val)) {
          node.style.backgroundColor = "yellow";
          setTimeout(() => {
            node.style.backgroundColor = "green";
          }, speed);
        }
      }
    }, i * speed);
  }

  setTimeout(() => {
    setisSorting(false);
  }, animations.length * speed);
}
