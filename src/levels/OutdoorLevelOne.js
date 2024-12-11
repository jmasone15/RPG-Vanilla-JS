import { Level } from '../objects/Level/Level';
import { resources } from '../Resource';
import { Hero } from '../objects/Hero/Hero';
import { Sprite } from '../Sprite';
import { Rod } from '../objects/Rod/Rod';
import { Exit } from '../objects/Exit/Exit';
import { Vector2 } from '../Vector2';
import { gridCells } from '../helpers/grid';

export class OutdoorLevelOne extends Level {
	constructor() {
		super({});

		this.background = new Sprite({
			resource: resources.images.sky,
			frameSize: new Vector2(320, 180)
		});

		const map = new Sprite({
			resource: resources.images.map,
			frameSize: new Vector2(320, 180),
			position: new Vector2(120, 40)
		});
		const hero = new Hero(gridCells(10), gridCells(3));
		const rod = new Rod(gridCells(11), gridCells(4));
		const exit = new Exit(gridCells(10), gridCells(5));

		// Add sprites to level so they trigger in the class' update and render functions
		this.addChildren([map, rod, exit, hero]);

		// Walls
		this.walls.add('144,48'); // House
		this.walls.add('176,48'); // Water

		// Borders
		this.walls.add('128,16');
		this.walls.add('144,16');
		this.walls.add('160,16');
		this.walls.add('176,16');
		this.walls.add('192,16'); // Top ^

		this.walls.add('128,96');
		this.walls.add('144,96');
		this.walls.add('160,96');
		this.walls.add('176,96');
		this.walls.add('192,96'); // Bottom ^

		this.walls.add('112,32');
		this.walls.add('112,48');
		this.walls.add('112,64');
		this.walls.add('112,80'); // Left ^

		this.walls.add('208,32');
		this.walls.add('208,48');
		this.walls.add('208,64');
		this.walls.add('208,80'); // Right ^
	}
}
