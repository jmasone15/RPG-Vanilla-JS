import { GameObject } from '../../GameObject';
import { DIRECTIONS } from '../../Input';
import { Vector2 } from '../../Vector2';
import { Sprite } from '../../Sprite';
import { resources } from '../../Resource';
import { Animations } from '../../Animations';
import { FrameIndexPattern } from '../../FrameIndexPattern';
import { heroAnimations } from './heroAnimations';
import { moveTowards } from '../../helpers/moveTowards';
import { gridCells, isSpaceFree } from '../../helpers/grid';
import { walls } from '../../levels/levelOne';

export class Hero extends GameObject {
	constructor() {
		super({});

		this.body = new Sprite({
			resouce: resources.images.hero,
			frameSize: new Vector2(32, 32),
			hFrames: 3,
			vFrames: 8,
			frame: 1,
			position: new Vector2(gridCells(10), gridCells(3)),
			offset: new Vector2(-17, -9),
			animations: new Animations({
				walkDown: new FrameIndexPattern(heroAnimations.WALK_DOWN),
				walkUp: new FrameIndexPattern(heroAnimations.WALK_UP),
				walkLeft: new FrameIndexPattern(heroAnimations.WALK_LEFT),
				walkRight: new FrameIndexPattern(heroAnimations.WALK_RIGHT),
				standDown: new FrameIndexPattern(heroAnimations.STAND_DOWN),
				standUp: new FrameIndexPattern(heroAnimations.STAND_UP),
				standLeft: new FrameIndexPattern(heroAnimations.STAND_LEFT),
				standRight: new FrameIndexPattern(heroAnimations.STAND_RIGHT)
			})
		});

		const shadow = new Sprite({
			resouce: resources.images.shadow,
			frameSize: new Vector2(32, 32),
			position: this.body.position,
			offset: this.body.offset
		});

		this.addChildren([shadow, this.body]);
		this.facingDirection = DIRECTIONS.DOWN;
	}

	step(delta, root) {
		// Every frame, move the hero 1px closer to their destination.
		const distance = moveTowards(this.body, this.body.destinationPosition, 1);

		// Once destination has been reached, see if the player is holding down a movement key.
		if (distance < 1) {
			this.tryMove(root.input);
		}
	}

	tryMove(input) {
		if (!input.direction) {
			switch (this.facingDirection) {
				case DIRECTIONS.LEFT:
					this.body.animations.play('standLeft');
					break;
				case DIRECTIONS.RIGHT:
					this.body.animations.play('standRight');
					break;
				case DIRECTIONS.UP:
					this.body.animations.play('standUp');
					break;
				default:
					this.body.animations.play('standDown');
					break;
			}
			return;
		}

		// Default the next X and Y to the current hero position
		const nextPos = this.body.position.duplicate();
		const gridSize = 16;

		if (input.direction === DIRECTIONS.DOWN) {
			nextPos.y += gridSize;
		} else if (input.direction === DIRECTIONS.UP) {
			nextPos.y -= gridSize;
		} else if (input.direction === DIRECTIONS.LEFT) {
			nextPos.x -= gridSize;
		} else if (input.direction === DIRECTIONS.RIGHT) {
			nextPos.x += gridSize;
		}
		this.facingDirection = input.direction ?? this.facingDirection;

		// Validate destination position here to determine if hero moves and which animation to show.
		const spaceFreeCheck = isSpaceFree(walls, nextPos.x, nextPos.y);

		// Update the hero's animation based on direction and if they can move to the next space.
		if (input.direction === DIRECTIONS.DOWN) {
			this.body.movingOrStandingAnimation(
				spaceFreeCheck,
				'walkDown',
				'standDown'
			);
		} else if (input.direction === DIRECTIONS.UP) {
			this.body.movingOrStandingAnimation(spaceFreeCheck, 'walkUp', 'standUp');
		} else if (input.direction === DIRECTIONS.LEFT) {
			this.body.movingOrStandingAnimation(
				spaceFreeCheck,
				'walkLeft',
				'standLeft'
			);
		} else if (input.direction === DIRECTIONS.RIGHT) {
			this.body.movingOrStandingAnimation(
				spaceFreeCheck,
				'walkRight',
				'standRight'
			);
		}

		// Update the hero's destination within the sprite if destination is free.
		if (spaceFreeCheck) {
			this.body.destinationPosition.x = nextPos.x;
			this.body.destinationPosition.y = nextPos.y;
		}
	}
}
