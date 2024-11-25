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
// Figure out a way to change the mainScene per level.
const mainScene = new GameObject({});

// Give the mainScene the Input class of eventListeners so it can be referenced by children.
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

// Add sprites to mainScene so they trigger in the class' update and render functions
mainScene.addChildren([sky, map, hero]);

// Entry points for the mainScene update and draw methods.
const update = (delta) => {
	mainScene.stepEntry(delta, mainScene);
};
const draw = () => {
	mainScene.draw(ctx, 0, 0);
};

// Pass in the update and draw methods to kick off GameLoop and Main Scene
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
