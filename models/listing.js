// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // design the schema mean how many column in my listing Schema
// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     filename: { type: String, default: "listingimage" }, // this will take from local Default filename
//     url: {
//       // this is for cloud will take url from internet
//       type: String,
//       default:
//         "https://unsplash.com/photos/trees-beside-white-house-IYfp2Ixe9nM",
//       set: (v) =>
//         v === ""
//           ? "https://unsplash.com/photos/trees-beside-white-house-IYfp2Ixe9nM"
//           : v,
//     },
//   },
//   price: Number,
//   country: String,
//   location: String,
// });

// //create  Listings model
// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     type: String,
//     default:
//       "https://unsplash.com/photos/a-bicycle-is-parked-in-front-of-a-row-of-buildings-eqhhz4EbkTo",
//     set: (v) =>
//       v === " "
//         ? "https://unsplash.com/photos/a-bicycle-is-parked-in-front-of-a-row-of-buildings-eqhhz4EbkTo"
//         : v,
//   },
//   price: Number,
//   location: String,
//   country: String,
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  // image: {
  //   type: String,
  //   default:
  //     "https://media.istockphoto.com/id/1403500817/photo/the-craggies-in-the-blue-ridge-mountains.jpg?s=612x612&w=0&k=20&c=N-pGA8OClRVDzRfj_9AqANnOaDS3devZWwrQNwZuDSk=",
  //   set: (v) =>
  //     v === ""
  //       ? "https://media.istockphoto.com/id/1403500817/photo/the-craggies-in-the-blue-ridge-mountains.jpg?s=612x612&w=0&k=20&c=N-pGA8OClRVDzRfj_9AqANnOaDS3devZWwrQNwZuDSk="
  //       : v,
  // },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
