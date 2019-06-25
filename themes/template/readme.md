#Example Template
This is a template for a generic pokelink theme

## Technical Details
Pokélink's web sources use the following tech to achieve their goal of enabling live, low-maintanance updates to a users layout:
 - [VueJS](https://vuejs.org) enables client side template compilation & rendering, and also real time updates with computed properties, etc.
 - [Socket.IO](https://socket.io) allows real time communication between the web sources and the Pokélink desktop app using web sockets.

## Events
Updates are split into `events`. These events allow the browser source to handle specific updates in different ways. These are subject to change in major releases. Currently they are:
 - `client:party:updated` - This triggers when a players party is updated
 - `player:trainer:updated` - This happens when a specific player has a trainer update (Such as a new badge etc)
 - `client:players:list` - This happens as a major update with all data about the session available (happens only currently on initial load)

### client:party:updated
```json
{
	"username": "Jez",
	"update": {
		"party": [{
			"pokemon": {
				"isEgg": 0,
				"exp": 976,
				"hp": {
					"max": 29,
					"current": 11
				},
				"nature": "Gentle",
				"move2": {
					"pp": 0
				},
				"isGenderless": true,
				"speciesName": "Abra",
				"species": 63,
				"status": {
					"psn": 0,
					"slp": 0,
					"par": 0,
					"fzn": 0,
					"brn": 0
				},
				"nickname": "xHyt",
				"levelMet": 3,
				"isShiny": false,
				"move4": {
					"pp": 0
				},
				"ability": "--",
				"level": 12,
				"hiddenpower": "Ice",
				"move1": {
					"name": "Skull Bash",
					"pp": 11
				},
				"pokerus": 0,
				"evs": {
					"atk": 4,
					"def": 1,
					"spatk": 1,
					"spd": 5,
					"spdef": 4,
					"hp": 6
				},
				"isFemale": false,
				"heldItem": 0,
				"pid": 2429532646,
				"ivs": {
					"atk": 17,
					"def": 5,
					"spatk": 29,
					"spd": 18,
					"spdef": 31,
					"hp": 23
				},
				"locationMet": 18,
				"move3": {
					"pp": 0
				}
			},
			"slotId": 1,
			"changeId": 0
		}, {
			"pokemon": {
				"isEgg": 0,
				"exp": 491,
				"hp": {
					"max": 29,
					"current": 29
				},
				"nature": "Naughty",
				"move2": {
					"name": "Hyper Beam",
					"pp": 5
				},
				"isGenderless": true,
				"speciesName": "Treecko",
				"species": 252,
				"status": {
					"psn": 0,
					"slp": 0,
					"par": 0,
					"fzn": 0,
					"brn": 0
				},
				"nickname": "Nero",
				"levelMet": 0,
				"isShiny": false,
				"move4": {
					"name": "Air Cutter",
					"pp": 25
				},
				"ability": "--",
				"level": 9,
				"hiddenpower": "Rock",
				"move1": {
					"name": "Tail Whip",
					"pp": 30
				},
				"pokerus": 0,
				"evs": {
					"atk": 0,
					"def": 1,
					"spatk": 3,
					"spd": 2,
					"spdef": 0,
					"hp": 2
				},
				"isFemale": false,
				"heldItem": 0,
				"pid": 4209861879,
				"ivs": {
					"atk": 16,
					"def": 3,
					"spatk": 31,
					"spd": 0,
					"spdef": 22,
					"hp": 22
				},
				"locationMet": 146,
				"move3": {
					"name": "Frenzy Plant",
					"pp": 5
				}
			},
			"slotId": 2,
			"changeId": 0
		}, {
			"pokemon": {
				"isEgg": 0,
				"exp": 812,
				"hp": {
					"max": 24,
					"current": 24
				},
				"nature": "Quiet",
				"move2": {
					"name": "BubbleBeam",
					"pp": 20
				},
				"isGenderless": true,
				"speciesName": "Duskull",
				"species": 355,
				"status": {
					"psn": 0,
					"slp": 0,
					"par": 0,
					"fzn": 0,
					"brn": 0
				},
				"nickname": "Duskullp",
				"levelMet": 0,
				"isShiny": false,
				"move4": {
					"name": "Cut",
					"pp": 30
				},
				"ability": "--",
				"level": 10,
				"hiddenpower": "Flying",
				"move1": {
					"name": "Fly",
					"pp": 15
				},
				"pokerus": 0,
				"evs": {
					"atk": 1,
					"def": 5,
					"spatk": 0,
					"spd": 3,
					"spdef": 0,
					"hp": 1
				},
				"isFemale": false,
				"heldItem": 0,
				"pid": 605294667,
				"ivs": {
					"atk": 22,
					"def": 14,
					"spatk": 6,
					"spd": 3,
					"spdef": 12,
					"hp": 0
				},
				"locationMet": 146,
				"move3": {
					"name": "Giga Drain",
					"pp": 4
				}
			},
			"slotId": 3,
			"changeId": 0
		}, {
			"pokemon": {
				"isEgg": 0,
				"exp": 339,
				"hp": {
					"max": 20,
					"current": 20
				},
				"nature": "Naive",
				"move2": {
					"name": "Blizzard",
					"pp": 5
				},
				"isGenderless": true,
				"speciesName": "Koffing",
				"species": 109,
				"status": {
					"psn": 0,
					"slp": 0,
					"par": 0,
					"fzn": 0,
					"brn": 0
				},
				"nickname": "NinasButt",
				"levelMet": 0,
				"isShiny": false,
				"move4": {
					"pp": 0
				},
				"ability": "--",
				"level": 6,
				"hiddenpower": "Electric",
				"move1": {
					"name": "Low Kick",
					"pp": 20
				},
				"pokerus": 0,
				"evs": {
					"atk": 0,
					"def": 2,
					"spatk": 2,
					"spd": 1,
					"spdef": 0,
					"hp": 0
				},
				"isFemale": false,
				"heldItem": 0,
				"pid": 540253689,
				"ivs": {
					"atk": 8,
					"def": 6,
					"spatk": 23,
					"spd": 0,
					"spdef": 17,
					"hp": 5
				},
				"locationMet": 146,
				"move3": {
					"pp": 0
				}
			},
			"slotId": 4,
			"changeId": 0
		}, {
			"pokemon": {
				"isEgg": 0,
				"exp": 104,
				"hp": {
					"max": 19,
					"current": 2
				},
				"nature": "Gentle",
				"move2": {
					"name": "Ice Punch",
					"pp": 15
				},
				"isGenderless": true,
				"speciesName": "Goldeen",
				"species": 118,
				"status": {
					"psn": 0,
					"slp": 0,
					"par": 0,
					"fzn": 0,
					"brn": 0
				},
				"nickname": "Starmie",
				"levelMet": 4,
				"isShiny": false,
				"move4": {
					"pp": 0
				},
				"ability": "--",
				"level": 4,
				"hiddenpower": "Rock",
				"move1": {
					"name": "Mega Kick",
					"pp": 3
				},
				"pokerus": 0,
				"evs": {
					"atk": 0,
					"def": 0,
					"spatk": 0,
					"spd": 1,
					"spdef": 0,
					"hp": 0
				},
				"isFemale": false,
				"heldItem": 0,
				"pid": 1446441871,
				"ivs": {
					"atk": 27,
					"def": 6,
					"spatk": 13,
					"spd": 22,
					"spdef": 14,
					"hp": 25
				},
				"locationMet": 19,
				"move3": {
					"name": "Overheat",
					"pp": 5
				}
			},
			"slotId": 5,
			"changeId": 0
		}, {
			"pokemon": {
				"isEgg": 0,
				"exp": 703,
				"hp": {
					"max": 31,
					"current": 31
				},
				"nature": "Adamant",
				"move2": {
					"name": "Fire Punch",
					"pp": 15
				},
				"isGenderless": true,
				"speciesName": "Whismur",
				"species": 293,
				"status": {
					"psn": 0,
					"slp": 0,
					"par": 0,
					"fzn": 0,
					"brn": 0
				},
				"nickname": "Whismurp",
				"levelMet": 0,
				"isShiny": false,
				"move4": {
					"pp": 0
				},
				"ability": "--",
				"level": 10,
				"hiddenpower": "Fighting",
				"move1": {
					"name": "Ice Punch",
					"pp": 15
				},
				"pokerus": 0,
				"evs": {
					"atk": 3,
					"def": 2,
					"spatk": 0,
					"spd": 4,
					"spdef": 1,
					"hp": 0
				},
				"isFemale": false,
				"heldItem": 0,
				"pid": 3985898503,
				"ivs": {
					"atk": 3,
					"def": 14,
					"spatk": 26,
					"spd": 20,
					"spdef": 2,
					"hp": 9
				},
				"locationMet": 146,
				"move3": {
					"pp": 0
				}
			},
			"slotId": 6,
			"changeId": 0
		}]
	}
}
```

### player:trainer:updated
coming soon

### On initial Page Load
```json
[{
	"id": "Wg_TS21rkMIYC0nNAAAA",
	"username": "Jez",
	"trainer": {
		"badges": [{
			"name": "Stone",
			"value": false
		}, {
			"name": "Knuckle",
			"value": false
		}, {
			"name": "Dynamo",
			"value": false
		}, {
			"name": "Heat",
			"value": false
		}, {
			"name": "Balance",
			"value": false
		}, {
			"name": "Feather",
			"value": false
		}, {
			"name": "Mind",
			"value": false
		}, {
			"name": "Rain",
			"value": false
		}],
		"game": {
			"friendlyName": "Pokémon Emerald",
			"gen3_game_key": 2,
			"gen3_subgame_key": 0,
			"gen45_game_key": 0,
			"gen45_subgame_key": 0,
			"generation": 3,
			"id": "POKEMON EMER"
		},
		"trainerName": null,
		"trainer_id": null,
		"secret_id": null,
		"money": null
	},
	"party": [{
		"pokemon": {
			"isEgg": 0,
			"exp": 976,
			"hp": {
				"max": 29,
				"current": 11
			},
			"nature": "Gentle",
			"move2": {
				"pp": 0
			},
			"isGenderless": true,
			"speciesName": "Abra",
			"species": 63,
			"status": {
				"psn": 0,
				"slp": 0,
				"par": 0,
				"fzn": 0,
				"brn": 0
			},
			"nickname": "xHyt",
			"levelMet": 3,
			"isShiny": false,
			"move4": {
				"pp": 0
			},
			"ability": "--",
			"level": 12,
			"hiddenpower": "Ice",
			"move1": {
				"name": "Skull Bash",
				"pp": 11
			},
			"pokerus": 0,
			"evs": {
				"atk": 4,
				"def": 1,
				"spatk": 1,
				"spd": 5,
				"spdef": 4,
				"hp": 6
			},
			"isFemale": false,
			"heldItem": 0,
			"pid": 2429532646,
			"ivs": {
				"atk": 17,
				"def": 5,
				"spatk": 29,
				"spd": 18,
				"spdef": 31,
				"hp": 23
			},
			"locationMet": 18,
			"move3": {
				"pp": 0
			}
		},
		"slotId": 1,
		"changeId": 0
	}, {
		"pokemon": {
			"isEgg": 0,
			"exp": 491,
			"hp": {
				"max": 29,
				"current": 29
			},
			"nature": "Naughty",
			"move2": {
				"name": "Hyper Beam",
				"pp": 5
			},
			"isGenderless": true,
			"speciesName": "Treecko",
			"species": 252,
			"status": {
				"psn": 0,
				"slp": 0,
				"par": 0,
				"fzn": 0,
				"brn": 0
			},
			"nickname": "Nero",
			"levelMet": 0,
			"isShiny": false,
			"move4": {
				"name": "Air Cutter",
				"pp": 25
			},
			"ability": "--",
			"level": 9,
			"hiddenpower": "Rock",
			"move1": {
				"name": "Tail Whip",
				"pp": 30
			},
			"pokerus": 0,
			"evs": {
				"atk": 0,
				"def": 1,
				"spatk": 3,
				"spd": 2,
				"spdef": 0,
				"hp": 2
			},
			"isFemale": false,
			"heldItem": 0,
			"pid": 4209861879,
			"ivs": {
				"atk": 16,
				"def": 3,
				"spatk": 31,
				"spd": 0,
				"spdef": 22,
				"hp": 22
			},
			"locationMet": 146,
			"move3": {
				"name": "Frenzy Plant",
				"pp": 5
			}
		},
		"slotId": 2,
		"changeId": 0
	}, {
		"pokemon": {
			"isEgg": 0,
			"exp": 812,
			"hp": {
				"max": 24,
				"current": 24
			},
			"nature": "Quiet",
			"move2": {
				"name": "BubbleBeam",
				"pp": 20
			},
			"isGenderless": true,
			"speciesName": "Duskull",
			"species": 355,
			"status": {
				"psn": 0,
				"slp": 0,
				"par": 0,
				"fzn": 0,
				"brn": 0
			},
			"nickname": "Duskullp",
			"levelMet": 0,
			"isShiny": false,
			"move4": {
				"name": "Cut",
				"pp": 30
			},
			"ability": "--",
			"level": 10,
			"hiddenpower": "Flying",
			"move1": {
				"name": "Fly",
				"pp": 15
			},
			"pokerus": 0,
			"evs": {
				"atk": 1,
				"def": 5,
				"spatk": 0,
				"spd": 3,
				"spdef": 0,
				"hp": 1
			},
			"isFemale": false,
			"heldItem": 0,
			"pid": 605294667,
			"ivs": {
				"atk": 22,
				"def": 14,
				"spatk": 6,
				"spd": 3,
				"spdef": 12,
				"hp": 0
			},
			"locationMet": 146,
			"move3": {
				"name": "Giga Drain",
				"pp": 4
			}
		},
		"slotId": 3,
		"changeId": 0
	}, {
		"pokemon": {
			"isEgg": 0,
			"exp": 339,
			"hp": {
				"max": 20,
				"current": 20
			},
			"nature": "Naive",
			"move2": {
				"name": "Blizzard",
				"pp": 5
			},
			"isGenderless": true,
			"speciesName": "Koffing",
			"species": 109,
			"status": {
				"psn": 0,
				"slp": 0,
				"par": 0,
				"fzn": 0,
				"brn": 0
			},
			"nickname": "NinasButt",
			"levelMet": 0,
			"isShiny": false,
			"move4": {
				"pp": 0
			},
			"ability": "--",
			"level": 6,
			"hiddenpower": "Electric",
			"move1": {
				"name": "Low Kick",
				"pp": 20
			},
			"pokerus": 0,
			"evs": {
				"atk": 0,
				"def": 2,
				"spatk": 2,
				"spd": 1,
				"spdef": 0,
				"hp": 0
			},
			"isFemale": false,
			"heldItem": 0,
			"pid": 540253689,
			"ivs": {
				"atk": 8,
				"def": 6,
				"spatk": 23,
				"spd": 0,
				"spdef": 17,
				"hp": 5
			},
			"locationMet": 146,
			"move3": {
				"pp": 0
			}
		},
		"slotId": 4,
		"changeId": 0
	}, {
		"pokemon": {
			"isEgg": 0,
			"exp": 104,
			"hp": {
				"max": 19,
				"current": 2
			},
			"nature": "Gentle",
			"move2": {
				"name": "Ice Punch",
				"pp": 15
			},
			"isGenderless": true,
			"speciesName": "Goldeen",
			"species": 118,
			"status": {
				"psn": 0,
				"slp": 0,
				"par": 0,
				"fzn": 0,
				"brn": 0
			},
			"nickname": "Starmie",
			"levelMet": 4,
			"isShiny": false,
			"move4": {
				"pp": 0
			},
			"ability": "--",
			"level": 4,
			"hiddenpower": "Rock",
			"move1": {
				"name": "Mega Kick",
				"pp": 3
			},
			"pokerus": 0,
			"evs": {
				"atk": 0,
				"def": 0,
				"spatk": 0,
				"spd": 1,
				"spdef": 0,
				"hp": 0
			},
			"isFemale": false,
			"heldItem": 0,
			"pid": 1446441871,
			"ivs": {
				"atk": 27,
				"def": 6,
				"spatk": 13,
				"spd": 22,
				"spdef": 14,
				"hp": 25
			},
			"locationMet": 19,
			"move3": {
				"name": "Overheat",
				"pp": 5
			}
		},
		"slotId": 5,
		"changeId": 0
	}, {
		"pokemon": {
			"isEgg": 0,
			"exp": 703,
			"hp": {
				"max": 31,
				"current": 31
			},
			"nature": "Adamant",
			"move2": {
				"name": "Fire Punch",
				"pp": 15
			},
			"isGenderless": true,
			"speciesName": "Whismur",
			"species": 293,
			"status": {
				"psn": 0,
				"slp": 0,
				"par": 0,
				"fzn": 0,
				"brn": 0
			},
			"nickname": "Whismurp",
			"levelMet": 0,
			"isShiny": false,
			"move4": {
				"pp": 0
			},
			"ability": "--",
			"level": 10,
			"hiddenpower": "Fighting",
			"move1": {
				"name": "Ice Punch",
				"pp": 15
			},
			"pokerus": 0,
			"evs": {
				"atk": 3,
				"def": 2,
				"spatk": 0,
				"spd": 4,
				"spdef": 1,
				"hp": 0
			},
			"isFemale": false,
			"heldItem": 0,
			"pid": 3985898503,
			"ivs": {
				"atk": 3,
				"def": 14,
				"spatk": 26,
				"spd": 20,
				"spdef": 2,
				"hp": 9
			},
			"locationMet": 146,
			"move3": {
				"pp": 0
			}
		},
		"slotId": 6,
		"changeId": 0
	}],
	"boxes": [],
	"pokedex": {
		"stats": {
			"seen": 0,
			"caught": 0,
			"dead": 0
		},
		"seen": [],
		"caught": [],
		"dead": []
	}
}]
```