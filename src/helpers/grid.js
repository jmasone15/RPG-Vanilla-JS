export const gridCells = (n) => {
	return n * 16;
};

export const isSpaceFree = (walls, x, y) => {
	// Convert coords to string format for easy lookup.
	// Check if walls has an entry at this spot.
	const str = `${x},${y}`;
	const isWallPresent = walls.has(str);

	return !isWallPresent;
};
