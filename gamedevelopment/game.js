const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load images
const background1 = new Image();
background1.src = 'background1.png'; // Replace with your image path
const background2 = new Image();
background2.src = 'background2.png'; // Replace with your image path
const playerImage = new Image();
playerImage.src = 'player.png'; // Replace with your image path

// Player properties
const player = {
    x: 50,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    speed: 5
};

// Parallax layers
const layers = [
    { img: background1, x: 0, speed: 0.5 },
    { img: background2, x: 0, speed: 1 }
];

// Handle player movement
function movePlayer() {
    if (keys['ArrowRight']) player.x += player.speed;
    if (keys['ArrowLeft']) player.x -= player.speed;
}

// Update game elements
function update() {
    movePlayer();
    
    // Update parallax layers
    layers.forEach(layer => {
        layer.x -= layer.speed;
        if (layer.x <= -canvas.width) {
            layer.x = 0;
        }
    });
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw parallax layers
    layers.forEach(layer => {
        ctx.drawImage(layer.img, layer.x, 0, canvas.width, canvas.height);
        if (layer.x < 0) {
            ctx.drawImage(layer.img, layer.x + canvas.width, 0, canvas.width, canvas.height);
        }
    });
    
    // Draw player
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Key controls
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Start the game loop
gameLoop();
