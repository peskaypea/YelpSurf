const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const SurfSpot = require('../models/surfspot');

mongoose.connect('mongodb://localhost:27017/surf-spot', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];
const tide = () => sample(["Low", "Mid", "High"]);


const seedDB = async () => {
    await SurfSpot.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const surfSize = Math.floor(Math.random() * 20);

        const spot = new SurfSpot({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            size: `${surfSize}ft`,
            tide: tide(),
            description: `The ${sample(descriptors)} ${sample(places)} is ${surfSize}ft and ${sample(descriptors)}`
        })
    await spot.save();
}
}

seedDB().then(() => {
    mongoose.connection.close();
});