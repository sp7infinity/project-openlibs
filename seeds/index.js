const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/yelp-camp");
    console.log("Database Connected");
  } catch {
    console.error.bind(console, "Connection error");
  }
};
connectToDb();

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "62a0e031cf2a55b262e7e01a",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/sp7infinity/image/upload/v1654945587/YelpCamp/mountain-night-scenery-stars-landscape-anime-4K-84_uo7ppp.jpg",
          filename:
            "YelpCamp/mountain-night-scenery-stars-landscape-anime-4K-84_uo7ppp",
        },
        {
          url: "https://res.cloudinary.com/sp7infinity/image/upload/v1654945590/YelpCamp/wp5475487-anime-scenery-4k-wallpapers_kvdrbx.jpg",
          filename: "YelpCamp/wp5475487-anime-scenery-4k-wallpapers_kvdrbx",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
