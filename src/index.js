const rare = require("pokerare");
import * as cfg from "./cfg";
import db from "./db";
import pokemon from "./pokemon";

export default class FillMap {

    constructor(config) {
        cfg.setCfg(config);
        this.CFG = config;
        this.db = new db()
        this.pokemoninstance = new pokemon(this.db);


    }

    createRandomPokemon(lat, lon) {
        return this.pokemoninstance.createRandomPokemon(lat, lon)
    }
}

