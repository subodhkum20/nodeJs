const mongoose=require('mongoose');
const dishes=require('./models/schemas')

const url='mongodb://localhost:27017/'
const connect=mongoose.connect(url,{ useUnifiedTopology: true,useNewUrlParser: true  })
connect.then((db) =>{
    console.log("successfully connected to database");
    dishes.create({
        name: "subodh",
        description:"javascript"
    }
    ).then((dish) => {
        console.log(dish);

        return dishes.find({});
    }).then((result) =>{
        console.log("found:"+result);
        return dishes.deleteMany({});
    }).then((result) =>{
        return console.log(result)
    }).then(()=>{
        return mongoose.connection.close();
    })
    })
    .catch(err =>{
        console.log(err);
    })
