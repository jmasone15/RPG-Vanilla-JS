import { Sprite } from '../Sprite';
import { Vector2 } from '../Vector2';
import { resources } from '../Resource';
import { Level } from '../objects/Level/Level';
import { Exit } from '../objects/Exit/Exit';
import { gridCells } from '../helpers/grid';
import { Hero } from '../objects/Hero/Hero';
import { Rod } from '../objects/Rod/Rod';
import { events } from '../Events';
import { OutdoorLevelOne } from './OutdoorLevelOne';
import { NPC } from '../objects/NPC/NPC';

const DEFAULT_HERO_POSITION = new Vector2(gridCells(2), gridCells(0));

export class CaveLevelOne extends Level {
	constructor(params = {}) {
		super({});
		this.background = new Sprite({
			resource: resources.images.cave,
			frameSize: new Vector2(320, 180)
		});

		const ground = new Sprite({
			resource: resources.images.caveGround,
			frameSize: new Vector2(320, 180)
		});
		const exit = new Exit(gridCells(3), gridCells(4), new Vector2(0, 16));
		const rod = new Rod(gridCells(5), gridCells(0), new Vector2(-2, 12));

		this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;
		const hero = new Hero(
			this.heroStartPosition.x,
			this.heroStartPosition.y,
			new Vector2(-9, 0),
			new Vector2(0, 8)
		);

		const npc = new NPC(gridCells(5), gridCells(5));

		this.addChildren([ground, exit, rod, hero, npc]);
	}

	ready() {
		events.on('HERO_EXITS', this, () => {
			events.emit(
				'CHANGE_LEVEL',
				new OutdoorLevelOne({
					heroPosition: new Vector2(gridCells(11), gridCells(6))
				})
			);
		});
	}

	setWalls() {
		// Map Objects
		this.walls.add(`48,0`);
		this.walls.add(`64,0`);
		this.walls.add(`80,32`);
		this.walls.add(`96,32`);
		this.walls.add(`128,32`);
		this.walls.add(`96,48`);
		this.walls.add(`112,48`);
		this.walls.add(`192,64`);
		this.walls.add(`208,64`);
		this.walls.add(`224,80`); // Stones ^

		this.walls.add(`48,48`); // Pebbles

		this.walls.add(`32,48`);
		this.walls.add(`144,0`);
		this.walls.add(`192,16`);
		this.walls.add(`208,16`);
		this.walls.add(`208,32`);
		this.walls.add(`256,64`); // Rocks ^

		this.walls.add(`256,16`);
		this.walls.add(`240,16`);
		this.walls.add(`208,80`);
		this.walls.add(`192,80`);
		this.walls.add(`176,80`);
		this.walls.add(`128,80`);
		this.walls.add(`112,80`);
		this.walls.add(`96,80`); // Water ^

		// Borders
		this.walls.add(`16,0`);
		this.walls.add(`16,64`);
		this.walls.add(`16,16`);
		this.walls.add(`16,32`);
		this.walls.add(`16,48`);
		this.walls.add(`16,64`);
		this.walls.add(`16,80`);
		this.walls.add(`16,96`); // Left Wall ^

		this.walls.add(`32,112`);
		this.walls.add(`48,112`);
		this.walls.add(`64,112`);
		this.walls.add(`80,112`);
		this.walls.add(`96,112`);
		this.walls.add(`112,112`);
		this.walls.add(`128,112`);
		this.walls.add(`144,112`);
		this.walls.add(`160,112`);
		this.walls.add(`176,112`);
		this.walls.add(`192,112`);
		this.walls.add(`208,112`);
		this.walls.add(`224,112`);
		this.walls.add(`240,112`);
		this.walls.add(`256,112`);
		this.walls.add(`272,112`); // Bottom Wall ^

		this.walls.add(`288,0`);
		this.walls.add(`288,16`);
		this.walls.add(`288,32`);
		this.walls.add(`288,48`);
		this.walls.add(`288,64`);
		this.walls.add(`288,80`);
		this.walls.add(`288,96`); // Right Wall ^

		this.walls.add(`32,-16`);
		this.walls.add(`48,-16`);
		this.walls.add(`64,-16`);
		this.walls.add(`80,-16`);
		this.walls.add(`96,-16`);
		this.walls.add(`112,-16`);
		this.walls.add(`128,-16`);
		this.walls.add(`144,-16`);
		this.walls.add(`160,-16`);
		this.walls.add(`176,-16`);
		this.walls.add(`192,-16`);
		this.walls.add(`208,-16`);
		this.walls.add(`224,-16`);
		this.walls.add(`240,-16`);
		this.walls.add(`256,-16`);
		this.walls.add(`272,-16`); // Top Wall ^

		console.log('CAVE LEVEL ONE WALLS CREATED...');
	}
}
