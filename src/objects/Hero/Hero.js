import { GameObject } from '../../GameObject';
import { DIRECTIONS } from '../../Input';
import { Vector2 } from '../../Vector2';
import { Sprite } from '../../Sprite';
import { resources } from '../../Resource';
import { Animations } from '../../Animations';
import { FrameIndexPattern } from '../../FrameIndexPattern';
import { heroAnimations } from './heroAnimations';
import { moveTowards } from '../../helpers/moveTowards';
import { isSpaceFree } from '../../helpers/grid';
import { events } from '../../Events';

export class Hero extends GameObject {
	constructor(x, y) {
		super({});

		this.body = new Sprite({
			resource: resources.images.hero,
			frameSize: new Vector2(32, 32),
			hFrames: 3,
			vFrames: 8,
			frame: 1,
			position: new Vector2(x, y),
			offset: new Vector2(-17, -9),
			animations: new Animations({
				walkDown: new FrameIndexPattern(heroAnimations.WALK_DOWN),
				walkUp: new FrameIndexPattern(heroAnimations.WALK_UP),
				walkLeft: new FrameIndexPattern(heroAnimations.WALK_LEFT),
				walkRight: new FrameIndexPattern(heroAnimations.WALK_RIGHT),
				standDown: new FrameIndexPattern(heroAnimations.STAND_DOWN),
				standUp: new FrameIndexPattern(heroAnimations.STAND_UP),
				standLeft: new FrameIndexPattern(heroAnimations.STAND_LEFT),
				standRight: new FrameIndexPattern(heroAnimations.STAND_RIGHT),
				pickUpDown: new FrameIndexPattern(heroAnimations.PICK_UP_DOWN)
			})
		});

		const shadow = new Sprite({
			resource: resources.images.shadow,
			frameSize: new Vector2(32, 32),
			position: this.body.position,
			offset: this.body.offset
		});

		this.addChildren([shadow, this.body]);
		this.facingDirection = DIRECTIONS.DOWN;
		this.itemPickupTime = 0;
		this.itemPickupShell = null;

		events.on('HERO_ITEM_PICKUP', this, ({ image, position }) => {
			this.onItemPickup(image, position);
		});
	}

	// Root is the parent GameObject of the mainScene, we pass it through to get access to the Input class.
	step(delta, root) {
		if (this.itemPickupTime > 0) {
			this.workOnItemPickup(delta);
			return;
		}

		// Every frame, move the hero 1px closer to their destination.
		const distance = moveTowards(this.body, this.body.destinationPosition, 1);

		// Once destination has been reached, see if the player is holding down a movement key.
		if (distance < 1) {
			this.tryMove(root);
		}

		this.tryEmitPosition();
	}

	tryEmitPosition() {
		if (
			this.lastX === this.body.position.x &&
			this.lastY === this.body.position.y
		) {
			return;
		}

		this.lastX = this.body.position.x;
		this.lastY = this.body.position.y;

		events.emit('HERO_POSITION', this.body.position);
	}

	tryMove({ input, level }) {
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
		const spaceFreeCheck = isSpaceFree(level?.walls, nextPos.x, nextPos.y);

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

	onItemPickup(image, position) {
		// Make sure we land right on the item
		this.body.destinationPosition = position.duplicate();

		// Start the item pickup animation
		this.itemPickupTime = 1000;

		// Create a new game object of the item that was picked up.
		this.itemPickupShell = new GameObject({});
		this.itemPickupShell.addChild(
			new Sprite({
				resource: image,
				// Translate the position of the picked up item to be just above the hero's head.
				position: new Vector2(position.x, position.y - 13),
				offset: new Vector2(-8, 5)
			})
		);
		this.addChild(this.itemPickupShell);
	}

	workOnItemPickup(delta) {
		this.itemPickupTime -= delta;
		this.body.animations.play('pickUpDown');

		// Once animation is finished, remove the newly created GameObject above the hero's head.
		if (this.itemPickupTime <= 0) {
			this.itemPickupShell.destroy();
		}
	}
}
