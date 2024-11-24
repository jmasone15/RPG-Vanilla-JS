import { GameLoop } from './src/GameLoop';
import { resources } from './src/Resource';
import { Sprite } from './src/Sprite';
import { Vector2 } from './src/Vector2';
import { DIRECTIONS, Input } from './src/Input';
import { gridCells, isSpaceFree } from './src/helpers/grid';
import { moveTowards } from './src/helpers/moveTowards';
import { walls } from './src/levels/levelOne';
import { Animations } from './src/Animations';
import { FrameIndexPattern } from './src/FrameIndexPattern';
import { heroAnimations } from './src/objects/Hero/heroAnimations';
import { GameObject } from './src/GameObject';
import { Hero } from './src/objects/Hero/Hero';

// The canvas is an HTML element that allows for graphics rendering.
// A canvas' context is the JavaScript object that provides methods, properties, and objects for manipulating said graphics on the canvas.
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Main Game Object of the current Level.
const mainScene = new GameObject({});
mainScene.input = new Input();

// Sprites
const sky = new Sprite({
	resouce: resources.images.sky,
	frameSize: new Vector2(320, 180)
});
const map = new Sprite({
	resouce: resources.images.map,
	frameSize: new Vector2(320, 180),
	position: new Vector2(120, 40)
});
const hero = new Hero();

mainScene.addChildren([sky, map, hero]);

const update = (delta) => {
	mainScene.stepEntry(delta, mainScene);
};

// Function that handles drawing resources to the context
const draw = () => {
	mainScene.draw(ctx, 0, 0);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
