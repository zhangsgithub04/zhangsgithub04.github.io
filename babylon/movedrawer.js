const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Create a camera
const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Create a light
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Create a simple drawer model (a box)
const drawer = BABYLON.MeshBuilder.CreateBox("drawer", { width: 1, height: 0.5, depth: 0.5 }, scene);
drawer.position.y = 0; // Initial position

// Create an animation for the drawer opening
const openAnimation = new BABYLON.Animation(
    "openAnimation", 
    "position.z", 
    30, 
    BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
);

// Define animation keys
const keys = [];
keys.push({ frame: 0, value: drawer.position.z });
keys.push({ frame: 30, value: drawer.position.z + 1 }); // Move along z-axis (open)

// Set keys to the animation
openAnimation.setKeys(keys);

// Attach the animation to the drawer
drawer.animations.push(openAnimation);

// Start the animation when the scene is rendered
scene.registerBeforeRender(() => {
    if (scene.activeCamera) {
        // Start the animation when the drawer is clicked
        if (scene.pointerDown && !scene.isPointerOverMesh(drawer)) {
            scene.beginAnimation(drawer, 0, 30, false);
            scene.pointerDown = false; // Reset the pointer state
        }
    }
});

// Handle mouse click events
canvas.addEventListener("pointerdown", () => {
    scene.pointerDown = true;
});

// Render loop
engine.runRenderLoop(() => {
    scene.render();
});

// Handle browser resize
window.addEventListener("resize", () => {
    engine.resize();
});
