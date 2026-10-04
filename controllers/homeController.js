import mongoose from "mongoose";
import Home from "../models/homeModal.js";
import asyncHandler from "express-async-handler";
import fs from 'fs';
import { homes as defaultHomes } from "../data/homesData.js";

//@desc   get all homes list
//@route  GET /api/homes
//@access Public
const getAllHomes = asyncHandler(async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const homes = await Home.find({});
      if (homes && homes.length > 0) {
        return res.json(homes);
      }
    }
    return res.json(defaultHomes);
  } catch (error) {
    return res.json(defaultHomes);
  }
});

//@desc   get all homes list by user
//@route  GET /api/homes
//@access Private
const getUserHomes = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const query = req.user.isAdmin ? {} : { posted_by: req.user._id };
    const homes = await Home.find(query);
    return res.json(homes);
  }
  return res.json(defaultHomes);
});

//@desc   Create new home
//@route  POST /api/homes
//@access Private
const addNewHome = asyncHandler(async (req, res) => {
  let {
    address,
    city,
    state,
    postalCode,
    country,
    images,
    price,
    type,
    rooms,
    washrooms,
    size,
    position,
    details,
    title,
    purpose,
    category,
    priceFormatted,
    sizeFormatted,
  } = req.body;

  const home = new Home({
    title: title || `${size || 5} Marla ${type || "House"}`,
    address: address || "DHA Phase 5",
    city: city || "Lahore",
    state: state || "Punjab",
    postalCode: postalCode || "54000",
    country: country || "Pakistan",
    purpose: purpose || "Sale",
    category: category || "Houses",
    position: position || { lat: 31.4697, lng: 74.4079 },
    images: images && images.length > 0 ? images : ["/uploads/pak_house_1.jpg"],
    price: price || 20000000,
    priceFormatted: priceFormatted || `PKR ${price || "20,000,000"}`,
    type: type || "House",
    date: new Date(),
    rooms: rooms || 3,
    washrooms: washrooms || 3,
    size: size || 1125,
    sizeFormatted: sizeFormatted || `${size || 5} Marla`,
    details: details || "Luxurious property with modern amenities and scenic views.",
    posted_by: req.user._id,
  });

  const createdHome = await home.save();
  res.status(201).json(createdHome);
});

// @desc    Update a home
// @route   PUT /api/homes/:id
// @access  Private/Admin
const updateHome = asyncHandler(async (req, res) => {
  const {
    address,
    city,
    state,
    postalCode,
    country,
    images,
    price,
    type,
    rooms,
    washrooms,
    size,
    position,
    details,
    title,
    purpose,
    category,
  } = req.body;
  const home = await Home.findById(req.params.id);

  if (home) {
    if (req.user.isAdmin || (home.posted_by && home.posted_by.equals(req.user._id))) {
      if (title !== undefined) home.title = title;
      if (address !== undefined) home.address = address;
      if (city !== undefined) home.city = city;
      if (state !== undefined) home.state = state;
      if (postalCode !== undefined) home.postalCode = postalCode;
      if (country !== undefined) home.country = country;
      if (position !== undefined) home.position = position;
      if (images !== undefined) home.images = images;
      if (price !== undefined) home.price = price;
      if (type !== undefined) home.type = type;
      if (purpose !== undefined) home.purpose = purpose;
      if (category !== undefined) home.category = category;
      if (rooms !== undefined) home.rooms = rooms;
      if (washrooms !== undefined) home.washrooms = washrooms;
      if (size !== undefined) home.size = size;
      if (details !== undefined) home.details = details;

      const updatedHome = await home.save();
      res.status(200).json(updatedHome);
    } else {
      res.status(403);
      throw new Error("User Verification Failed");
    }
  } else {
    res.status(404);
    throw new Error("Home Not Found");
  }
});

// @desc    DELETE a home and images linked to home
// @route   DELETE /api/homes/:id
// @access  Private/Admin
const deleteHome = asyncHandler(async (req, res) => {
  const home = await Home.findById(req.params.id);
  if (home) {
    if (req.user.isAdmin || (home.posted_by && home.posted_by.equals(req.user._id))) {
      if (home.images && Array.isArray(home.images)) {
        home.images.forEach((image) => {
          if (image && !image.startsWith("http") && fs.existsSync(image)) {
            try {
              fs.unlinkSync(image);
            } catch (err) {}
          }
        });
      }
      await home.remove();
      res.json({ message: "Home removed" });
    } else {
      res.status(403);
      throw new Error("User Verification Failed");
    }
  } else {
    res.status(404);
    throw new Error("Home not found");
  }
});

export { getAllHomes, getUserHomes, addNewHome, updateHome, deleteHome };

