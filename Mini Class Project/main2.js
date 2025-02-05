let angle = 0; // Initial rotation angle
const container = document.querySelector(".container");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const filter = document.querySelector("#turbulence"); // Select SVG filter
let frames = 0;
const rad = Math.PI / 180;

// 3D Rotation on Button Click
nextBtn.addEventListener("click", () => {
    angle -= 72; // Rotate left
    container.style.transform = `perspective(1000px) rotateY(${angle}deg)`;
});

prevBtn.addEventListener("click", () => {
    angle += 72; // Rotate right
    container.style.transform = `perspective(1000px) rotateY(${angle}deg)`;
});

// Animated SVG Filter Effect
function draw() {
    let bfx = 0.005;
    let bfy = 0.005;
    frames += 0.5;
    bfx += 0.0025 * Math.sin(frames * rad);
    bfy += 0.0025 * Math.cos(frames * rad);
    let bf = `${bfx},${bfy}`;
    
    if (filter) {
        filter.setAttribute('baseFrequency', bf);
    }
    
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
