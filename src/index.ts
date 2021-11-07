import { Engine, PIXIScene } from 'alge';

// Game instantiation
const game = new Engine({fullscreen: true, gameScale: 3});

// Scenes creation
let mainScene: PIXIScene = game.getManager("Scene").createScene("main");

// Starting game
game.run();
