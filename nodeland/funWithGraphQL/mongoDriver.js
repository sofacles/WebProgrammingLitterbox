const MongoClient = require('mongodb').MongoClient;


class MongoDriver {
    getAll() {
        // Connection URL
        //const url = 'mongodb://localhost:27017';

        //jimmySupply
        //int3rleaved
        const url = "mongodb://jimmySupply:Large3Mercury@ds035137.mlab.com:35137/";

        // Database Name
        const dbName = 'namumemug3bu';

        // Create a new MongoClient
        const client = new MongoClient(url);

        let allMyCrap;

        var options = {
            server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
        };

        // Use connect method to connect to the Server
        client.connect(function (err) {
            console.log("Connected successfully to server");

            const db = client.db(dbName);
            var something = db.listCollections().toArray(function(err, collDefs) {
                console.log(err);
                console.log(collDefs);
                return collDefs;
            })
            
            // .then(function(r){
            //     console.log("In the then of listCollections toArray")
            // }).catch((err) => {
            //     console.log("in the error handler of the listCollectionns toArray promise")
            //     console.log(err);
            // }); // db.find();

            client.close();
            return something;
        });
    }
}

module.exports = MongoDriver;


