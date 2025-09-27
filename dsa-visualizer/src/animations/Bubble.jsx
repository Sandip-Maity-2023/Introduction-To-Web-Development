export default function BubbleAnimation(animations, speed, setisSorting) {
  const bars = document.getElementsByClassName("bar");
  
  for (let i = 0; i < animations.length; i++) {
    let [baroneIdx, bartwoIdx, swap] = animations[i];
    let barOne = bars[baroneIdx];
    let bartwo = bars[bartwoIdx];
    setTimeout(() => {
      //highlight comparison
      barOne.style.backgroundColor = swap ? "red" : "yellow";
      bartwo.style.backgroundColor = swap ? "red" : "yellow";
      if (swap) {
        //swap heights
        const height = barOne.style.height;
        barOne.style.height = bartwo.style.height;
        bartwo.style.height = height;

        //swap values
        const content = barOne.innerText;
        barOne.innerText = bartwo.innerText;
        bartwo.innerText = content;
      }

      //reset to blue after a delay
      setTimeout(() => {
        barOne.style.backgroundColor = "blue";
        bartwo.style.backgroundColor = "blue";
      }, speed);
    }, i * speed);
  }

  //force all bars green after last animation
  setTimeout(() => {
    for (let j = 0; j < bars.length; j++) {
      setTimeout(() => {
        bars[j].style.backgroundColor = "green";
      }, j * speed);
    }
    setisSorting(false);
  }, animations.length * speed + speed);
}
