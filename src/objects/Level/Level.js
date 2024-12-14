import { GameObject } from '../../GameObject';

export class Level extends GameObject {
	constructor() {
		super({});
		this.background = null;
		this.walls = new Set();
	}

	setWalls() {
		// ...
	}
}
