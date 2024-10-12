const container = document.getElementById('container');
const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const inputLayer = {
    nodes: 3,
    x: 100,
    y: window.innerHeight / 2 - 50,
};

const hiddenLayer = {
    nodes: 4,
    x: 300,
    y: window.innerHeight / 2 - 100,
};

const outputLayer = {
    nodes: 2,
    x: 500,
    y: window.innerHeight / 2 - 25,
};

function drawLayer(layerData) {
    for (let i = 0; i < layerData.nodes; i++) {
        const circle = new Konva.Circle({
            x: layerData.x,
            y: layerData.y + i * 40,
            radius: 20,
            fill: 'lightblue',
            stroke: 'black',
            strokeWidth: 2,
        });
        layer.add(circle);
    }
}

function drawConnections(fromLayer, toLayer) {
    const fromX = fromLayer.x;
    const fromCount = fromLayer.nodes;
    const toX = toLayer.x;
    const toCount = toLayer.nodes;

    for (let i = 0; i < fromCount; i++) {
        for (let j = 0; j < toCount; j++) {
            const line = new Konva.Line({
                points: [
                    fromX + 20, fromLayer.y + i * 40,
                    toX - 20, toLayer.y + j * 40,
                ],
                stroke: 'gray',
                strokeWidth: 2,
                lineCap: 'round',
                lineJoin: 'round',
            });
            layer.add(line);
        }
    }
}

// Draw layers and connections
drawLayer(inputLayer);
drawLayer(hiddenLayer);
drawLayer(outputLayer);
drawConnections(inputLayer, hiddenLayer);
drawConnections(hiddenLayer, outputLayer);

layer.draw();
