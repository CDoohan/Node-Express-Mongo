// enable us to connect mongodb server
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// mongodb default port
const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion';

 MongoClient.connect(url, ( err, client ) => { 

    // assert will verify if err == null
    // assert allows us to perform various checks on values

    assert.equal(err, null);

    console.log('Connected correctly to server');

    // connect to database
    const db = client.db(dbname);

    // connect to collection
    const collection = db.collection('dishes');

    // insert 1 document in this collection
    // retrieve one callback function
    collection.insertOne({ "name": "Uthapizza", "description": "test" }, (err, result) => {
        assert.equal(err, null);

        console.log('After Insert:\n');
        // result.ops returns how many operations returns success
        console.log(result.ops);

        // get all data in collection
        collection.find({}).toArray( (err, docs) => {
            assert.equal(err, null);

            console.log("Found:\n");
            console.log(docs);

            // drop collection just remove all 'dishes' on the database returning an empty database
            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null);

                // close connection to database
                client.close();
            });
        });
    });

});