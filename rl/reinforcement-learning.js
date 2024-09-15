const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const numRows = canvas.height / gridSize;
const numCols = canvas.width / gridSize;

const actions = ['up', 'down', 'left', 'right'];
const qTable = {};

const agent = { x: 1, y: 1 };
const goal = { x: numCols - 2, y: numRows - 2 };

const alpha = 0.1; // Learning rate
const gamma = 0.9; // Discount factor
const epsilon = 0.1; // Exploration rate

function initializeQTable() {
    for (let x = 0; x < numCols; x++) {
        for (let y = 0; y < numRows; y++) {
            qTable[`${x},${y}`] = actions.reduce((obj, action) => {
                obj[action] = 0;
                return obj;
            }, {});
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'blue';
    ctx.fillRect(agent.x * gridSize, agent.y * gridSize, gridSize, gridSize);

    ctx.fillStyle = 'red';
    ctx.fillRect(goal.x * gridSize, goal.y * gridSize, gridSize, gridSize);
}

function moveAgent(action) {
    switch (action) {
        case 'up':
            agent.y = Math.max(0, agent.y - 1);
            break;
        case 'down':
            agent.y = Math.min(numRows - 1, agent.y + 1);
            break;
        case 'left':
            agent.x = Math.max(0, agent.x - 1);
            break;
        case 'right':
            agent.x = Math.min(numCols - 1, agent.x + 1);
            break;
    }
}

function chooseAction(state) {
    if (Math.random() < epsilon) {
        return actions[Math.floor(Math.random() * actions.length)];
    } else {
        const qValues = qTable[`${state.x},${state.y}`];
        return Object.keys(qValues).reduce((bestAction, action) => {
            return qValues[action] > qValues[bestAction] ? action : bestAction;
        });
    }
}

function updateQTable(state, action, reward, nextState) {
    const oldQValue = qTable[`${state.x},${state.y}`][action];
    const maxNextQValue = Math.max(...Object.values(qTable[`${nextState.x},${nextState.y}`]));
    qTable[`${state.x},${state.y}`][action] = oldQValue + alpha * (reward + gamma * maxNextQValue - oldQValue);
}

function train() {
    const state = { x: agent.x, y: agent.y };
    const action = chooseAction(state);
    moveAgent(action);
    const nextState = { x: agent.x, y: agent.y };

    const reward = (agent.x === goal.x && agent.y === goal.y) ? 10 : -1;
    updateQTable(state, action, reward, nextState);

    if (reward === 10) {
        agent.x = 1;
        agent.y = 1;
    }

    draw();
    requestAnimationFrame(train);
}

initializeQTable();
draw();
train();
