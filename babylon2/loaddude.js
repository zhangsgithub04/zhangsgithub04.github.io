<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Babylon.js Dude Model</title>
    <script src="https://cdn.babylonjs.com/babylon.js"></script>
</head>
<body>
    <canvas id="renderCanvas"></canvas>
    <script>
        const canvas = document.getElementById("renderCanvas");
        const engine = new BABYLON.Engine(canvas, true);
        const scene = new BABYLON.Scene(engine);
        
        const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
        
        // Load dude.babylon model
        BABYLON.SceneLoader.Append("", "dude.babylon", scene, function () {
            scene.createDefaultCameraOrLight(true, true, true);
        });
        
        engine.runRenderLoop(() => {
            scene.render();
        });
        
        window.addEventListener("resize", () => {
            engine.resize();
        });
    </script>
</body>
</html>
