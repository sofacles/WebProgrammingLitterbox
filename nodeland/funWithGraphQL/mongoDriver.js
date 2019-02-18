const MongoClient = require('mongodb').MongoClient;
//http://mongodb.github.io/node-mongodb-native/3.1/reference/ecmascriptnext/crud/

class MongoDriver {
    async getAll() {
        this.url = "mongodb://torrential:Baywatch8@ds119930.mlab.com:19930/";

        this.dbName = 'myspaceships';

        MongoClient.connect(`${this.url}${this.dbName}`, async (err, client) => {
            if (err) {
                return console.log(err)
            } else {
                //await this.createNavy();
                //await this.delete('dreadnought');
                await this.getAllShips();
                //await this.deleteAll();
            }
        });
    }

    async createNavy() {
        MongoClient.connect(`${this.url}${this.dbName}`, async (err, client) => {
            if (err) {
                return console.log(err)
            } else {
                const db = client.db('myspaceships');
                var collection = db.collection('myspaceships');
                await collection.insertMany([
                    { name: 'Colossus', crew: 690 }, 
                    { name: 'Benbow', crew: 470 },
                    { name: 'Audacious', crew: 420 },
                    { name: 'Hercules', crew: 447 },
                    { name: 'Centurion', crew: 100 },
                    { name: 'Ajax', crew: 397 },
                    { name: 'Dreadnought', crew: 1099}
                ]);
            }
        });
    }
    

    async getAllShips() {
        MongoClient.connect(`${this.url}${this.dbName}`, async (err, client) => {
            if (err) {
                return console.log(err)
            } else {
                const db = client.db('myspaceships');
                var cursor = db.collection('myspaceships').find();
                while(await cursor.hasNext()) {
                    const doc = await cursor.next();
                    console.log(doc);
                }
            }
        });
    }

    async updateName(old, newName) {
        MongoClient.connect(`${this.url}${this.dbName}`, async (err, client) => {
            if (err) {
                return console.log(err)
            } else {
                const db = client.db('myspaceships');
                let col = db.collection('myspaceships');
                // Update a single document
                let r = await col.updateOne({name:old}, {$set: {name: newName}});
            }
        });
    }

    async delete(shipName) {
        MongoClient.connect(`${this.url}${this.dbName}`, async (err, client) => {
            if (err) {
                return console.log(err)
            } else {
                const db = client.db('myspaceships');
                let col = db.collection('myspaceships');
                let r = await col.findOneAndDelete({name:shipName});
            }
        });
    }

    async deleteAll() {
        MongoClient.connect(`${this.url}${this.dbName}`, async (err, client) => {
            if (err) {
                return console.log(err)
            } else {
                const db = client.db('myspaceships');
                let col = db.collection('myspaceships');
                let r = await col.deleteMany();
            }
        });
    }

    async addCrew(shipName, crewComplement) {
        MongoClient.connect(`${this.url}${this.dbName}`, async (err, client) => {
            if (err) {
                return console.log(err)
            } else {
                const db = client.db('myspaceships');
                let col = db.collection('myspaceships');
                let r = await col.updateOne({name:shipName}, {$set: {crew: crewComplement}});
            }
        });
    }
}

module.exports = MongoDriver;


