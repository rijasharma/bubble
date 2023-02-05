console.log("hello");

document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".container");
    const box = document.querySelector(".box");

    let boxLeft = 280;
    let boxBottom = 190;
    let score = 0;
    let games=false;

    const move = 25;
    const fall = 2;

    function start() {
        box.style.left = boxLeft + "px";
        box.style.bottom = boxBottom + "px";
    }
    start();

    function control(e) {

        if (e.keyCode === 37) {
            moveLeft();
        }

        if (e.keyCode === 39) {
            moveRight();
        }
    }

    function moveLeft() {
        if (boxLeft > 5) {
            boxLeft -= move;
            start();
        }

    }


    function moveRight() {
        if (boxLeft < 450) {
            boxLeft += move;
            start();
        }
    }


    document.addEventListener("keyup", control);


    function createBubble() {

        let bubbleLeft = Math.random() * 180 + 160;
        let bubbleBottom = 790;

        const bubble = document.createElement("div");
        if(!games) bubble.classList.add("bubble");
        bubble.style.left = bubbleLeft + "px";
        bubble.style.bottom = bubbleBottom + "px";
        bubble.style.backgroundColor = "rgb(197, 13," +Math.random()*10+20 + ")";
        container.appendChild(bubble);


        function moveBubble() {
            bubbleBottom -= fall;
            bubble.style.left = bubbleLeft + "px";
            bubble.style.bottom = bubbleBottom + "px";

            if (bubbleBottom <= 50) {
                bubble.remove();
            }
            if ((bubbleBottom < 200 && bubbleBottom > 150) && (boxLeft <= bubbleLeft + 20 && boxLeft >= bubbleLeft - 50) && !games) {
                bubble.remove();
                score++;
                document.getElementById("score").innerHTML=Math.floor(score/22)+1;
                // console.log("score is "+Math.floor(score/22)+1);
            }
        }

        let bubbleTimerId = setInterval(moveBubble, 10);
        if(!games) setTimeout(createBubble, 500);
    }

    createBubble();


    function createBarrier() {
        let barrierLeft = (Math.random() * 70 + 90) * 2;
        let barrierBottom = 770;

        const barrier = document.createElement("div");
        if(!games) barrier.classList.add("barrier");
        barrier.style.left = barrierLeft + "px";
        barrier.style.bottom = barrierBottom + "px";
        container.appendChild(barrier);

        function barrierMove() {
            barrierBottom -= fall;
            barrier.style.left = barrierLeft + "px";
            barrier.style.bottom = barrierBottom + "px";

            if (barrierBottom <= 50) {
                barrier.remove();
            }

            if ((barrierBottom < 200 && barrierBottom > 150)  && (boxLeft >= barrierLeft - 50 && boxLeft <= barrierLeft + 70 )) {
                

                clearInterval(barrierTimerId);
                gameover();
            }
            
        }

        let barrierTimerId=setInterval(barrierMove,10);
        if(!games) setTimeout(createBarrier,Math.floor(Math.random()*2000)+1500);
    }

    createBarrier();


    function gameover() {
        console.log("gameover");
        document.removeEventListener("keyup", control);
        games = true;
        overButton()
    }

    // GAME-OVER BUTTON

    function overButton() {
        const button = document.createElement("div");
        const header = document.createElement("h1");
        button.classList.add("game-over");
        header.classList.add("header");
        button.innerHTML = "RESTART";
        header.innerHTML = "GAME-OVER";
        button.style.backgroundColor = "red";
        container.appendChild(button);
        container.appendChild(header);
        button.addEventListener("click", () => {
            window.location.reload();
        }, 1000);
    }

});