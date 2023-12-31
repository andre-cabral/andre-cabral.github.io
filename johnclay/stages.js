var pathfindMap = [
    [1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
    [1,0,1,0,0,0,1,0,1,0,0,1,0,1,1],
    [0,0,1,1,1,1,1,0,1,1,1,1,0,0,1],
    [1,1,1,0,0,1,0,0,1,0,0,1,1,1,1],
    [1,0,1,0,0,1,1,1,1,0,0,1,0,0,1],
    [1,0,1,0,1,1,0,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,0,0,1,0,0,1,0,1,1,1],
    [0,0,0,0,0,0,1,1,1,0,1,0,0,0,1],
    [0,0,0,0,0,0,1,0,1,0,1,1,1,1,1],
    [0,0,0,0,0,0,1,0,1,1,1,0,0,1,1],
    [0,0,0,0,0,0,1,1,1,0,1,1,0,0,1]
];

var minigamePoints = [
    ['2-2','4-0','5-2'],
    ['6-4','5-5'],
    ['1-6','2-5','4-8'],
    ['0-8'], //moon1

    ['2-9','0-10','1-11'],
    ['0-13','1-14'],
    ['3-11','5-12','6-14'],
    ['8-14'], //moon2

    ['8-11','7-10','9-9'],
    ['10-7','8-6','6-7'],
    ['5-10'],
];

var minigameTypes = [
    '0',
    '1',
    '2',
    'moon',

    '3',
    '4',
    '5',
    'moon',

    '6',
    '7',
    '8'
];

/*
var minigamesToPlay = new Array();

for (var i=0; i<minigamePoints.length; i++){
    minigamesToPlay.push({
        point: minigamePoints[i],
        type = minigameTypes[i],
        played = false
    });
}
*/