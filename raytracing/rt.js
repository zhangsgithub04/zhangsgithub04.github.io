const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const width = canvas.width;
const height = canvas.height;

const spheres = [
    { x: width / 2, y: height / 2, z: 1000, radius: 100, color: 'red' }
];

const light = { x: width / 2, y: 0, z: 500 };

function traceRay(x, y) {
    const rayDirection = { x: x - width / 2, y: y - height / 2, z: 1000 };
    const length = Math.sqrt(rayDirection.x ** 2 + rayDirection.y ** 2 + rayDirection.z ** 2);
    rayDirection.x /= length;
    rayDirection.y /= length;
    rayDirection.z /= length;

    let closestSphere = null;
    let minDist = Infinity;

    spheres.forEach(sphere => {
        const oc = { x: x - sphere.x, y: y - sphere.y, z: 1000 - sphere.z };
        const a = rayDirection.x ** 2 + rayDirection.y ** 2 + rayDirection.z ** 2;
        const b = 2 * (oc.x * rayDirection.x + oc.y * rayDirection.y + oc.z * rayDirection.z);
        const c = oc.x ** 2 + oc.y ** 2 + oc.z ** 2 - sphere.radius ** 2;
        const discriminant = b ** 2 - 4 * a * c;

        if (discriminant > 0) {
            const sqrtDisc = Math.sqrt(discriminant);
            const t1 = (-b - sqrtDisc) / (2 * a);
            const t2 = (-b + sqrtDisc) / (2 * a);
            const t = Math.min(t1, t2);

            if (t < minDist) {
                minDist = t;
                closestSphere = sphere;
            }
        }
    });

    if (closestSphere) {
        return closestSphere.color;
    } else {
        return 'black';
    }
}

function render() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const color = traceRay(x, y);
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

render();
