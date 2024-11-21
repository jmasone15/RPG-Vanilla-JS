export const walls = new Set();

walls.add('144,48'); // House
walls.add('176,48'); // Water

// Borders
walls.add('128,16');
walls.add('144,16');
walls.add('160,16');
walls.add('176,16');
walls.add('192,16'); // Top ^

walls.add('128,96');
walls.add('144,96');
walls.add('160,96');
walls.add('176,96');
walls.add('192,96'); // Bottom ^

walls.add('112,32');
walls.add('112,48');
walls.add('112,64');
walls.add('112,80'); // Left ^

walls.add('208,32');
walls.add('208,48');
walls.add('208,64');
walls.add('208,80'); // Right ^
