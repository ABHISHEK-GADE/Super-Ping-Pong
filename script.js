const ball = document.getElementById("ball");
        const playerPaddle = document.getElementById("player-paddle");
        const computerPaddle = document.getElementById("computer-paddle");
        const gameBoard = document.getElementById("game-board");
        const winScreen = document.getElementById("win-screen");
        const loseScreen = document.getElementById("lose-screen");
        const winRestartButton = document.getElementById("win-restart-button");
        const loseRestartButton = document.getElementById("lose-restart-button");
        const playerScoreDisplay = document.getElementById("player-score");
        const computerScoreDisplay = document.getElementById("computer-score");
        const speedMeter = document.getElementById("speed-meter");
        const playPauseButton = document.getElementById("play-pause-button");
        const resetButton = document.getElementById("reset-button");

        let ballX = gameBoard.clientWidth / 2 - ball.clientWidth / 2;
        let ballY = gameBoard.clientHeight / 2 - ball.clientHeight / 2;
        let ballSpeedX = 5;
        let ballSpeedY = 5;
        let playerPaddleX = gameBoard.clientWidth / 2 - playerPaddle.clientWidth / 2;
        let computerPaddleX = gameBoard.clientWidth / 2 - computerPaddle.clientWidth / 2;
        let playerScore = 0;
        let computerScore = 0;
        let hits = 0;
        let gameRunning = true;
        let gamePaused = false;

        function updateGameArea() {
            if (!gameRunning || gamePaused) return;

            ballX += ballSpeedX;
            ballY += ballSpeedY;

            if (ballX <= 0 || ballX >= gameBoard.clientWidth - ball.clientWidth) {
                ballSpeedX = -ballSpeedX;
            }

            if (ballY + ball.clientHeight >= playerPaddle.offsetTop &&
                ballY <= playerPaddle.offsetTop + playerPaddle.clientHeight &&
                ballX + ball.clientWidth >= playerPaddleX &&
                ballX <= playerPaddleX + playerPaddle.clientWidth) {
                ballSpeedY = -ballSpeedY;
                score(1, "Player");
            } else if (ballY <= computerPaddle.offsetTop + computerPaddle.clientHeight &&
                ballY + ball.clientHeight >= computerPaddle.offsetTop &&
                ballX + ball.clientWidth >= computerPaddleX &&
                ballX <= computerPaddleX + computerPaddle.clientWidth) {
                ballSpeedY = -ballSpeedY;
                score(1, "Computer");
            }

            if (ballY <= 0) {
                gameRunning = false;
                winScreen.style.display = "block";
            } else if (ballY >= gameBoard.clientHeight - ball.clientHeight) {
                gameRunning = false;
                loseScreen.style.display = "block";
            }

            ball.style.left = ballX + "px";
            ball.style.top = ballY + "px";

            const speed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
            speedMeter.textContent = `Speed: ${(speed * 5).toFixed(2)} kph`;
        }

        function movePlayerPaddle(event) {
            if (gameRunning && !gamePaused) {
                playerPaddleX = event.clientX - gameBoard.offsetLeft - playerPaddle.clientWidth / 2;
                if (playerPaddleX < 0) playerPaddleX = 0;
                if (playerPaddleX > gameBoard.clientWidth - playerPaddle.clientWidth) playerPaddleX = gameBoard.clientWidth - playerPaddle.clientWidth;
                playerPaddle.style.left = playerPaddleX + "px";
            }
        }

        function moveComputerPaddle() {
            if (gameRunning && !gamePaused) {
                computerPaddleX = ballX - computerPaddle.clientWidth / 2;
                if (computerPaddleX < 0) computerPaddleX = 0;
                if (computerPaddleX > gameBoard.clientWidth - computerPaddle.clientWidth) computerPaddleX = gameBoard.clientWidth - computerPaddle.clientWidth;
                computerPaddle.style.left = computerPaddleX + "px";
            }
        }

        function restartGame() {
            ballX = gameBoard.clientWidth / 2 - ball.clientWidth / 2;
            ballY = gameBoard.clientHeight / 2 - ball.clientHeight / 2;
            ballSpeedX = 5;
            ballSpeedY = 5;
            playerPaddleX = gameBoard.clientWidth / 2 - playerPaddle.clientWidth / 2;
            computerPaddleX = gameBoard.clientWidth / 2 - computerPaddle.clientWidth / 2;
            playerScore = 0;
            computerScore = 0;
            hits = 0;
            playerScoreDisplay.textContent = `Player: ${playerScore}`;
            computerScoreDisplay.textContent = `Computer: ${computerScore}`;
            speedMeter.textContent = "Speed: 0 kph";
            winScreen.style.display = "none";
            loseScreen.style.display = "none";
            gameRunning = true;
            gamePaused = false;
            playPauseButton.textContent = "Pause";
        }

        function togglePause() {
            if (gameRunning) {
                gamePaused = !gamePaused;
                playPauseButton.textContent = gamePaused ? "Play" : "Pause";
            }
        }

        function score(points, player) {
            hits++;
            if (hits >= 10) {
                hits = 0;
                ballSpeedX *= 1.2;
            }
            if (player === "Player") {
                playerScore += points;
                playerScoreDisplay.textContent = `Player: ${playerScore}`;
            } else if (player === "Computer") {
                computerScore += points;
                computerScoreDisplay.textContent = `Computer: ${computerScore}`;
            }
        }

        winRestartButton.addEventListener("click", restartGame);
        loseRestartButton.addEventListener("click", restartGame);
        playPauseButton.addEventListener("click", togglePause);
        resetButton.addEventListener("click", restartGame);
        gameBoard.addEventListener("mousemove", movePlayerPaddle);

        setInterval(updateGameArea, 20);
        setInterval(moveComputerPaddle, 20);

        function setGameBoardSize() {
            const gameBoard = document.getElementById("game-board");
            gameBoard.style.width = window.innerWidth + "px";
            gameBoard.style.height = "calc(100vh - 90px)"; // Adjusted height for the 390x90 space at the bottom
        }

        window.addEventListener("resize", setGameBoardSize);
        setGameBoardSize();