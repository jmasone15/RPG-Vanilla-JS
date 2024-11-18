const determineDistance = (distanceToTravelX, distanceToTravelY) => {
	return Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
};

export const moveTowards = (sprite, destination, speed) => {
	let distanceToTravelX = destination.x - sprite.position.x;
	let distanceToTravelY = destination.y - sprite.position.y;
	let distance = determineDistance(distanceToTravelX, distanceToTravelY);

	if (distance <= speed) {
		// Done Moving
		sprite.position.x = destination.x;
		sprite.position.y = destination.y;
	} else {
		// Otherwise, move by the specified speed in the direction of the destination.
		let normalizedX = distanceToTravelX / distance;
		let normalizedY = distanceToTravelY / distance;

		sprite.position.x += normalizedX * speed;
		sprite.position.y += normalizedY * speed;

		// Recalculate remaining distance after ther move.
		distanceToTravelX = destination.x - sprite.position.x;
		distanceToTravelY = destination.y - sprite.position.y;
		distance = determineDistance(distanceToTravelX, distanceToTravelY);
	}

	return distance;
};
