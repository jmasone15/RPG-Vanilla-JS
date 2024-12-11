import { GameObject } from '../../GameObject';
import { Input } from '../../Input';
import { Camera } from '../../Camera';
import { Inventory } from '../Inventory/Inventory';

export class Main extends GameObject {
	constructor() {
		super({});

		this.level = null;
		// Give the Main Scene the Input class of eventListeners so it can be referenced by children.
		this.input = new Input();
		this.camera = new Camera();
		this.inventory = new Inventory();
	}

	setLevel(newLevelInstance) {
		if (this.level) {
			this.level.destroy();
		}

		this.level = newLevelInstance;
		this.addChild(this.level);
	}

	drawBackground(ctx) {
		this.level?.background.drawImage(ctx, 0, 0);
	}

	drawForeground(ctx) {
		this.inventory.draw(
			ctx,
			this.inventory.position.x,
			this.inventory.position.y
		);
	}
}
