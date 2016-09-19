/**
 * Created by JoshGlue on 17-9-16.
 */
import index from "./index";
import config from "./cfg_file";

var FillMap = new index(config);


FillMap.createRandomPokemon(51.87114876796128, 5.398217886686325).then((pokemon) => {


    console.log(pokemon[0].distance);
}, (error) => {
    console.log(error)
})