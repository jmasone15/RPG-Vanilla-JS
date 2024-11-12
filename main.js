import { GameLoop } from './src/GameLoop';
import { resources } from './src/Resource';
import { Sprite } from './src/Sprite';
import { Vector2 } from './src/Vector2';

// The canvas is an HTML element that allows for graphics rendering.
// A canvas' context is the JavaScript object that provides methods, properties, and objects for manipulating said graphics on the canvas.
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Sprites
const sky = new Sprite({
	resouce: resources.images.sky,
	frameSize: new Vector2(320, 180)
});
const map = new Sprite({
	resouce: resources.images.map,
	frameSize: new Vector2(320, 180)
});
const hero = new Sprite({
	resouce: resources.images.hero,
	frameSize: new Vector2(32, 32),
	hFrames: 3,
	vFrames: 8,
	frame: 1
});
const shadow = new Sprite({
	resouce: resources.images.shadow,
	frameSize: new Vector2(32, 32)
});

const update = () => {
	// Updating entities in the game
};

// Function that handles drawing resources to the context
const draw = () => {
	sky.drawImage(ctx, 0, 0);
	map.drawImage(ctx, 120, 40);

	// Center the Hero in the cell
	const heroPos = new Vector2(16 * 8, 16 * 5);
	const heroOffset = new Vector2(-15, -10);
	const heroPosition = new Vector2(
		heroPos.x + heroOffset.x,
		heroPos.y + heroOffset.y
	);

	shadow.drawImage(ctx, heroPosition.x, heroPosition.y);
	hero.drawImage(ctx, heroPosition.x, heroPosition.y);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
