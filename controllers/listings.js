const Listing = require("../models/listing");
const axios = require("axios");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  // console.log(req.user);

  res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listings = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listings) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }
  console.log(listings);
  res.render("./listings/show.ejs", { listings });
};

module.exports.createListing = async (req, res, next) => {
  // const { title, description, image, price, location, country } = req.body;
  // const listing = req.body.listing;
  // if (!req.body.listing) {
  //   throw new ExpressError(400, "Send valid data for listing");
  // }

  const { listing } = req.body;
  const location = listing.location;
  // try {
  // 🔍 Geocode using OpenStreetMap Nominatim
  const geoRes = await axios.get("https://nominatim.openstreetmap.org/search", {
    params: {
      q: location,
      format: "json",
      limit: 1,
    },
    headers: {
      "User-Agent": "WanderLust-App", // required by Nominatim
    },
  });
  const geoData = geoRes.data[0];
  const lat = geoData.lat;
  const lon = geoData.lon;

  // ✅ You can store these coordinates with the listing
  const response = new Listing({
    ...listing,
    geometry: {
      type: "Point",
      coordinates: [lon, lat], // [lng, lat] as per GeoJSON format
    },
  });
  console.log(response.geometry.coordinates);
  // YEH NICHE wala code comment rahkan hai
  // await newListing.save();
  // res.redirect("/listings");
  // }
  // catch (err) {
  //   console.log(err);
  //   res.send("Geocoding failed");
  // }

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry.coordinates = response.geometry.coordinates;
  let savedListings = await newListing.save();
  console.log(savedListings);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listings = await Listing.findById(id);
  if (!listings) {
    // express session
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }
  let originalImageURL = listings.image.url;
  originalImageURL = originalImageURL.replace("/upload", "/upload/w_250");
  res.render("./listings/edit.ejs", { listings, originalImageURL });
};

module.exports.updateListing = async (req, res) => {
  // if (!req.body.listing) {
  //   throw new ExpressError(400, "Send valid data for listing");
  // }
  let { id } = req.params;
  let updatedData = { ...req.body.listing };

  // If image field is empty, remove it to avoid setting it to default
  if (!updatedData.image) {
    delete updatedData.image;
  }

  let listing = await Listing.findByIdAndUpdate(id, updatedData);

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  const deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
