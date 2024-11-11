import { Vector2 } from './Vector2';

export class Sprite {
	constructor({
		resouce, // image we want to draw
		frameSize, // size of the crop of the image
		hFrames, // how the sprite sheet is arranged horizontally
		vFrames, // how the sprite sheet is arranged vertically
		frame, // which frame of the sprite we want to show
		scale, // how large to draw this image
		position // where to draw the image (top left corner)
	}) {
		this.resouce = resouce;
		this.frameSize = frameSize ?? new Vector2(16, 16);
		this.hFrames = hFrames ?? 1;
		this.vFrames = vFrames ?? 1;
		this.frame = frame ?? 0;
		this.frameMap = new Map();
		this.scale = scale ?? 1;
		this.position = position ?? new Vector2(0, 0);

		this.buildFrameMap();
	}

	// For a sprite sheet, we want to keep a record of each frame location.
	// We do so by looping over the amount of vertical and horizontal frames and then calculating it's position within the spritesheet.
	// Finally, we save those calculated positions to a JavaScript Map object to keep track of them and retrieve them later.
	buildFrameMap() {
		let frameCount = 0;
		for (let v = 0; v < this.vFrames; v++) {
			for (let h = 0; h < this.hFrames; h++) {
				this.frameMap.set(
					frameCount,
					new Vector2(this.frameSize.x * h, this.frameSize.y * v)
				);
				frameCount++;
			}
		}
	}

	drawImage(ctx, x, y) {
		// Ensure the Resources constructor has finished running and target image is loaded into memory.
		if (!this.resouce.isLoaded) {
			return;
		}

		// Using our JavaScript Map object set in the buildFrameMap method, we want to find the current frame we need to draw (this.frame).
		// Frames are found in the map using a unique number identifier, which we set in the buildFrameMap method.
		let frameX = 0;
		let frameY = 0;

		const frame = this.frameMap.get(this.frame);

		if (frame) {
			frameX = frame.x;
			frameY = frame.y;
		}

		// Run the Canvas Context draw method with the passed in Sprite properties.
		ctx.drawImage(
			this.resouce.image,
			frameX, // X and Y location in the sprite sheet
			frameY,
			this.frameSize.x, // X and Y size to crop from sprite sheet
			this.frameSize.y,
			x, // X and Y location on the canvas tag
			y,
			this.frameSize.x * this.scale, // X and Y of the image scale
			this.frameSize.y * this.scale
		);
	}
}
