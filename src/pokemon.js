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
        this.distance = this.CFG.DISTANCE || 5;
        this.number_spawn = this.CFG.NUMBER_SPAWN || 100;
        this.pokemon_per_spawn = this.CFG.POKEMON_PER_SPAWN || 15;
    }

    createRandomPokemon(lat, lon) {

        let searchquery =
            `SELECT count(*) as total FROM pogosql.spawn_points WHERE 
longitude between ${lon} - 0.009009009 * ${ this.distance} AND ${lon} + 0.009009009 * ${ this.distance} AND 
latitude between ${lat} - 0.008983112 * ${ this.distance} AND ${lat} +  0.008983112 * ${ this.distance}`;

        let insertquery = 'INSERT INTO spawn_points (cell_id,latitude,longitude,encounters)VALUES ?'
        let self = this;

        return new Promise((resolve, reject) => {
            self.db.query(searchquery, [lat]).then((rows, e) => {
                if (e) print(e, 31);
                if (rows && rows.length) {
                    print(`found ${rows[0].total} existing spawns`, 33)
                    let numberofspawns = this.number_spawn - rows[0].total;
                    if (numberofspawns > 0) {
                        this.createRandomSpawns(numberofspawns, lat, lon).then((res)=> {

                            self.db.query(insertquery, [res]).then((res, rej)=> {
                                if (rej != null) {
                                    reject(rej);
                                }
                                else {
                                    resolve(res);
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

                result.push([cell_id, location[0], location[1], JSON.stringify(pokemonArray)]);

            }
            resolve(result);

        })

    }


    _createRandomLocations(lat, lon) {
        var r = this.distance / 111300
            , y0 = lat
            , x0 = lon
            , u = Math.random()
            , v = Math.random()
            , w = r * Math.sqrt(u)
            , t = 2 * Math.PI * v
            , x = w * Math.cos(t)
            , y1 = w * Math.sin(t)
            , x1 = x / Math.cos(y0),
            newY = y0 + y1,
            newX = x0 + x1
        return [newY, newX];
    }


    _createRandomPokemon() {
        var begin = Math.random() * 255;
        var pokemonArray = rare.getPkmnByRarity(begin, 255);
        var pkmSpawn = this._getRandomSubarray(pokemonArray, this.pokemon_per_spawn);
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