var pathfindMap = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1]
];

var minigamePoints = [
    '1-4', '1-9', '1-12',
    '2-6',
    '3-3', '3-8',
    '4-11',
    '5-1', '5-4',
    '6-7',
    '7-10',
    '8-6'
];

var minigameTypes = [
    'analog',
    'analog',
    'analog',
    'digital',
    'digital',
    'digital',
    'name',
    'name',
    'name',
    'number',
    'number',
    'number'
];

/*
var minigamesToPlay = new Array();



var minigamesRandomized = minigameTypes.slice().sort(arrayRandomSort);
for (var i=0; i<minigamePoints.length; i++){
    minigamesToPlay.push({
        point: minigamePoints[i],
        type = minigamesRandomized[i],
        played = false
    });
}
*/