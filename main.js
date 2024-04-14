var canvas = document.getElementById("HeartScreen");
var ctx = canvas.getContext("2d");
var hearts = []; // 하트 배열

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class HeartObject {
    constructor(col, radius, positionX, positionY, speed, rotationSpeed, directionX, directionY){
        this.color = col; 
        this.radius = radius;
        this.positionX = positionX;  //canvas 위치값
        this.positionY = positionY;  //canvas 위치값
        this.speed = speed;
        this.rotationSpeed = rotationSpeed;
        this.directionX = directionX; // 하트 X위치 변경값
        this.directionY = directionY;//  하트 Y위치 변경값
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < hearts.length; i++) {
        var heart = hearts[i];

        ctx.beginPath();
        for(var angle=0; angle<Math.PI*2; angle += 0.01)
        {
            var x = heart.positionX + heart.radius * 16 * Math.pow(Math.sin(angle), 3);
            var y = heart.positionY - heart.radius * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
            ctx.lineTo(x, y);
        }
        ctx.fillStyle = heart.color;
        ctx.fill();
        ctx.closePath();

         // 하트 이동
        heart.positionX += heart.speed * heart.directionX;
        heart.positionY += heart.speed * heart.directionY;
        
        // 하트 회전
        ctx.translate(heart.positionX, heart.positionY);
        ctx.rotate(heart.rotationSpeed);
        ctx.translate(-heart.positionX, -heart.positionY);
    }
}

function RandomColor()
{
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
     return color;
}

function RandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createHeart(event) {
    if (hearts.length >= 100) 
    {
        return; // 최대 100개의 하트만 유지
    }

    var col = RandomColor();
    var radius = RandomInt(5, 20);
    var positionX = event.clientX;
    var positionY = event.clientY;
    var speed = Math.random() * 3 + 1;
    var rotationSpeed = Math.random() * 0.2 - 0.1;
    var directionX = Math.random() * 2 - 1;
    var directionY = Math.random() * 2 - 1;

    var heart = new HeartObject(col, radius, positionX, positionY, speed, rotationSpeed, directionX, directionY);
    hearts.push(heart);
}

canvas.addEventListener("mousemove", function(event) {
    createHeart(event);
});

setInterval(draw, 200); 