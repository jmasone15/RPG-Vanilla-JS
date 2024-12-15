import { Level } from '../objects/Level/Level';
import { resources } from '../Resource';
import { Hero } from '../objects/Hero/Hero';
import { Sprite } from '../Sprite';
import { Rod } from '../objects/Rod/Rod';
import { Exit } from '../objects/Exit/Exit';
import { Vector2 } from '../Vector2';
import { gridCells } from '../helpers/grid';
import { CaveLevelOne } from './CaveLevelOne';
import { events } from '../Events';

const DEFAULT_HERO_POSITION = new Vector2(gridCells(22), gridCells(7));

export class OutdoorLevelOne extends Level {
	constructor(params = {}) {
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

		this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;

		const hero = new Hero(
			this.heroStartPosition.x,
			this.heroStartPosition.y,
			new Vector2(-17, -9),
			new Vector2(-8, 0)
		);
		const rod = new Rod(gridCells(18), gridCells(4), new Vector2(-8, 2));
		const exit = new Exit(gridCells(11), gridCells(5), new Vector2(-8, 8));

		// Add sprites to level so they trigger in the class' update and render functions
		this.addChildren([map, rod, exit, hero]);
	}

	ready() {
		events.on('HERO_EXITS', this, () => {
			events.emit(
				'CHANGE_LEVEL',
				new CaveLevelOne({
					heroPosition: new Vector2(gridCells(3), gridCells(5))
				})
			);
		});
	}

	setWalls() {
		// Map Objects

		this.walls.add(`352,128`);
		this.walls.add(`336,128`);
		this.walls.add(`320,128`); // Rocks ^

		this.walls.add(`352,96`); // House

		this.walls.add(`192,80`);
		this.walls.add(`336,96`);
		this.walls.add(`352,64`); // Trees ^

		this.walls.add(`192,96`);
		this.walls.add(`192,112`);
		this.walls.add(`208,96`);
		this.walls.add(`208,112`);
		this.walls.add(`256,80`);
		this.walls.add(`272,80`); // Stones ^

		this.walls.add(`240,112`);
		this.walls.add(`256,112`);
		this.walls.add(`272,112`);
		this.walls.add(`288,112`); // Water ^

		// Borders
		this.walls.add(`160,80`);
		this.walls.add(`160,96`);
		this.walls.add(`160,112`);
		this.walls.add(`160,128`); // Left Wall ^

		this.walls.add(`176,144`);
		this.walls.add(`192,144`);
		this.walls.add(`208,144`);
		this.walls.add(`224,144`);
		this.walls.add(`240,144`);
		this.walls.add(`256,144`);
		this.walls.add(`272,144`);
		this.walls.add(`288,144`);
		this.walls.add(`304,144`);
		this.walls.add(`320,144`);
		this.walls.add(`336,144`);
		this.walls.add(`352,144`);
		this.walls.add(`368,144`); // Bottom Wall ^

		this.walls.add(`384,128`);
		this.walls.add(`384,112`);
		this.walls.add(`384,96`);
		this.walls.add(`384,80`);
		this.walls.add(`368,64`); // Right Wall ^

		this.walls.add(`176,64`);
		this.walls.add(`192,64`);
		this.walls.add(`208,64`);
		this.walls.add(`224,64`);
		this.walls.add(`240,48`);
		this.walls.add(`256,48`);
		this.walls.add(`272,48`);
		this.walls.add(`288,48`);
		this.walls.add(`304,48`);
		this.walls.add(`320,48`);
		this.walls.add(`336,48`); // Top Wall ^

		console.log('OUTDOOR LEVEL ONE WALLS CREATED...');
	}
}
