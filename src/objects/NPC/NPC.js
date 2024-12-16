import { GameObject } from '../../GameObject';
import { Vector2 } from '../../Vector2';
import { Sprite } from '../../Sprite';
import { resources } from '../../Resource';

export class NPC extends GameObject {
	constructor(x, y) {
		super({
			position: new Vector2(x, y)
		});

		// Opt into being solid
		this.isSolid = true;

		const shadow = new Sprite({
			resource: resources.images.shadow,
			frameSize: new Vector2(32, 32),
			position: new Vector2(-8, -19)
		});
		this.body = new Sprite({
			resource: resources.images.knight,
			frameSize: new Vector2(32, 32),
			hFrames: 2,
			vFrames: 1,
			position: new Vector2(-8, -20)
		});

		this.addChildren([shadow, this.body]);
	}
}
