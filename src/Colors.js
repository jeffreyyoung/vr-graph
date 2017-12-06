import _ from 'lodash'

var DEFAULT_COLOR = '#cccccc';
var COLORS = [
	'#8cc350',
	'#5a6eaa',
	'#d755a5',
	'#1ebed7',
	'#f0a01e',
	'#9b8ce6',
	'#3cb5a0',
	'#3287d2',
	'#f0557d',
	'#c3d250',
	'#eb782d',
	'#78b4f5',
	'#5faf69',
	'#aa5fa5',
	'#fa5a50',
	'#f5c841',
	'#969696'
];

var colorPalette = {
	getColors: () => {
		return _.clone(COLORS);
	},
	// Find the next color based on a list of colors that have already been used
	// For example, if COLORS was ['red', 'green', 'blue']:
	// If usedColors is ['red']                           then this would return 'green'
	// If usedColors is ['red', 'blue']                   then this would return 'green'
	// If usedColors is ['red', 'blue', 'green', 'green'] then this would return 'red'
	// If usedColors is ['red', 'green', 'red', 'green']  then this would return 'blue'
	getNextColor: (usedColors=[]) => {
		var nextColor;
		usedColors = _.clone(usedColors);
		while (!nextColor) {
			var colorPaletteColors = _.clone(COLORS);
			for (var i=0; i<colorPaletteColors.length; i++) {
				var colorPaletteColor = colorPaletteColors[i];
				var usedColorIndex = usedColors.indexOf(colorPaletteColor);
				if (usedColorIndex < 0) {
					nextColor = colorPaletteColor;
					break;
				}
				usedColors.splice(usedColorIndex, 1);
			}
		}
		return nextColor;
	}
};

colorPalette.DEFAULT_COLOR = DEFAULT_COLOR;

export default colorPalette;