export function TreeAnimation(animations, speed, setIsSorting) {
  const nodes = document.getElementsByClassName("tree-node");

  animations.forEach((value, i) => {
    setTimeout(() => {
      for (let n of nodes) {
        if (parseInt(n.innerText) === value) {
          n.style.backgroundColor = "yellow";
          setTimeout(() => {
            n.style.backgroundColor = "green";
          }, speed / 2);
        }
      }
    }, i * speed);
  });

  setTimeout(() => {
    setIsSorting(false);
  }, animations.length * speed);
}
