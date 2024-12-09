import { GameObject } from '../../GameObject';
import { resources } from '../../Resource';
import { Sprite } from '../../Sprite';
import { Vector2 } from '../../Vector2';
import { events } from '../../Events';

export class Inventory extends GameObject {
	constructor() {
		super({
			position: new Vector2(0, 3)
		});

		this.nextId = 0;
		this.items = [
			{
				id: -1,
				image: resources.images.rod
			},
			{
				id: -2,
				image: resources.images.rod
			},
			{
				id: -3,
				image: resources.images.rod
			}
		];

		// React to Hero picking up an item
		events.on('HERO_ITEM_PICKUP', this, (data) => {
			this.nextId++;

			this.items.push({
				id: this.nextId,
				image: data.image
			});

			this.renderInventory();
		});

		// Draw initial state on bootup
		this.renderInventory();
	}

	renderInventory() {
		// Remove stale drawings
		this.children.forEach((child) => child.destroy());

		// Draw fresh from the latest version of the list.
		this.items.forEach((item, index) => {
			const sprite = new Sprite({
				resource: item.image,
				position: new Vector2(index * 12, 0)
			});
			this.addChild(sprite);
		});
	}

	removeFromInventory(id) {
		this.items = this.items.filter((item) => item.id !== id);
		this.renderInventory();
	}
}
