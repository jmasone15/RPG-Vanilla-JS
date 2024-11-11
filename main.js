import { resources } from './src/Resource';

// The canvas is an HTML element that allows for graphics rendering.
// A canvas' context is the JavaScript object that provides methods, properties, and objects for manipulating said graphics on the canvas.
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Function that handles drawing resources to the context
const draw = () => {
	const sky = resources.images.sky;
	if (sky.isLoaded) {
		ctx.drawImage(sky.image, 0, 0);
	}
};

// Temporary Game Loop esque function
setInterval(() => {
	console.log('draw');
	draw();
}, 300);
