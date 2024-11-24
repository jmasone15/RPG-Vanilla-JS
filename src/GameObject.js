import { Vector2 } from './Vector2';

export class GameObject {
	constructor({ position, offset, input }) {
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
