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
    '1-3',
    '2-6',
    '2-12',
    '3-9',
    '4-2',
    '5-5',
    '6-10',
    '8-6'
];

var minigameTypes = [
    'analog',
    'analog',
    'digital',
    'digital',
    'name',
    'name',
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