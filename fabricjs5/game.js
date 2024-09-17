<script>
    // Initialize the Fabric.js canvas
    const canvas = new fabric.Canvas('canvas');
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.setWidth(width);
    canvas.setHeight(height);

    // Create player
    const player = new fabric.Rect({
        left: width / 2 - 25,
        top: height - 50,
        fill: 'blue',
        width: 50,
        height: 20,
        selectable: false
    });
    canvas.add(player);

    // Player movement
    document.addEventListener('keydown', (event) => {
        const step = 10;
        if (event.key === 'ArrowLeft') {
            player.left = Math.max(0, player.left - step);
        } else if (event.key === 'ArrowRight') {
            player.left = Math.min(width - player.width, player.left + step);
        }
        canvas.renderAll();
    });

    // Shoot bullets
    document.addEventListener('keydown', (event) => {
        if (event.key === ' ') { // Space key to shoot
            shootBullet();
        }
    });

    function shootBullet() {
        const bullet = new fabric.Circle({
            left: player.left + player.width / 2 - 5,
            top: player.top - 10,
            fill: 'red',
            radius: 5,
            selectable: false
        });
        canvas.add(bullet);

        const interval = setInterval(() => {
            bullet.top -= 5;
            if (bullet.top < 0) {
                clearInterval(interval);
                canvas.remove(bullet);
            }
            canvas.renderAll();
        }, 20);
    }
</script>
