const abilities = 
{
    "SpecialAbilityTypes": [
      {
        "SpecialAbilityTypeKey": 85,
        "SpecialAbilityShortName": "----",
        "SpecialAbilityDisplayName": "----",
        "SpecialAbilityDescription": "----",
        "IsOptional": true,
        "AbilityColor": "",
        "AbilitySymbol": ""
      },
      {
        "SpecialAbilityTypeKey": 86,
        "SpecialAbilityShortName": "AQUATIC",
        "SpecialAbilityDisplayName": "Aquatic",
        "SpecialAbilityDescription": "This warrior can ignore all terrain and figure bases while moving. (Optional) This warrior may not be part of a movement formation. This warrior may move through figure bases and blocking terrain, though it may not end its move on another figure's base or in blocking terrain. This warrior's movement is not affected by hindering terrain and he does not have to stop when entering or leaving elevated terrain. This warrior only fails to break away from opposing figures on a roll of 1.",
        "IsOptional": true,
        "AbilityColor": "yellow",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 87,
        "SpecialAbilityShortName": "BATTLEARMOR",
        "SpecialAbilityDisplayName": "Battle Armor",
        "SpecialAbilityDescription": "This warrior's defense is improved against ranged combat attacks. Increase this warriors defense value by 2 versus ranged combat attacks t hat target or can affect him.",
        "IsOptional": false,
        "AbilityColor": "green",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 88,
        "SpecialAbilityShortName": "BATTLEFURY",
        "SpecialAbilityDisplayName": "Battle Fury",
        "SpecialAbilityDescription": "This warrior cannot capture or be captured. If this warrior already controls a captive: the captive is released, is no longer controlled by this warrior, and may be given actions normally.",
        "IsOptional": false,
        "AbilityColor": "1.0,0.582,0.0,1.0",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 89,
        "SpecialAbilityShortName": "BERSERK",
        "SpecialAbilityDisplayName": "Berserk",
        "SpecialAbilityDescription": "This warrior cannot make ranged combat attacks. This warrior may not be given a ranged combat action and may not capture or be captured. If this warrior already controls a captive, this warrior immediately eliminates that captive.",
        "IsOptional": false,
        "AbilityColor": "red",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 90,
        "SpecialAbilityShortName": "BOUND",
        "SpecialAbilityDisplayName": "Bound",
        "SpecialAbilityDescription": "This warrior can move and then make a ranged combat attack using the same action. (Optional) This warrior may not be part of any formation. When you give this warrior a move action, he may move up to twice his speed value. If he did not start the turn in base contact with an opposing figure, he may instead move up to his normal speed value, then make a ranged combat attack as if he had been given a ranged combat action. This ranged combat attack does not cost an extra action. This warrior only fails to break away from opposing figures on a roll of a 1.",
        "IsOptional": true,
        "AbilityColor": "grey",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 91,
        "SpecialAbilityShortName": "CHARGE",
        "SpecialAbilityDisplayName": "Charge",
        "SpecialAbilityDescription": "The warrior can move and then make a close combat attack using the same action. (Optional) This warrior may not be part of any formation. When you give this warrior a move action he may move up to twice his speed value. If he did not start the turn in base contact with an opposing figure, he may instead move up to his normal speed value, and then make a close combat attack as if he had been given a close combat action. This close combat attack does not cost an extra action. This warrior only fails to break away from opposing figures on a roll of 1.",
        "IsOptional": true,
        "AbilityColor": "green",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 92,
        "SpecialAbilityShortName": "COMMAND",
        "SpecialAbilityDisplayName": "Command",
        "SpecialAbilityDescription": "This warrior may add an action to your turn. At the beginning of your turn, roll 1 six-sided die for this warrior. On a result of 6, add one extra action to your normal action allotment for that turn. Also, at the beginning of your turn, each Demoralized freindly figure in base contact with this warrior automatically heals 1 click. This warrior may not be captured.",
        "IsOptional": false,
        "AbilityColor": "grey",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 93,
        "SpecialAbilityShortName": "DEAD",
        "SpecialAbilityDisplayName": "Dead",
        "SpecialAbilityDescription": "Dead",
        "IsOptional": true,
        "AbilityColor": "",
        "AbilitySymbol": "ab_skull"
      },
      {
        "SpecialAbilityTypeKey": 94,
        "SpecialAbilityShortName": "DEFEND",
        "SpecialAbilityDisplayName": "Defend",
        "SpecialAbilityDescription": "This warrior can share his defense value with friendly figures in base contact. (Optional) Any friendly figure in base contact with this warrior may use this warrior's defense value instead of its own.",
        "IsOptional": true,
        "AbilityColor": "yellow",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 95,
        "SpecialAbilityShortName": "DEMORALIZED",
        "SpecialAbilityDisplayName": "Demoralized",
        "SpecialAbilityDescription": "This warrior can only be given a move or pass action. This warrior may never voluntarily move into base contact with an opposing figure.",
        "IsOptional": true,
        "AbilityColor": "yellow",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 96,
        "SpecialAbilityShortName": "DODGE",
        "SpecialAbilityDisplayName": "Dodge",
        "SpecialAbilityDescription": "This warrior avoids damage from attacks half the time. (Optional) When this warrior is successfully hit by a ranged or close combat attack, roll 1 six-sided die. On a result of 4, 5 or 6, the attack is considered to miss this warrior.",
        "IsOptional": true,
        "AbilityColor": "red",
        "AbilitySymbol": "ab_circ"
      },
      {
        "SpecialAbilityTypeKey": 97,
        "SpecialAbilityShortName": "FLAME/LIGHTNING",
        "SpecialAbilityDisplayName": "Flame Lightning",
        "SpecialAbilityDescription": "This warrior's ranged combat attack can affect all figures in base contact with the target. (Optional) Give this warrior a ranged combat action and reduce his damage value to 1. A successful ranged combat attack affects the target figure and every figure in base contact with the target, delivering 1 click of damage to each figure successfully hit. Make only one attack dice roll; compare that result to the defense value of the target figure and every figure in base contact with it.",
        "IsOptional": true,
        "AbilityColor": "1.0,0.582,0.0,1.0",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 98,
        "SpecialAbilityShortName": "FLIGHT",
        "SpecialAbilityDisplayName": "Flight",
        "SpecialAbilityDescription": "This warrior can ignore all terrain and figure bases while moving. (Optional) This warrior may not be part of a movement formation. This warrior may move through figure bases and blocking terrain, though it may not end its move on another figure's base or in blocking terrain. This warrior's movement is not affected by hindering terrain and he does not have to stop when entering or leaving elevated terrain. This warrior only fails to break away from opposing figures on a roll of 1.",
        "IsOptional": true,
        "AbilityColor": "1.0,0.582,0.0,1.0",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 99,
        "SpecialAbilityShortName": "FORCEDMARCH",
        "SpecialAbilityDisplayName": "Forced March",
        "SpecialAbilityDescription": "This warrior can share his speed value in a movement formation. (Optional) All figures in a movement formation with this warrior use this warrior's speed value.",
        "IsOptional": true,
        "AbilityColor": "red",
        "AbilitySymbol": "ab_circ"
      },
      {
        "SpecialAbilityTypeKey": 100,
        "SpecialAbilityShortName": "HEALING",
        "SpecialAbilityDisplayName": "Healing",
        "SpecialAbilityDescription": "This warrior can heal friendly figures with a close combat action. (Optional) Give this warrior a close combat action with a friendly figure as the target. Neither may be in base contact with an opposing figure. Ignore all modifiers to the close combat attack. If the attack succeeds, you may use this warrior's damage value to heal exactly that many clicks to the target figure. Alternatively, you may roll 1 six-sided die and heal that many clicks to the target figure.",
        "IsOptional": true,
        "AbilityColor": "green",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 101,
        "SpecialAbilityShortName": "INVULNERABILITY",
        "SpecialAbilityDisplayName": "Invulnerability",
        "SpecialAbilityDescription": "This warrior's defense is improved against ranged attacks and reduces damage delivered to him by 2 clicks. Increase this warrior's defense value by 2 versus ranged combat attacks that target or can affect him. Reduce by 2 clicks any damage inflicted on this warrior by ranged or close combat attacks, or special ability that deliver damage. Invulerability does not reduce pushing or critical miss damage. This warrior cannot be healed. This warrior cannot capture or be captured. If this warrior already controls a captive: the captive is released, is no longer controlled by this warrior, and may be given actions normally.",
        "IsOptional": false,
        "AbilityColor": "grey",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 102,
        "SpecialAbilityShortName": "LIMITEDINVISIBILITY",
        "SpecialAbilityDisplayName": "Limited Invisibility",
        "SpecialAbilityDescription": "This warrior may not be the target of a ranged combat attack action. (Optional)",
        "IsOptional": true,
        "AbilityColor": "black",
        "AbilitySymbol": "ab_circ"
      },
      {
        "SpecialAbilityTypeKey": 103,
        "SpecialAbilityShortName": "MAGICBLAST",
        "SpecialAbilityDisplayName": "Magic Blast",
        "SpecialAbilityDescription": "This warrior can use a ranged combat action to deliver 1 to 6 clicks of damage. (Optional) Give this warrior a ranged combat action, and choose only one target figure. Line of fire is never considered blocked by terrain or other figures, and no terrain modifiers are applied. If the attack succeeds, roll 1 six-sided die. This is the number of clicks of damage you inflict on the target figure, instead of this warrior's normal damage value.",
        "IsOptional": true,
        "AbilityColor": "blue",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 104,
        "SpecialAbilityShortName": "MAGICCONFUSION",
        "SpecialAbilityDisplayName": "Magic Confusion",
        "SpecialAbilityDescription": "This warrior may make a ranged combat attack to move an opposing figure. (Optional) Give this warrior a ranged combat action and choose one opposing target figure. An opposing target figure hit by this attack takes no damage, regardless of situations or special abilities that might otherwise inflict damage. Treat an opposing figure hit by this attack as if it has been given a move action, but you control that figure's action. Resolve this move action immediately. This action does not place an action token on the target figure, and there is no pushing penalty. The target figure may not be moved into base contact with a figure friendly to you. The target figure may not use any special ability that reads 'but do not move him,' and none of its optional special abilities may be cancelled while you resolve this move action.",
        "IsOptional": true,
        "AbilityColor": "black",
        "AbilitySymbol": "ab_circ"
      },
      {
        "SpecialAbilityTypeKey": 105,
        "SpecialAbilityShortName": "MAGICENHANCEMENT",
        "SpecialAbilityDisplayName": "Magic Enhancement",
        "SpecialAbilityDescription": "This warrior improves the damage delivered by friendly ranged combat attacks. (Optional) Any friendly figure given a ranged combat action while in base contact with this warrior will inflict 1 extra click of damage to any opposing figure(s) successfully hit by the attack.",
        "IsOptional": true,
        "AbilityColor": "blue",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 106,
        "SpecialAbilityShortName": "MAGICFREEZE",
        "SpecialAbilityDisplayName": "Magic Freeze",
        "SpecialAbilityDescription": "This warrior may use a ranged combat attack to add an action token to a target figure. (Optional) Give this warrior a ranged combat action. Reduce his damage value to 1. When this warrior successfully hits a target figure, and that figure has 0 or 1 action tokens, roll 1 six-sided die for that figure. On a result of 4, 5 or 6, place an action token on that figure and treat it as if it had just taken a non-pass action. If a target figure is given its second action token, it is considered pushed and takes 1 click of pushing damage.",
        "IsOptional": true,
        "AbilityColor": "blue",
        "AbilitySymbol": "ab_circ"
      },
      {
        "SpecialAbilityTypeKey": 107,
        "SpecialAbilityShortName": "MAGICHEALING",
        "SpecialAbilityDisplayName": "Magic Healing",
        "SpecialAbilityDescription": "This warrior can heal friendly figures with a ranged combat action. (Optional) Give this warrior a ranged combat action and choose a friendly figure as the target. The target may not be in base contact with an opposing figure, but may be in base contact with this warrior. All modifiers to the ranged combat attack are ignored. If the attack succeeds, roll 1 six-sided die and heal that many clicks to the target figure.",
        "IsOptional": true,
        "AbilityColor": "grey",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 108,
        "SpecialAbilityShortName": "MAGICIMMUNITY",
        "SpecialAbilityDisplayName": "Magic Immunity",
        "SpecialAbilityDescription": "This warrior is immune to Magic effects. This warrior cannot be affected by any other special ability with the word 'Magic' in its name. This warrior neither receives nor inflicts extra clicks of damage caused by Magic Enhancement",
        "IsOptional": false,
        "AbilityColor": "blue",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 109,
        "SpecialAbilityShortName": "MAGICLEVITATION",
        "SpecialAbilityDisplayName": "Magic Levitation",
        "SpecialAbilityDescription": "This warrior can move another figure up to 10 units. (Optional) Give this warrior a move action, but do not move him. Select a target figure that was in base contact with this warrior at the beginning of the turn. Pick up the target figure and move it up to 10 units in any direction, ignoring terrain and figure bases. You decide facing. The target figure may not be placed in blocking terrain. The target figure may not be given an action for the remainder of the turn.",
        "IsOptional": true,
        "AbilityColor": "blue",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 110,
        "SpecialAbilityShortName": "MAGICRETALIATION",
        "SpecialAbilityDisplayName": "Magic Retaliation",
        "SpecialAbilityDescription": "This warrior delivers a click of damage to an attacker that damages him. When this warrior is damaged by an attack, the attacker (or primary attacker, if damaged by a formation attack) receives 1 click of damage.",
        "IsOptional": false,
        "AbilityColor": "blue",
        "AbilitySymbol": "ab_circ"
      },
      {
        "SpecialAbilityTypeKey": 111,
        "SpecialAbilityShortName": "NECROMANCY",
        "SpecialAbilityDisplayName": "Necromancy",
        "SpecialAbilityDescription": "This warrior can bring one of your eliminated figures back into play. (Optional) Give this warrior a move action, but do not move him. He may not be in base contact with an opposing figure. Choose one of your eliminated warriors. Turn its combat dial to the Starting Position. Roll 1 six-sided die and turn the figures combat dial clockwise (the same direction as if you were applying damage) that number of clicks. If the figure's stat slot does not show three skulls, that figure is now returned to play. Place the chosen figure on the battlefield in base contact with this warrior. Do not roll the die for figures with the words Zombie or Skeleton in their naimes; they always return to the game at full strength.",
        "IsOptional": true,
        "AbilityColor": "black",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 112,
        "SpecialAbilityShortName": "NIMBLE",
        "SpecialAbilityDisplayName": "Nimble",
        "SpecialAbilityDescription": "This warrior can change his facing without being given an action. (Optional) This warrior may change his facing at any time during your turn. This warrior may not use the ability during the resolution of an attack or other special ability. Use of this ability does not require an action.",
        "IsOptional": true,
        "AbilityColor": "blue",
        "AbilitySymbol": "ab_circ"
      },
      {
        "SpecialAbilityTypeKey": 113,
        "SpecialAbilityShortName": "PIERCE",
        "SpecialAbilityDisplayName": "Pierce",
        "SpecialAbilityDescription": "(Optional) This warrior's ranged combat attacks ignore Battle Armor, Toughness and Invulnerability.",
        "IsOptional": true,
        "AbilityColor": "red",
        "AbilitySymbol": "ab_circ"
      },
      {
        "SpecialAbilityTypeKey": 114,
        "SpecialAbilityShortName": "POLEARM",
        "SpecialAbilityDisplayName": "Pole Arm",
        "SpecialAbilityDescription": "This warrior will damage opposing figures that come into contact with him. If an opposing figure moves, and is in base contact with this warrior's front arc after the free spin opportunity, the opposing figure takes 1 click of damage and his action is ended.",
        "IsOptional": false,
        "AbilityColor": "red",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 115,
        "SpecialAbilityShortName": "QUICKNESS",
        "SpecialAbilityDisplayName": "Quickness",
        "SpecialAbilityDescription": "This warrior can move without being given an action. (Optional) This warrior may not be part of a movement formation. This warrior may perform a move action without you having to give him one of your actions for the turn. He is treated for all purposes as if he was given an action and is marked with an action token normally.",
        "IsOptional": true,
        "AbilityColor": "red",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 116,
        "SpecialAbilityShortName": "RAM",
        "SpecialAbilityDisplayName": "Ram",
        "SpecialAbilityDescription": "This warrior delivers a click of damage when he moves into base contact with an opposing figure. (Optional) This warrior may not be part of a movement formation and does not cause shake off damage. When this warrior moves, and his front arc is in base contact with one or more opposing figures at the end of that movement, he inflicts 1 click of damage on each of those opposing figures after the free spin opportunity.",
        "IsOptional": true,
        "AbilityColor": "black",
        "AbilitySymbol": "ab_circ"
      },
      {
        "SpecialAbilityTypeKey": 117,
        "SpecialAbilityShortName": "REGENERATION",
        "SpecialAbilityDisplayName": "Regeneration",
        "SpecialAbilityDescription": "This warrior can heal 0 to 4 clicks to himself. (Optional) You may give this warrior a move action, but do not move him. Roll 1 six-sided die and subtract 2 from the roll. Treat a negative result as 0. The result is the number of clicks that are healed on this warrior's combat dial.",
        "IsOptional": true,
        "AbilityColor": "black",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 118,
        "SpecialAbilityShortName": "SHOCKWAVE",
        "SpecialAbilityDisplayName": "Shockwave",
        "SpecialAbilityDescription": "This warrior's ranged combat attack can affect every figure within half his range value. (Optional) Give this warrior a ranged combat action. Reduce his range value by half. Draw a line of fire to every non-captive figure (friendly and opposing) within range in every direction, regardless of this warrior's front arc facing. If clear lines of fire can be drawn to two or more figures within range, Shockwave will inflict 1 click of damage on each figure successfully hit. If there is only one eligible figure within range, Shockwave will deliver this warrior's normal damage if that figure is successfully hit. Lines of fire are drawn to figures, and the attack is resolved, as if the target figures have no special abilities (Aquatic is not affected). Shockwave allows you to attack opposing figures even if they are in base contact with friendly figures, and/or control captives.",
        "IsOptional": true,
        "AbilityColor": "yellow",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 119,
        "SpecialAbilityShortName": "SNEAKATTACK",
        "SpecialAbilityDisplayName": "Sneak Attack",
        "SpecialAbilityDescription": "This warrior can deliver double damage with a close combat attack to the target's rear arc. (Optional) When this warrior is given a move action, and is in base contact with an opposing figure at the end of that movement, the opposing figure does not get a free spin opportunity. When this warrior is given a close combat action, and he is in base contact with the rear arc of the target figure, double his damage value.",
        "IsOptional": true,
        "AbilityColor": "blue",
        "AbilitySymbol": "ab_circ"
      },
      {
        "SpecialAbilityTypeKey": 120,
        "SpecialAbilityShortName": "STARTINGPOSITION",
        "SpecialAbilityDisplayName": "Staring Position",
        "SpecialAbilityDescription": "All warriors must start the game with this square showing. Before every Mage Knight battle, all warriors' combat dials must show this green square. This square is often split with another damage special ability color.",
        "IsOptional": false,
        "AbilityColor": "green",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 121,
        "SpecialAbilityShortName": "STEALTH",
        "SpecialAbilityDisplayName": "Stealth",
        "SpecialAbilityDescription": "Hindering terrain blocks line of fire to this warrior. (Optional) Any line of fire drawn to this warrior that passes through hindering terrain is treated as though it has been drawn through blocking terrain.",
        "IsOptional": true,
        "AbilityColor": "black",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 122,
        "SpecialAbilityShortName": "SWEEP",
        "SpecialAbilityDisplayName": "Sweep",
        "SpecialAbilityDescription": "This warrior can hit every opposing figure in front-arc contact with a close combat action. (Optional) Give this warrior a close combat action. He may not make a capture attempt. This warrior may resolve his attack against every opposing figure in his front arc. Roll the attack dice once and compare the result to the defense values of all opposing target figures. This attack inflicts the warrior's normal damage against all targets successfully hit.",
        "IsOptional": true,
        "AbilityColor": "black",
        "AbilitySymbol": "ab_circ"
      },
      {
        "SpecialAbilityTypeKey": 123,
        "SpecialAbilityShortName": "TOUGHNESS",
        "SpecialAbilityDisplayName": "Toughness",
        "SpecialAbilityDescription": "This warrior reduces damage delivered to him by 1 click. Subtract 1 from any damage inflicted on this warrior by ranged or close combat attacks, or by special ability effects that deliver damage (e.g., Pole Arm, Ram, Venom, Magic Retaliation) Toughness does not reduce pushing or critcal miss damage.",
        "IsOptional": false,
        "AbilityColor": "1.0,0.582,0.0,1.0",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 124,
        "SpecialAbilityShortName": "VAMPIRISM",
        "SpecialAbilityDisplayName": "Vampirism",
        "SpecialAbilityDescription": "This warrior can heal himself with a successful close combat attack. Heal 1 click on this warrior whenever he inflicts damage on a target figure during a close combat attack.",
        "IsOptional": false,
        "AbilityColor": "black",
        "AbilitySymbol": "ab_squ"
      },
      {
        "SpecialAbilityTypeKey": 125,
        "SpecialAbilityShortName": "VENOM",
        "SpecialAbilityDisplayName": "Venom",
        "SpecialAbilityDescription": "This warrior automatically damages opposing figures in base contact at the beginning of your turn. At the beginning of your turn, this warrior delivers 1 click of damage to each opposing figure in base contact with his front arc.",
        "IsOptional": false,
        "AbilityColor": "red",
        "AbilitySymbol": "ab_circ"
      },
      {
        "SpecialAbilityTypeKey": 126,
        "SpecialAbilityShortName": "WEAPONMASTER",
        "SpecialAbilityDisplayName": "Weapon Master",
        "SpecialAbilityDescription": "This warrior can use a close combat action to deliver 1 to 6 clicks of damage. (Optional) Give this warrior a close combat action. If the attack succeeds, roll 1 six-sided die. This is the number of clicks of damage you inflict on the target figure, instead of this warrior's normal damage value.",
        "IsOptional": true,
        "AbilityColor": "red",
        "AbilitySymbol": "ab_squ"
      }
    ]
  }
  ;