const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Create a camera
const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Create a light
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Function to create a stickman
function createStickman() {
    const body = BABYLON.MeshBuilder.CreateCylinder("body", { height: 2, diameter: 0.2 }, scene);
    body.position.y = 1; // Position body at center

    const head = BABYLON.MeshBuilder.CreateSphere("head", { diameter: 0.5 }, scene);
    head.position.y = 2.5; // Position head above body

    const leftArm = BABYLON.MeshBuilder.CreateCylinder("leftArm", { height: 1, diameter: 0.1 }, scene);
    leftArm.rotation.z = Math.PI / 4; // Angle arm outward
    leftArm.position.y = 1.5; // Position left arm
    leftArm.position.x = -0.75; // Move left

    const rightArm = BABYLON.MeshBuilder.CreateCylinder("rightArm", { height: 1, diameter: 0.1 }, scene);
    rightArm.rotation.z = -Math.PI / 4; // Angle arm outward
    rightArm.position.y = 1.5; // Position right arm
    rightArm.position.x = 0.75; // Move right

    const leftLeg = BABYLON.MeshBuilder.CreateCylinder("leftLeg", { height: 1, diameter: 0.1 }, scene);
    leftLeg.position.y = 0; // Position left leg
    leftLeg.position.x = -0.5; // Move left

    const rightLeg = BABYLON.MeshBuilder.CreateCylinder("rightLeg", { height: 1, diameter: 0.1 }, scene);
    rightLeg.position.y = 0; // Position right leg
    rightLeg.position.x = 0.5; // Move right

    return {
        body,
        head,
        leftArm,
        rightArm,
        leftLeg,
        rightLeg,
    };
}

// Create the stickman
const stickman = createStickman();

// Function to move the stickman
let direction = 0.1; // Movement direction
scene.registerBeforeRender(() => {
    stickman.body.position.x += direction; // Move stickman in x direction

    // Reverse direction when reaching certain bounds
    if (stickman.body.position.x > 3 || stickman.body.position.x < -3) {
        direction *= -1; // Reverse movement
    }
});

// Render loop
engine.runRenderLoop(() => {
    scene.render();
});

// Handle browser resize
window.addEventListener("resize", () => {
    engine.resize();
});
