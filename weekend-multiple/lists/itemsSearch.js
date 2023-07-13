const itemsSearch = [
    {
        "d66": "11",
        "d6_1": 1,
        "d6_2": 1,
        "gearItem": "Booby Trap!",
        "conditionAbilities": "Immediately take 1D3 damage"
    },{
        "d66": "12",
        "d6_1": 1,
        "d6_2": 2,
        "gearItem": "Pair of Smelly Socks",
        "conditionAbilities": "Luck is not on your side today"
    },{
        "d66": "13",
        "d6_1": 1,
        "d6_2": 3,
        "gearItem": "It’s a trap!",
        "conditionAbilities": "Lose 1 Action immediately (or in the next activation if no Actions are remaining)"
    },{
        "d66": "14",
        "d6_1": 1,
        "d6_2": 4,
        "gearItem": "Alarm!",
        "conditionAbilities": "Move all enemy Warriors 1” closer to this Warrior if they choose"
    },{
        "d66": "15",
        "d6_1": 1,
        "d6_2": 5,
        "gearItem": "Release the Beast!",
        "conditionAbilities": "Replace crate/chest with 1 Beast that follows this Warrior and joins the opponent’s Warband. Actions 3. Range 0. Attack 2. Damage 1. Hearts 3. (Attacks with claws for 1 Action. )"
    },{
        "d66": "16",
        "d6_1": 1,
        "d6_2": 6,
        "gearItem": "Spring-loaded",
        "conditionAbilities": "Push the searching Warrior twice. The opponent chooses the directions."
    },{
        "d66": "21",
        "d6_1": 2,
        "d6_2": 1,
        "gearItem": "Energy Potion / Energy Drink",
        "conditionAbilities":  "1 Free Move Action to use anytime during the battle. Use on this Warrior only."
    },{
        "d66": "22",
        "d6_1": 2,
        "d6_2": 2,
        "gearItem": "Healing Potion / Medi Pack",
        "conditionAbilities":  "1 Free Heal Action to use anytime during the battle. Use on this Warrior only."
    },{
        "d66": "23",
        "d6_1": 2,
        "d6_2": 3,
        "gearItem": "Energy Potion / Energy Drink",
        "conditionAbilities":  "1 Free Move Action to use anytime during the battle. Use on this Warrior only."
    },{
        "d66": "24",
        "d6_1": 2,
        "d6_2": 4,
        "gearItem": "Healing Potion / Medi Pack",
        "conditionAbilities":  "1 Free Heal Action to use anytime during the battle. Use on this Warrior only."
    },{
        "d66": "25",
        "d6_1": 2,
        "d6_2": 5,
        "gearItem": "Energy Potion / Energy Drink",
        "conditionAbilities":  "1 Free Move Action to use anytime during the battle. Use on this Warrior only."
    },{
        "d66": "26",
        "d6_1": 2,
        "d6_2": 6,
        "gearItem": "Healing Potion / Medi Pack",
        "conditionAbilities":  "1 Free Heal Action to use anytime during the battle. Use on this Warrior only."
    },{
        "d66": "31",
        "d6_1": 3,
        "d6_2": 1,
        "gearItem": "Bramble Berries / Power Bar",
        "conditionAbilities":  "1 Action to use. Heal 1 Heart."
    },{
        "d66": "32",
        "d6_1": 3,
        "d6_2": 2,
        "gearItem": "Bramble Berries / Power Bar",
        "conditionAbilities":  "1 Action to use. Heal 1 Heart."
    },{
        "d66": "33",
        "d6_1": 3,
        "d6_2": 3,
        "gearItem": "Bramble Berries / Power Bar",
        "conditionAbilities":  "1 Action to use. Heal 1 Heart."
    },{
        "d66": "34",
        "d6_1": 3,
        "d6_2": 4,
        "gearItem": "Smoke Pouch / Smoke Grenade",
        "conditionAbilities":  "1 Action to Throw up to 6”. A 3” circle of smoke blocks line of sight for next 3 activations"
    },{
        "d66": "35",
        "d6_1": 3,
        "d6_2": 5,
        "gearItem": "Blast Pouch / Frag Grenade",
        "conditionAbilities":  "1 Action to Throw up to 6”. A 3” circle blast causes 1D3 damage to every Warrior within it."
    },{
        "d66": "36",
        "d6_1": 3,
        "d6_2": 6,
        "gearItem": "Sticky Pouch / Stun Grenade",
        "conditionAbilities":  "1 Action to Throw up to 6”. Reduces movement of all Warriors within 3” by 1 for this turn."
    },{
        "d66": "41",
        "d6_1": 4,
        "d6_2": 1,
        "gearItem": "Smoke Pouch / Smoke Grenade",
        "conditionAbilities":  "1 Action to Throw up to 6”. A 3” circle of smoke blocks line of sight for next 3 activations"
    },{
        "d66": "42",
        "d6_1": 4,
        "d6_2": 2,
        "gearItem": "Blast Pouch / Frag Grenade",
        "conditionAbilities":  "1 Action to Throw up to 6”. A 3” circle blast causes 1D3 damage to every Warrior within it."
    },{
        "d66": "43",
        "d6_1": 4,
        "d6_2": 3,
        "gearItem": "Sticky Pouch / Stun Grenade",
        "conditionAbilities":  "1 Action to Throw up to 6”. Reduces movement of all Warriors within 3” by 1 for this turn."
    },{
        "d66": "44",
        "d6_1": 4,
        "d6_2": 4,
        "gearItem": "Clear Sight / Night Vision Goggles",
        "conditionAbilities":  "Free to use. Ignore enemy Cover for 1 activation."
    },{
        "d66": "45",
        "d6_1": 4,
        "d6_2": 5,
        "gearItem": "Spell of Cleansing / EMP",
        "conditionAbilities":  "No abilities or modifiers can be used by any of the Warriors on the battlefield for the rest of this round"
    },{
        "d66": "46",
        "d6_1": 4,
        "d6_2": 6,
        "gearItem": "Amulets / Deflection Sheild",
        "conditionAbilities":  "Reduce the next Ranged attack against this Warrior by -1 Attacks"
    },{
        "d66": "51",
        "d6_1": 5,
        "d6_2": 1,
        "gearItem": "Camo Cloak",
        "conditionAbilities":  "1 Action to use and then treated as in cover for 1 activation"
    },{
        "d66": "52",
        "d6_1": 5,
        "d6_2": 2,
        "gearItem": "Heavy Shield / Force Field",
        "conditionAbilities":  "+1 to Armour saves against Ranged attacks for the rest of the battle"
    },{
        "d66": "53",
        "d6_1": 5,
        "d6_2": 3,
        "gearItem": "Small Shield / Riot Shield",
        "conditionAbilities":  "+1 to Armour saves against Close Combat attacks for the rest of the battle"
    },{
        "d66": "54",
        "d6_1": 5,
        "d6_2": 4,
        "gearItem": "Teleport",
        "conditionAbilities":  "1 Action to teleport to within 1” of any other crate or chest on the battlefield"
    },{
        "d66": "55",
        "d6_1": 5,
        "d6_2": 5,
        "gearItem": "Blast Potion / RPG",
        "conditionAbilities":  "1 Action to pick a visible location on the battlefield. Range 18” 1D3 damage to all within 3” of location"
    },{
        "d66": "56",
        "d6_1": 5,
        "d6_2": 6,
        "gearItem": "Dynamite / Timed Charge",
        "conditionAbilities":  "1 Action to place within 3” of the Warrior. 1 Action to detonate during any activation. 1D3 Damage to all within 3”"
    },{
        "d66": "61",
        "d6_1": 6,
        "d6_2": 1,
        "gearItem": "Gold Bar",
        "conditionAbilities":  "+1 Token. Spend this at the Merchants immediately after the battle"
    },{
        "d66": "62",
        "d6_1": 6,
        "d6_2": 2,
        "gearItem": "Healing Spell / First Aid Kit",
        "conditionAbilities":  "+2 Hearts. Single-use Free Action"
    },{
        "d66": "63",
        "d6_1": 6,
        "d6_2": 3,
        "gearItem": "Ring of Strength / Weapon Upgrade Kit",
        "conditionAbilities":  "+1 Power. Use for the rest of the battle"
    },{
        "d66": "64",
        "d6_1": 6,
        "d6_2": 4,
        "gearItem": "Divine Shield / Advanced Tech Shield",
        "conditionAbilities":  "+1 Armour. Use for the rest of the battle"
    },{
        "d66": "65",
        "d6_1": 6,
        "d6_2": 5,
        "gearItem": "Spell of Swiftness / Nano Suit",
        "conditionAbilities":  "+1 Reaction. Use for the rest of the battle"
    },{
        "d66": "66",
        "d6_1": 6,
        "d6_2": 6,
        "gearItem": "Potion of Rage / Targeting AI",
        "conditionAbilities":  "+ 1 Attack Characteristics to close combat and ranged weapons. Use for the rest of the"
    },  
];