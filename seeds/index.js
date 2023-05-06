const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("Connection Open");
  })
  .catch((err) => {
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6443f9bfd7181fef638de02e",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000.longitude],
          cities[random1000.latitude],
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/ddzejm3r0/image/upload/v1683126647/YelpCamp/xgm0kqkti2mgbapk6b0w.jpg",
          filename: "YelpCamp/xgm0kqkti2mgbapk6b0w",
        },
        {
          url: "https://res.cloudinary.com/ddzejm3r0/image/upload/v1683126646/YelpCamp/sff0duwln3q8qvdcydoj.jpg",
          filename: "YelpCamp/sff0duwln3q8qvdcydoj",
        },
        {
          url: "https://res.cloudinary.com/ddzejm3r0/image/upload/v1683126645/YelpCamp/kp02w9jx8rcntqqkctfw.jpg",
          filename: "YelpCamp/kp02w9jx8rcntqqkctfw",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
