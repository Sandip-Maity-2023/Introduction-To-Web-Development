
//board
let board;
let board_width=360;
let board_height=640;
let context;

//bird
let bird_width=34;
let bird_height=24;
let birdX=board_width/4;
let birdY=board_height/2;

let b={
    x:birdX,
    y:birdY,
    width:bird_width,
    height:bird_height
};

//pipes
let pipe_array=[];
let pipe_width=64;
let pipe_height=512;
let pipeX=board_width;
let pipeY=0;

let top_pipe_Img;
let bottom_pipe_Img;

//physics
let velocityX=-2;
let velocityY=0;
let gravity=0.4;
let gameOver=false;
let score=0;

//sounds
let die_sound=new Audio("./soundeffects/026_sfx_die.wav");
let hit_sound=new Audio("./soundeffects/026_sfx_hit.wav");
let point_sound=new Audio("./soundeffects/026_sfx_point.wav");
let wing_sound=new Audio("./soundeffects/026_sfx_wing.wav");

let bird_img;

window.onload=()=>{
    board=document.getElementById("board");
    board.height=board_height;
    board.width=board_width;
    context=board.getContext("2d");

    bird_img=new Image();
    bird_img.src="026 flappybird.png";
    bird_img.onload=()=>{
        context.drawImage(bird_img,b.x,b.y,b.width,b.height);

    };

    top_pipe_Img=new Image();
    top_pipe_Img.src="026_top_pipe.png";
    
    bottom_pipe_Img=new Image();
    bottom_pipe_Img.src="026 bottom_pipe.png";

    requestAnimationFrame(update);
    setInterval(place_pipe,2000);

    document.addEventListener("keydown",moveBird);
    document.addEventListener("mousedown",moveBird);

};

function update(){
    requestAnimationFrame(update);
    //console.log(pipe_array);
    if(gameOver){
        return;
    }

    context.clearRect(0,0,board.width,board.height);

    //bird
    velocityY+=gravity;
    b.y=Math.max(b.y+velocityY,0);
    context.drawImage(bird_img,b.x,b.y,b.width,b.height);

    if(b.y>board_height){
    die_sound.play();
    gameOver=true;
}

    //pipes
    for(let i=0;i<pipe_array.length;i++){
        let pipe=pipe_array[i];
        pipe.x+=velocityX;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);

        if(!pipe.passed && b.x>pipe.x+pipe.width){
            score+=0.5;
            pipe.passed=true;
            if(score % 1===0)            //
                point_sound.play();       
             }


    if(detectCollision(b,pipe)){
        hit_sound.play();
        setTimeout(()=>die_sound.play(),200);
        gameOver=true;
    }
}

//remove off Screen-pipes
while(pipe_array.length>0 && pipe_array[0].x<-pipe_width){
    pipe_array.shift();
} 

//score display
//context.for(let in object) {
  context.fillStyle="white";
  context.font="45px sans-serif";
  context.fillText(score,5,45);       

  if(gameOver){
    context.fillText("GAME OVER",5,90);
  }
  requestAnimationFrame(update);
}


//
function place_pipe(){
    if(gameOver) return;

let random_pipeY=pipeY - pipe_height/4 - Math.random()*(pipe_height/2);



let openingSpace=board.height/4;

  let tp = {
    img: top_pipe_Img,
    x: pipeX,
    y: random_pipeY,
    width: pipe_width,
    height: pipe_height,
    passed: false
  };
  pipe_array.push(tp);

  let bp = {
    img: bottom_pipe_Img,
    x: pipeX,
    y: random_pipeY + pipe_height + openingSpace,
    width: pipe_width,
    height: pipe_height,
    passed: false
  };
  pipe_array.push(bp);
}
//

function moveBird(e) {
  if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX" || e.type === "mousedown" ) {
    velocityY = -6;
    wing_sound.play();
    swoosh_sound.play();

    if (gameOver) {
      b.y = birdY;
      pipe_array = [];
      score = 0;
      velocityY = 0;
      gameOver = false;
    }
  }
}

function detectCollision(a, b) {
  return (
    a.x < (b.x + b.width) && (a.x + a.width) > b.x && a.y < (b.y + b.height) &&
    (a.y + a.height)>b.y);
}


top_pipe_Img.onerror=()=>console.error("Top pipe image failed to load");
bottom_pipe_Img.onerror=()=>console.error("failesd0");



/*
//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 5;
let birdY = boardHeight / 2;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight
};

//pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

// sounds
let dieSound = new Audio("./soundeffects/sfx_die.wav");
let hitSound = new Audio("./soundeffects/sfx_hit.wav");
let pointSound = new Audio("./soundeffects/sfx_point.wav");
let wingSound = new Audio("./soundeffects/sfx_wing.wav");
let swooshSound = new Audio("./soundeffects/sfx_swooshing.wav");

let birdImg;

window.onload = () => {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  birdImg = new Image();
  birdImg.src = "026 flappybird.png";
  birdImg.onload = () => {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  topPipeImg = new Image();
  topPipeImg.src = "026_top_pipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "026 bottom_pipe.png";

  requestAnimationFrame(update);
  setInterval(placePipe, 2000);
  document.addEventListener("keydown", moveBird);
    document.addEventListener("mousedown", moveBird);
};

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }

  context.clearRect(0, 0, board.width, board.height);

  // bird
  velocityY += gravity;
  bird.y = Math.max(bird.y + velocityY, 0);
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > boardHeight) {
    dieSound.play();
    gameOver = true;
  }

  // pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
      if (score % 1 === 0) pointSound.play();
    }

    if (detectCollision(bird, pipe)) {
      hitSound.play();
      setTimeout(() => dieSound.play(), 200);
      gameOver = true;
    }
  }

  // remove off-screen pipes
  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
  }

  // score display
  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 5, 45);

  if (gameOver) {
    context.fillText("GAME OVER", 5, 90);
  }
}

function placePipe() {
  if (gameOver) {
    return;
  }

  let randompipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let openingSpace = board.height / 4;

  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randompipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false
  };
  pipeArray.push(topPipe);

  let bottompipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randompipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false
  };
  pipeArray.push(bottompipe);
}

function moveBird(e) {
  if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX" || e.type === "mousedown" ) {
    velocityY = -6;
    wingSound.play();
    swooshSound.play();

    if (gameOver) {
      bird.y = birdY;
      pipeArray = [];
      score = 0;
      velocityY = 0;
      gameOver = false;
    }
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
*/
