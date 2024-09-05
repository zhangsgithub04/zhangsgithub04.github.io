// Initialize Konva stage and layers
const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

// Create the player (the shooter)
const player = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 20,
    fill: 'blue',
    stroke: 'black',
    strokeWidth: 2
});
layer.add(player);

// Create enemies
const enemies = [];
const numEnemies = 10;

for (let i = 0; i < numEnemies; i++) {
    const enemy = new Konva.Circle({
        x: Math.random() * stage.width(),
        y: Math.random() * stage.height(),
        radius: 15,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 2
    });
    enemies.push(enemy);
    layer.add(enemy);
}

// Player movement
const speed = 5;
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            player.y(player.y() - speed);
            break;
        case 'ArrowDown':
            player.y(player.y() + speed);
            break;
        case 'ArrowLeft':
            player.x(player.x() - speed);
            break;
        case 'ArrowRight':
            player.x(player.x() + speed);
            break;
    }
    layer.batchDraw();
});

// Get audio elements
const shootSound = document.getElementById('shootSound');
const hitSound = document.getElementById('hitSound');
const explosionSound = document.getElementById('explosionSound');

// Shooting bullets
const bullets = [];
const bulletSpeed = 10;

document.addEventListener('click', (e) => {
    const pointerPosition = stage.getPointerPosition();
    const angle = Math.atan2(
        pointerPosition.y - player.y(),
        pointerPosition.x - player.x()
    );

    const bullet = new Konva.Line({
        points: [player.x(), player.y(), player.x() + Math.cos(angle) * 10, player.y() + Math.sin(angle) * 10],
        stroke: 'black',
        strokeWidth: 5
    });
    layer.add(bullet);
    bullets.push(bullet);

    // Play shoot sound
    shootSound.play();
});

// Update bullets position
const updateBullets = () => {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        const points = bullet.points();
        points[0] += Math.cos(Math.atan2(
            points[3] - points[1],
            points[2] - points[0]
        )) * bulletSpeed;
        points[1] += Math.sin(Math.atan2(
            points[3] - points[1],
            points[2] - points[0]
        )) * bulletSpeed;
        points[2] += Math.cos(Math.atan2(
            points[3] - points[1],
            points[2] - points[0]
        )) * bulletSpeed;
        points[3] += Math.sin(Math.atan2(
            points[3] - points[1],
            points[2] - points[0]
        )) * bulletSpeed;
        bullet.points(points);
        if (points[0] < 0 || points[1] < 0 || points[2] > stage.width() || points[3] > stage.height()) {
            bullet.destroy();
            bullets.splice(i, 1);
        }
    }
};

// Check for collisions between bullets and enemies
const checkCollisions = () => {
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            const bulletPos = bullet.points();
            const enemyPos = { x: enemy.x(), y: enemy.y() };
            const dx = bulletPos[0] - enemyPos.x;
            const dy = bulletPos[1] - enemyPos.y;
            if (Math.sqrt(dx * dx + dy * dy) < enemy.radius()) {
                hitSound.play();
                enemy.destroy();
                bullets[bulletIndex].destroy();
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
            }
        });
    });
};

// Game loop
const gameLoop = () => {
    updateBullets();
    checkCollisions();
    layer.batchDraw();
    requestAnimationFrame(gameLoop);
};

gameLoop();
