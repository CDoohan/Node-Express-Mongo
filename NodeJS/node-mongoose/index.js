const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url);

connect.then( (db) => {

    console.log('Connected correctly to server');

    Dishes.create({
        name : 'Uthappizza',
        description : 'Test'
    })
    .then( (dish) => {
        console.log('Dish', dish);
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated Test' },
        },{
            new: true
        }).exec();
    })
    .then( (dish) => {
        console.log('Dish Updated', dish);

        dish.comments.push({
            rating: 5,
            comment: 'Testing my sub-document',
            author: 'Caio Doohan'
        });

        return dish.save()
    })
    .then((dish) => {

        console.log('Dish with comment', dish);

        return Dishes.remove();
    })
    .then( () => {
        console.log('Closing MongoDB connection');
        return mongoose.connection.close();
    })
    .catch( (err) => {
        console.log('Error', err);
    })

}).catch( (err) => console.log('Connection error', err) );