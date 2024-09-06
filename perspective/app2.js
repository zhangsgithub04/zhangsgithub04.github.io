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

// Perspective and zoom parameters
let perspective = 500;
const offsetX = canvas.width / 2;
const offsetY = canvas.height / 2;

// Rotation angles
let angleX = 0;
let angleY = 0;
let angleZ = 0;

// Handle mouse wheel for zooming
canvas.addEventListener('wheel', (event) => {
    perspective -= event.deltaY * 0.1;
    if (perspective < 100) perspective = 100;  // Prevent too close zoom
    if (perspective > 1000) perspective = 1000;  // Prevent too far zoom
});

// Rotation matrices
function rotateX(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
        [1, 0, 0],
        [0, cos, -sin],
        [0, sin, cos]
    ];
}

function rotateY(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
        [cos, 0, sin],
        [0, 1, 0],
        [-sin, 0, cos]
    ];
}

function rotateZ(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
        [
