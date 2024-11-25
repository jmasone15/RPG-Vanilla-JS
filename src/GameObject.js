import { Vector2 } from './Vector2';

// This class works as any generic object within the game. All other objects within the game should be extended from this.
// It has it's own step method, draw method, and a parent child relationship functionality.

// Any class that extends from this GameObject must have a step method and optionally a drawImage method. Those two methods are left blank here to be controlled by the extended classes.
// The stepEntry method recursively calls all of the children's step method first before calling the parent, allowing all children of the parent to update their internal state before the parent updates.
// The draw method works in a similar way, alternatively we draw the parent's content first before drawing the children's content recursively. This way it builds the scene from the ground up.
export class GameObject {
	constructor({ position, offset }) {
		// The position and offset properties are optional, the draw method would error out without these here.
		// Both position and offset should be handled at the sprite level.
		this.position = position ?? new Vector2(0, 0);
		this.offset = offset ?? new Vector2(0, 0);
		this.children = [];
	}

	// Update runs children first and then parent.
	// Draw runs parent first and the children.

	stepEntry(delta, root) {
		// Call updates on all children first
		this.children.forEach((child) => child.stepEntry(delta, root));

		// Call any internal step code.
		this.step(delta, root);
	}

	step(_delta) {
		// ...
	}

	draw(ctx, x, y) {
		const drawPosX = x + this.position.x + this.offset.x;
		const drawPosY = y + this.position.y + this.offset.y;

		// Draw on the canvas
		this.drawImage(ctx, drawPosX, drawPosY);

		// Pass on to children
		this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
	}

	drawImage(ctx, drawPosX, drawPosY) {
		// ...
	}

	addChild(gameObject) {
		this.children.push(gameObject);
	}

	addChildren(gameObjectArr) {
		for (let i = 0; i < gameObjectArr.length; i++) {
			this.addChild(gameObjectArr[i]);
		}
	}

	removeChild(gameObject) {
		this.children = this.children.filter((child) => {
			return gameObject !== child;
		});
	}
}
