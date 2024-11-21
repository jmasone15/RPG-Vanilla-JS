import { GameLoop } from './src/GameLoop';
import { resources } from './src/Resource';
import { Sprite } from './src/Sprite';
import { Vector2 } from './src/Vector2';
import { DIRECTIONS, Input } from './src/Input';
import { gridCells, isSpaceFree } from './src/helpers/grid';
import { moveTowards } from './src/helpers/moveTowards';
import { walls } from './src/levels/levelOne';

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
	frame: 1,
	position: new Vector2(gridCells(8), gridCells(5))
});
const shadow = new Sprite({
	resouce: resources.images.shadow,
	frameSize: new Vector2(32, 32)
});

// Game Variables
const input = new Input();

const update = () => {
	// Every frame, move the hero 1px closer to their destination.
	const distance = moveTowards(hero, hero.destinationPosition, 1);

	// Once destination has been reached, see if the player is holding down a movement key.
	if (distance < 1) {
		tryMove();
	}

	return;
};

const tryMove = () => {
	if (!input.direction) {
		return;
	}

	// Default the next X and Y to the current hero position
	const nextPos = hero.position.duplicate();
	const gridSize = 16;

	if (input.direction === DIRECTIONS.DOWN) {
		nextPos.y += gridSize;
	} else if (input.direction === DIRECTIONS.UP) {
		nextPos.y -= gridSize;
	} else if (input.direction === DIRECTIONS.LEFT) {
		nextPos.x -= gridSize;
	} else if (input.direction === DIRECTIONS.RIGHT) {
		nextPos.x += gridSize;
	}

	// Validate destination position here to determine if hero moves and which frame to show.
	const spaceFreeCheck = isSpaceFree(walls, nextPos.x, nextPos.y);

	// Update the hero's frame based on direction and if they can move to the next space.
	if (input.direction === DIRECTIONS.DOWN) {
		hero.movingOrStandingFrame(spaceFreeCheck, 0, 1);
	} else if (input.direction === DIRECTIONS.UP) {
		hero.movingOrStandingFrame(spaceFreeCheck, 6, 7);
	} else if (input.direction === DIRECTIONS.LEFT) {
		hero.movingOrStandingFrame(spaceFreeCheck, 9, 10);
	} else if (input.direction === DIRECTIONS.RIGHT) {
		hero.movingOrStandingFrame(spaceFreeCheck, 3, 4);
	}

	// Update the hero's destination within the sprite if destination is free.
	if (spaceFreeCheck) {
		hero.destinationPosition.x = nextPos.x;
		hero.destinationPosition.y = nextPos.y;
	}
};

// Function that handles drawing resources to the context
const draw = () => {
	sky.drawImage(ctx, 0, 0);
	map.drawImage(ctx, 120, 40);

	// Center the Hero in the cell
	const heroOffset = new Vector2(-16, -10);
	const heroPosition = new Vector2(
		hero.position.x + heroOffset.x,
		hero.position.y + heroOffset.y
	);

	shadow.drawImage(ctx, heroPosition.x, heroPosition.y);
	hero.drawImage(ctx, heroPosition.x, heroPosition.y);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
