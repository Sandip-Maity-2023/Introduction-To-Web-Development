export default function MergeAnimation(animations, speed, setisSorting) {
  const bars = document.getElementsByClassName("bar");
  
  for (let i = 0; i < animations.length; i++) {
    const isColorChange = i % 3 !== 2; //color change
    if (isColorChange) {
      const [baroneIdx, bartwoIdx] = animations[i];
      const barone = bars[baroneIdx];
      const bartwo = bars[bartwoIdx];
      const color = i % 3 === 0 ? "yellow" : "blue";
      setTimeout(() => {
        barone.style.backgroundColor = color;
        bartwo.style.backgroundColor = color;
      }, i * speed);
    } else {
      setTimeout(() => {
        const [baroneIdx, newHeight] = animations[i];
        const barOne = bars[baroneIdx];
        barOne.style.height = `${newHeight}px`;
        barOne.innerHTML = newHeight;
      }, i * speed);
    }
  }

  //paint all bars green after sorting
  setTimeout(() => {
    for (let j = 0; j < bars.length; j++) {
      setTimeout(() => {
        bars[j].style.backgroundColor = "green";
      }, j * speed);
    }
    setisSorting(false);
  }, animations.length * speed);
}
