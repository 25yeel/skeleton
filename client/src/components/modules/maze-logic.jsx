const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;
// const INITIAL_RADIUS = 20;
// const MAX_PLAYER_SIZE = 200;
// const FOOD_SIZE = 2;
// const EDIBLE_RANGE_RATIO = 0.9;
// const EDIBLE_SIZE_RATIO = 0.9;
// const colors = ["red", "blue", "green", "yellow", "purple", "orange", "silver"]; // colors to use for players

const getPlayerPosition = () => {
    return {
        x: 0,
        y: MAP_HEIGHT/2,
    }
}

// Game state
const gameState = {
    win: false,
    player: null,
    tasks: [],
}

// Game logic
const generateMaze = () => {

}

const spawnPlayer = (playerId) => {
    gameState.playerId = {
        position: getPlayerPosition(),

    }
}

const movePlayer = (id, dir) => {
    // Initialize a desired position to move to
    const desiredPosition = {
        x: gameState.playerId.position.x,
        y: gameState.playerId.position.y,
    };

    // Calculate desired position
    if (dir === "up") {
        desiredPosition.y += 10;
    } else if (dir === "down") {
        desiredPosition.y -= 10;
    } else if (dir === "left") {
        desiredPosition.x -= 10;
    } else if (dir === "right") {
        desiredPosition.x += 10;
    }

    // Keep player in bounds of map
    if (desiredPosition.x > MAP_WIDTH) {
        desiredPosition.x = MAP_WIDTH;
    }
    if (desiredPosition.x < 0) {
        desiredPosition.x = 0;
    }
    if (desiredPosition.y > MAP_HEIGHT) {
        desiredPosition.y = MAP_HEIGHT;
    }
    if (desiredPosition.y < 0) {
        desiredPosition.y = 0;
    }

    // Keep player within walls of maze


    // Move player
    gameState.playerId.position = desiredPosition;
}

// Base game to get through maze
const generateTrivia = (taskNum) => {
    // trivia/tasks will get increasingly harder as player progresses
    if (taskNum === 1) {

    } else if (taskNum === 2) {

    } else if (taskNum === 3) {

    } else if (taskNum === 4) {

    }
}

const spawnTriviaBox = (taskNum) => {

}


const updateGameState = () => {

}

module.exports = {
    gameState,
    generateMaze,
    spawnPlayer,
    movePlayer,
    updateGameState,

}
