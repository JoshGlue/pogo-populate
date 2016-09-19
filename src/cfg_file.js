import fs from "fs";

export default {

    VERSION: JSON.parse(fs.readFileSync("./package.json")).version,

    // show greeting
    GREET: true,

    // Api things
    API_ENABLE: true,
    API_USERNAME: "root",
    API_PASSWORD: "",
    API_ALLOWED_HOSTS: ["localhost", "127.0.0.1"],

    //Populate map with Pokemons
    RANDOM_SPAWNS_AT_PLAYERS: true,
    DISTANCE: 2, //In kilometers
    RARITY_RATE: 1.5, //The higher, the less likely rare Pokemon will appear
    NUMBER_SPAWN: 100,
    POKEMON_PER_SPAWN: 5,

    // Server settings
    MAX_CONNECTIONS: 64,
    PORT: 3000,
    // If using vmware, vps or multiple network adapters, set the related ip here
    // otherwise leave it blank
    LOCAL_IP: "",
    GAME_MODE: 0,
    SAVE_INTERVAL: 1e4,
    // Better dont touch these
    TICK_INTERVAL: 1,
    // Timeouts
    BOOT_TIMEOUT: 1e4,
    PLAYER_CONNECTION_TIMEOUT: 1e3 * 60 * 30,
    CELL_TIMEOUT: 1e3 * 60,
    MINIMUM_CLIENT_VERSION: "0.35.0",
    DEFAULT_CONSOLE_COLOR: 32,
    TRANSFER_ACCOUNTS: false,

    // Server debug options
    DEBUG_DUMP_PATH: "logs/",
    DEBUG_DUMP_TRAFFIC: true,
    DEBUG_LOG_REQUESTS: true,

    // Choose a database type
    DATABASE_TYPE: "MYSQL",

    // MySQL credentials
    MYSQL_PORT: 3306,
    MYSQL_HOST_IP: "127.0.0.1",
    MYSQL_DB_NAME: "pogosql",
    MYSQL_USERNAME: "root",
    MYSQL_PASSWORD: "t6950891DK",
    MYSQL_GYM_TABLE: "gym",
    MYSQL_USERS_TABLE: "users",
    MYSQL_SPAWN_TABLE: "spawn_points",
    MYSQL_POKESTOP_TABLE: "pokestop",
    MYSQL_OWNED_PKMN_TABLE: "owned_pkmn",

    // Used for asset download session
    DOWNLOAD_PROVIDER: "GOOGLE",
    DOWNLOAD_USERNAME: "joshua.van.kleef@gmail.com",
    DOWNLOAD_PASSWORD: "yuoszzkpungncvlx",

    // Google maps api key
    GMAPS_KEY: "AIzaSyDF9rkP8lhcddBtvH9gVFzjnNo13WtmJIM",

    // Currently supported pokemon
    MAX_POKEMON_NATIONAL_ID: 151,
    DUMP_ASSET_PATH: "data/"

}