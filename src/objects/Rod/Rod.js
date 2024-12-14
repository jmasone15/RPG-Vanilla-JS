import { GameObject } from '../../GameObject';
import { Sprite } from '../../Sprite';
import { events } from '../../Events';
import { resources } from '../../Resource';
import { Vector2 } from '../../Vector2';

export class Rod extends GameObject {
	constructor(x, y, offset) {
		super({});

		this.body = new Sprite({
			resource: resources.images.rod,
			position: new Vector2(x, y),
			offset: offset
		});
		this.addChild(this.body);
	}

	ready() {
		console.log('ROD IS READY');
		// Collision Event
		events.on('HERO_POSITION', this, (heroPosition) => {
			if (
				heroPosition.x === this.body.position.x &&
				heroPosition.y === this.body.position.y
			) {
				this.onCollideWithHero();
			}
		});
	}

	onCollideWithHero() {
		// Remove this instance from the scene
		this.destroy();

		// Alert other things that we picked up a rod
		events.emit('HERO_ITEM_PICKUP', {
			image: resources.images.rod,
			position: this.body.position
		});
	}
}
