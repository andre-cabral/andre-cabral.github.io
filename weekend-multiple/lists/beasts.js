const beasts = [
    {
        "role": "Flying Beast",
        "actions": "3",
        "movement": "4”",
        "reaction": "5",
        "armour": "2",
        "hearts": "3",
        "weapons": [
            {
                "name": "BEAK & CLAWS",
                "action": "1",
                "range": "0",
                "attacks": "3",
                "power": "-",
                "damage": "1",
            },
        ],
        "info": "Tamer uses 1 Action to activate the Beast. The Beast uses their Actions and then the Tamer continues to use their Actions as normal.",
        "abilities": [
            {
                "name": "FLIGHT",
                "ability": "This beast can fly. Ignore vertical measurements when moving. Climbing, Falling and Rough Terrain do not apply. They must finish their move on a flat surface that supports their base.",
            },{
                "name": "HAWKEYE",
                "ability": "Whatever the beast can see, the Warrior controlling them can see too. Use the Beasts line of sight to determine what you can hit and if they are in cover when making a Ranged Attack.",
            }
        ],
    },{
        "role": "Attack Beast",
        "actions": "3",
        "movement": "3”",
        "reaction": "5",
        "armour": "2",
        "hearts": "5",
        "weapons": [
            {
                "name": "BEAK & CLAWS",
                "action": "1",
                "range": "0",
                "attacks": "4",
                "power": "-",
                "damage": "1",
            },
        ],
        "info": "Tamer uses 1 Action to activate the Beast. The Beast uses their Actions and then the Tamer continues to use their Actions as normal.",
        "abilities": [
            {
                "name": "HOLD 'EM",
                "ability": "If this Beast is in base contact with an enemy Warrior, they cannot use the Push Action.",
            },{
                "name": "AGILE",
                "ability": "Climbing, Falling and Rough Terrain do not apply to this beast. They must finish their move on a flat surface that supports their base.",
            }
        ],
    }
];