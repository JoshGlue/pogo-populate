/**
 * Created by JoshGlue on 19-9-16.
 */
import print from "./print";
import mysql from "mysql";
import * as cfg from "./cfg";

export default class db {

    constructor() {
        this.CFG = cfg.getCfg();
        this.setupDatabaseConnection(true);
    }


    setupDatabaseConnection(connectAutomatically = false) {
        this.connection = mysql.createConnection({
            host: this.CFG.MYSQL_HOST_IP,
            port: this.CFG.MYSQL_PORT,
            database: this.CFG.MYSQL_DB_NAME,
            user: this.CFG.MYSQL_USERNAME,
            password: this.CFG.MYSQL_PASSWORD
        });
        if (connectAutomatically) {
            this.connect()
        }
    }

    connect() {
        return new Promise((resolve) => {
            connection.connect((error) => {
                if (error) {
                    print("MySQL " + error, 31);
                    return void 0;
                }
            });
        })
    }


    closeConnection() {
        return new Promise((resolve)=> {
            this.db.end(() => {
                resolve("closed properly");
            });
        })
    }

    query(q, v) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.connection.query(q, v, (e, rows)=> {
                if (e != null) {
                    reject(e)
                }
                else {
                    resolve(rows)
                }
            })
        });


    }
}