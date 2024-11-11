class Resources {
	constructor() {
		// Everything we plan to download
		this.toLoad = {
			sky: '/images/sky.png',
			map: '/images/smallMap.png',
			hero: '/images/hero-sheet.png',
			shadow: '/images/shadow.png'
		};

		// A bucket to keep all of our images
		this.images = {};

		// Load each image
		Object.keys(this.toLoad).forEach((key) => {
			// Using the built-in Image class gives us access to memory load functions.
			// Essentially, the onload function runs once the image is actually loaded into the browser memory...
			// After that, we can freely use it within the HTML Canvas after checking the isLoaded flag per image.

			const img = new Image();
			img.src = this.toLoad[key];
			this.images[key] = {
				image: img,
				isLoaded: false
			};
			img.onload = () => {
				this.images[key].isLoaded = true;
			};
		});
	}
}

// Export a single instance because it holds all of our images for the project.
export const resources = new Resources();
