/**
 * Created by JoshGlue on 19-9-16.
 */
import print from "./print";
import Cell from "./Cell";
import * as cfg from "./cfg";
import rare from "pokerare";

export default class pokemon {


    constructor(db) {
        this.db = db;
        this.CFG = cfg.getCfg()
        this.distance = this.CFG.DISTANCE || 2;
        this.number_spawn = this.CFG.NUMBER_SPAWN || 100;
        this.pokemon_per_spawn = this.CFG.POKEMON_PER_SPAWN || 5;
        this.rarity_rate = this.CFG.RARITY_RATE || 1.5
    }


    createRandomPokemon(lat, lon) {


        let searchquery =
            `SELECT count(*) as total FROM pogosql.spawn_points WHERE 
longitude between ${lon} - 0.009009009 * ${ this.distance  } AND ${lon} + 0.009009009 * ${ this.distance } AND 
latitude between ${lat} - 0.009009009 * ${ this.distance  } AND ${lat} +  0.009009009 * ${ this.distance }`;

        let insertquery = 'INSERT INTO spawn_points (cell_id,latitude,longitude,encounters,update_interval)VALUES ?'
        let self = this;

        return new Promise((resolve, reject) => {
            self.db.query(searchquery, [lat]).then((rows, e) => {
                if (e) print(e, 31);
                if (rows && rows.length) {

                    let numberofspawns = this.number_spawn - rows[0].total;
                    if (numberofspawns > 0) {
                        this.createRandomSpawns(numberofspawns, lat, lon).then((res)=> {

                            self.db.query(insertquery, [res]).then((res, rej)=> {
                                if (rej != null) {
                                    reject(rej);
                                }
                                else {
                                    resolve(res.message);
                                }
                            });
                        });
                    } else {
                        resolve("0 spawns created, maximum already reached")
                    }
                }
                else resolve(void 0);
            })

        });


    }

    createRandomSpawns(creatingnumberofspawns, lat, lon) {
        return new Promise((resolve)=> {

            var result = [];
            for (let x = 0; x < creatingnumberofspawns; x++) {
                var location = this._createRandomLocations(lat, lon);
                var pokemon = this._createRandomPokemon()
                var pokemonArray = []
                for (let y = 0; y < pokemon.length; y++) {
                    pokemonArray.push(pokemon[y].id);
                }
                let cell_id = Cell.getIdByPosition(lat, lon, 15);

                result.push([cell_id, location[0], location[1], JSON.stringify(pokemonArray), Math.floor(Math.random() * 29) + 2]);

            }
            resolve(result);

        })

    }

    _createRandomLocations(lat, lon) {
        let y0 = lat
            , x0 = lon
            , latmultiplier = Math.random() < 0.5 ? -1 : 1
            , lonmultiplier = Math.random() < 0.5 ? -1 : 1
            , u = Math.random() * this.distance * 0.009009009
            , v = Math.random() * this.distance * 0.009009009
            , y1 = latmultiplier * u
            , x1 = lonmultiplier * v
            , newY = y0 + y1,
            newX = x0 + x1
        return [newY, newX];
    }

    _createRandomPokemon() {
        let begin = Math.pow(Math.random() * Math.pow(255, this.rarity_rate), 1 / this.rarity_rate);
        let pokemonArray = rare.getPkmnByRarity(begin, 255);
        let pkmSpawn = this._getRandomSubarray(pokemonArray, this.pokemon_per_spawn);
        return pkmSpawn;
    }

    _getRandomSubarray(arr, size) {
        var shuffled = arr.slice(0), i = arr.length, temp, index;
        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(0, size);
    }
}