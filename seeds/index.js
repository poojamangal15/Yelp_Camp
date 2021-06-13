const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error',console.error.bind(console,"connection error: "));
db.once("open",() => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0;i < 200;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60c0fd73c025c92f501457ef',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ipsum voluptate nemo eveniet consequatur quae ex? Odit quaerat ullam error sit a tempora mollitia perspiciatis, ab earum. Asperiores, aperiam aspernatur?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
            {
                url: 'https://res.cloudinary.com/dsgy6f4xp/image/upload/v1623356584/YelpCamp/pkralztp1c0uf1mp8lxi.jpg',
                filename: 'YelpCamp/so9xhtasoh6hhrbj6gpe'
              },
              {
                url: 'https://res.cloudinary.com/dsgy6f4xp/image/upload/v1623356586/YelpCamp/jw7lbzxsfstkcbbutq4j.jpg',
                filename: 'YelpCamp/ro5hnzja4khhwwrd7r7g'
              }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})