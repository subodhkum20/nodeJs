const mongoose = require('mongoose');
const dishes = require('./models/schemas')

const url = 'mongodb://localhost:27017/'
const connect = mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
connect.then((db) => {
    console.log("successfully connected to database");
    return dishes.create({
        name: "subodh",
        description: "javascript",
    }
    )
}).then((dish) => {
    console.log(dish);
    return dishes.findByIdAndUpdate(dish._id, {
        $set: { description: 'updated test' },
        new: true
    }, { useFindAndModify: false }).exec()
}).then((dish) => {
    console.log(dish);
    dish.comments.push({
        rating: 5,
        comments: 'i am subodh',
        author: 'subodh'
    })
    return dish.save();
})
.then((dish) => {
    console.log(dish)

    return dishes.deleteMany({});
}).then((result) => {
    return console.log(result)
})
.then(() => {
    return mongoose.connection.close();
})
    .catch(err => {
        console.log(err);
    })