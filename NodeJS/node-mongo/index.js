// enable us to connect mongodb server
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

// mongodb default port
const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion';

 MongoClient.connect(url).then( (client ) => { 

    console.log('Connected correctly to server');

    // connect to database
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: 'Vadonut', description: 'Test' }, 'dishes')
    .then((result) => {
        console.log('Insert Document:\n');
        console.log(result.ops);
        return dboper.findtDocuments(db, 'dishes')
    })
    .then( (docs) => {
        console.log('Found Documents:\n', docs);
        return dboper.updateDocument(db, { name: 'Vadonut' }, { description: 'Updated Test' }, 'dishes')
    })
    .then((result) => {
        console.log('Updated Document:\n', result.result)
        return dboper.findtDocuments(db, 'dishes')
    })
    .then((docs) => {
        console.log('Found Documents:\n', docs);
        return db.dropCollection('dishes')
    })
    .then((result) => {
            console.log('Dropped Collection', result);
            client.close();
    });
})
.catch( (err) => console.log(err));


 // MONGO DB OPERATIONS EXPLANATION

// connect to collection
// const collection = db.collection('dishes');

// insert 1 document in this collection
// retrieve one callback function
// collection.insertOne({ "name": "Uthapizza", "description": "test" }, (err, result) => {
//     assert.equal(err, null);

//     console.log('After Insert:\n');
//     result.ops returns how many operations returns success
//     console.log(result.ops);

//     get all data in collection
//     collection.find({}).toArray( (err, docs) => {
//         assert.equal(err, null);

//         console.log("Found:\n");
//         console.log(docs);

//         drop collection just remove all 'dishes' on the database returning an empty database
//         db.dropCollection('dishes', (err, result) => {
//             assert.equal(err, null);

//             close connection to database
//             client.close();
//         });
//     });
// });
