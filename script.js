document.addEventListener('DOMContentLoaded', () => {
    // const gameBoard = document.getElementById('game-board');
    // let snake = [{ x: 0, y: 0 }];
    // let food = getRandomPosition();
    // let direction = 'right';
    // let gameInterval;


    function soundEffects(url) {
      let a = new Audio(url)
      a.play()
    }
  
    
   
    

    const gameBoard = document.getElementById('game-board');
    const pauseButton = document.getElementById('pause-btn');

    const gridSize = 20;
    const snakeSize = 20;
    const initialSnakeLength = 3;

    let snake = [];
    let direction = 'right';
    let food = getRandomPosition();
    let gameInterval;
    let isPaused = false;
    

  
    function getRandomPosition() {
      const x = Math.floor(Math.random() * 15) * 20;
      const y = Math.floor(Math.random() * 15) * 20;
      return { x, y };
    }

    function initializeGame() {
      snake = [];
      for (let i = initialSnakeLength - 1; i >= 0; i--) {
        snake.push({ x: i * snakeSize, y: 0 });
      }
      direction = 'right';
      food = getRandomPosition();
      isPaused = false;

      pauseButton.innerHTML= '<i class="fa-solid fa-pause"></i>';
    // pauseButton.textContent = 'Pause';
    }
  
    function draw() {
      gameBoard.innerHTML = '';

      
      snake.forEach((segment, index) => {
        const snakeElement = document.createElement('div');
        if(index==0){

          snakeElement.classList.add('snakeHead');
          snakeElement.innerHTML = '<i class="fa-solid fa-glasses"></i>';
          snakeElement.style.left = `${segment.x}px`;
          snakeElement.style.top = `${segment.y}px`;

          switch(direction){
            case 'up':
              snakeElement.style.transform = 'rotate(180deg)';
              break;
            case 'down':
              snakeElement.style.transform = 'rotate(0deg)';
              break;
            case 'left':
              snakeElement.style.transform = 'rotate(90deg)';
              break;
            case 'right':
              snakeElement.style.transform = 'rotate(-90deg)';
              break;
          }

        }
        else if(index == snake.length -1){
          snakeElement.classList.add('snakeTail');
          snakeElement.innerHTML = '<i class="fa-solid fa-ghost fa-2x"></i>';
          snakeElement.style.left = `${segment.x}px`;
          snakeElement.style.top = `${segment.y}px`;

          switch(direction){
            case 'up':
              snakeElement.style.transform = 'rotate(0deg)';
              break;
            case 'down':
              snakeElement.style.transform = 'rotate(180deg)';
              break;
            case 'left':
              snakeElement.style.transform = 'rotate(-90deg)';
              break;
            case 'right':
              snakeElement.style.transform = 'rotate(90deg)';
              break;
          }
         }
        else{

          snakeElement.classList.add('snake');
          snakeElement.innerHTML = "O";
          snakeElement.style.left = `${segment.x}px`;
          snakeElement.style.top = `${segment.y}px`;

        }
        
        gameBoard.appendChild(snakeElement);
      });
  
      const foodElement = document.createElement('div');
      foodElement.classList.add('food');
      foodElement.style.left = `${food.x}px`;
      foodElement.style.top = `${food.y}px`;
      gameBoard.appendChild(foodElement);
    }
  
    function move() {

      if(isPaused) return;

      const head = { ...snake[0] };


      switch (direction) {
        case 'up':
          head.y -= 20;
          break;
        case 'down':
          head.y += 20;
          break;
        case 'left':
          head.x -= 20;
          break;
        case 'right':
          head.x += 20;
          break;
      }
  
      snake.unshift(head);
  
      if (head.x === food.x && head.y === food.y) {
        soundEffects("http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3");
        food = getRandomPosition();
      } else {
        snake.pop();
      }
  
      if (checkCollision()) {
        gameOver();
      }
  
      draw();
    }
  
    function checkCollision() {
      const head = snake[0];
      return (
        head.x < 0 ||
        head.x >= 300 ||
        head.y < 0 ||
        head.y >= 300 ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
      );
    }
  
    function gameOver() {
      alert('Game Over! \n \t Your score: ' + (snake.length - 3) + '\t');

      const curuser = localStorage.getItem('curuser');
      
      const score = snake.length-3;

      const userscore = {curuser, score};

      const prevscore = JSON.parse(localStorage.getItem('score'));

      if(prevscore){
        if(prevscore.score<score){
          localStorage.removeItem('score');
          localStorage.setItem('score', JSON.stringify(userscore));
        }
      }else{
        localStorage.setItem('score', JSON.stringify(userscore));
      }


      initializeGame();
    }
    
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case 'ArrowUp':
          if (direction !== 'down') {
            direction = 'up';
          }
          break;
        case 'ArrowDown':
          if (direction !== 'up') {
            direction = 'down';
          }
          break;
        case 'ArrowLeft':
          if (direction !== 'right') {
            direction = 'left';
          }
          break;
        case 'ArrowRight':
          if (direction !== 'left') {
            direction = 'right';
          }
          break;
      }
    });



    let startX, startY, endX, endY;

document.addEventListener('touchstart', (event) => {
    event.preventDefault();
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

document.addEventListener('touchmove', (event) => {
    // Prevent scrolling when swiping
    event.preventDefault();
});

document.addEventListener('touchend', (event) => {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
            if (direction !== 'left') {
                direction = 'right';
            }
        } else {
            if (direction !== 'right') {
                direction = 'left';
            }
        }
    } else {
        // Vertical swipe
        if (deltaY > 0) {
            if (direction !== 'up') {
                direction = 'down';
            }
        } else {
            if (direction !== 'down') {
                direction = 'up';
            }
        }
    }
});


    

    pauseButton.addEventListener('click', togglePause);

  function togglePause() {
    isPaused = !isPaused;
    pauseButton.innerHTML = isPaused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>';
  }
  
  document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
      isPaused = !isPaused;
      pauseButton.innerHTML = isPaused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>';
    }
});

    initializeGame();
  
    gameInterval = setInterval(move, 200);
  });
  
