const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Define the vertices of a cube
const vertices = [
    {x: -50, y: -50, z: -50},
    {x:  50, y: -50, z: -50},
    {x:  50, y:  50, z: -50},
    {x: -50, y:  50, z: -50},
    {x: -50, y: -50, z:  50},
    {x:  50, y: -50, z:  50},
    {x:  50, y:  50, z:  50},
    {x: -50, y:  50, z:  50}
];

// Define the edges of the cube
const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]
];

// Perspective parameters
const perspective = 500;
const offsetX = canvas.width / 2;
const offsetY = canvas.height / 2;

function project(vertex) {
    const scale = perspective / (perspective + vertex.z);
    return {
        x: vertex.x * scale + offsetX,
        y: vertex.y * scale + offsetY
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    edges.forEach(([start, end]) => {
        const v1 = project(vertices[start]);
        const v2 = project(vertices[end]);
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
    });
    ctx.stroke();
}

draw();
