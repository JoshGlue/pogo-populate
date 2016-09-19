import s2 from "s2-geometry";


const S2Geo = s2.S2;


/**
 * @class Cell
 */
export default class Cell {

    /**
     * @param  {Number} lat
     * @param  {Number} lng
     * @return {String}
     */
    static getIdByPosition(lat, lng, zoom) {
        return (
            S2Geo.keyToId(S2Geo.latLngToKey(lat, lng, zoom || 15))
        );
    }

}