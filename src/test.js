/**
 * Created by JoshGlue on 17-9-16.
 */
import index from "./index";
import config from "./cfg_file";
import print from "./print";
var FillMap = new index(config);


FillMap.createRandomPokemon(51.87114876796128, 5.398217886686325).then((pokemon, error) => {

    if (error != null) {
        console.log(error, 31);
    } else {
        print(pokemon, 33);
    }


}, (error) => {
})