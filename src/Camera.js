import { events } from './Events';
import { GameObject } from './GameObject';
import { Vector2 } from './Vector2';

export class Camera extends GameObject {
	constructor() {
		super({});

		events.on('HERO_POSITION', this, (heroPosition) => {
			this.centerPositionOnTarget(heroPosition);
		});

		events.on('CHANGE_LEVEL', this, ({ heroStartPosition }) => {
			this.centerPositionOnTarget(heroStartPosition);
		});
	}

	centerPositionOnTarget(pos) {
		// Create a new camera position based on the incoming position
		// This math will determine a camera position that is in the center of the screen while accounting for the size of the hero.
		const personHalf = 8;
		const canvasWidth = 320;
		const canvasHeight = 180;
		const halfWidth = -personHalf + canvasWidth / 2;
		const halfHeight = -personHalf + canvasHeight / 2;

		this.position = new Vector2(-pos.x + halfWidth, -pos.y + halfHeight);
	}
}
