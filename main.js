import { GameLoop } from './src/GameLoop';
import { Main } from './src/objects/Main/Main';
import { OutdoorLevelOne } from './src/levels/OutdoorLevelOne';

// The canvas is an HTML element that allows for graphics rendering.
// A canvas' context is the JavaScript object that provides methods, properties, and objects for manipulating said graphics on the canvas.
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Main Game Object of the current Level.
const mainScene = new Main();
mainScene.setLevel(new OutdoorLevelOne());

// Entry points for the mainScene update and draw methods.
const update = (delta) => {
	mainScene.stepEntry(delta, mainScene);
};
const draw = () => {
	// Clear anything stale
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

	// We want the sky backround to always be static, so draw it outside the relative camera position.
	mainScene.drawBackground(ctx);

	// Save the current state (for camera offset)
	ctx.save();

	// Offset by camera position
	if (mainScene.camera) {
		ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);
	}

	// Draw objects in the mounted scene
	mainScene.draw(ctx, 0, 0);

	// Restore to original state
	ctx.restore();

	// Draw anything above the game world
	mainScene.drawForeground(ctx);
};

// Pass in the update and draw methods to kick off GameLoop and Main Scene
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
