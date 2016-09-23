# Pogo-populate <a href="https://www.npmjs.com/package/pogo-populate"><img src="https://img.shields.io/npm/v/pogo-populate.svg?style=flat-square" alt="NPM Version" /></a> [![npm](https://img.shields.io/npm/dm/pogo-populate.svg)](https://www.npmjs.com/package/pogo-populate)

Populate POGOserver with random Pokémon spawns, pokéstops and gyms. 
**(Pokéstops and gyms need to be implemented)**


## Install

```
$ npm install --save pogo-populate
```

##Description

Pogo-populate let you automatically insert random Pokémon spawns, pokéstops and gyms within a range of a specified locations, such as players. It can be adjusted how many Pokémon need to be present at the specified location and how rare the Pokémon are that are spawned.

##Config file
Pogo-populate uses the same config file as POGOserver. These lines need to be added in order to let pogo-populate work with your preferences
``` js
    RANDOM_SPAWNS_AT_PLAYERS: true, //enable or disable pogo-populate
    RADIUS: 2, //In kilometers. The radius of the maximum distance Pokémon need to be spawned.
    RARITY_RATE: 1.5, //The higher, the less likely rare Pokemon will appear
    NUMBER_SPAWNS: 500, //Number of spawns within the specified radius
    POKEMON_PER_SPAWN: 1, //How many Pokémon there need to be spawned at the spawn location
```
## Usage
````js
import Populate from "pogo-populate";
//CFG is the config file specified by POGOserver
let populate = new Populate(CFG);

````

## API

### .createRandomPokemon(latitude: number, longitude: number) => Promise

Creates random Pokémon within a specified range of a location
````js
  populate.createRandomPokemon(latitude, longitude).then((res, rej)=>{
          if(rej){print(rej, 31)}
          else {
            print(res, 33)
          }
        })
````


### .createRandomPokestops(latitude: number, longitude: number) => Promise

Creates random Pokéstop within a specified range of a location.

```` js
//Needs to be implemented.
````


### .createRandomGyms(latitude: number, longitude: number) => Promise

Creates random Gyms within a specified range of a location.

```` js
//Will be implemented when gyms are supported by POGOserver.
````
