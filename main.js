import { GameLoop } from './src/GameLoop';
import { resources } from './src/Resource';
import { Sprite } from './src/Sprite';
import { Vector2 } from './src/Vector2';
import { Input } from './src/Input';
import { GameObject } from './src/GameObject';
import { Hero } from './src/objects/Hero/Hero';
import { Camera } from './src/Camera';
import { Rod } from './src/objects/Rod/Rod';
import { gridCells } from './src/helpers/grid';

// The canvas is an HTML element that allows for graphics rendering.
// A canvas' context is the JavaScript object that provides methods, properties, and objects for manipulating said graphics on the canvas.
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Main Game Object of the current Level.
const mainScene = new GameObject({});

// Give the mainScene the Input class of eventListeners so it can be referenced by children.
mainScene.input = new Input();

// Sprites
const sky = new Sprite({
	resource: resources.images.sky,
	frameSize: new Vector2(320, 180)
});
const map = new Sprite({
	resource: resources.images.map,
	frameSize: new Vector2(320, 180),
	position: new Vector2(120, 40)
});
const hero = new Hero(gridCells(10), gridCells(3));
const rod = new Rod(gridCells(11), gridCells(4));

// Camera
const camera = new Camera();

// Add sprites to mainScene so they trigger in the class' update and render functions
mainScene.addChildren([map, hero, camera, rod]);

// Entry points for the mainScene update and draw methods.
const update = (delta) => {
	mainScene.stepEntry(delta, mainScene);
};
const draw = () => {
	// Clear anything stale
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

	// We want the sky backround to always be static, so draw it outside the relative camera position.
	sky.drawImage(ctx, 0, 0);

	// Save the current state (for camera offset)
	ctx.save();

	// Offset by camera position
	ctx.translate(camera.position.x, camera.position.y);

	// Draw objects in the mounted scene
	mainScene.draw(ctx, 0, 0);

	// Restore to original state
	ctx.restore();
};

// Pass in the update and draw methods to kick off GameLoop and Main Scene
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
