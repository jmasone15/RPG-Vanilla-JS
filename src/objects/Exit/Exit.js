import { GameObject } from '../../GameObject';
import { resources } from '../../Resource';
import { Vector2 } from '../../Vector2';
import { Sprite } from '../../Sprite';
import { events } from '../../Events';

export class Exit extends GameObject {
	constructor(x, y) {
		super({});

		this.body = new Sprite({
			resource: resources.images.exit,
			position: new Vector2(x, y),
			offset: new Vector2(-8, 8)
		});
		this.addChild(this.body);
	}

	ready() {
		console.log('EXIT IS READY');
		// Collision Event
		events.on('HERO_POSITION', this, (heroPosition) => {
			if (
				heroPosition.x === this.body.position.x &&
				heroPosition.y === this.body.position.y
			) {
				events.emit('HERO_EXITS');
			}
		});
	}
}
