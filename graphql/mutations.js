'use strict';

const connectDB = require('../lib/db/mongo');
const errorHandler = require('../utils/errorHandler');
const { ObjectID } = require('mongodb');
const image = require('../lib/storage/images');
const imageHandler = require('../utils/imageHandler');

const COLLECTION = 'pokemon';

module.exports = {
  createPokemon: async (root, { input }) => {
    const defaults = {
      icon_url: '',
      image_url: '',
      type: [''],
      abilities: [''],
      experience: 0,
      generation: '',
      attack: 0,
      special_attack: 0,
      defense: 0,
      special_defense: 0,
      speed: 0,
      hp: 0,
      weight_kg: '',
      height_m: '',
      percentage_male: '',
      percentage_female: '',
      group_by_force: 0,
    };

    const newPokemon = Object.assign(defaults, input);
    if (input.icon_url) {
      newPokemon.icon_url = await imageHandler(input.icon_url);
    }
    if (input.image_url) {
      newPokemon.image_url = await imageHandler(input.image_url);
    }

    let db;
    let pokemon;
    let maxPokemons;

    try {
      db = await connectDB();
      maxPokemons = await db.collection(COLLECTION).find().count();
      newPokemon.pokemon_number = maxPokemons + 1;

      pokemon = await db.collection(COLLECTION).insertOne(newPokemon);
      newPokemon._id = pokemon.insertedId;
    } catch (error) {
      errorHandler(error);
    }

    return newPokemon;
  },
  updatePokemon: async (root, { _id, input }) => {
    let db;
    let pokemon;

    try {
      db = await connectDB();
      await db
        .collection(COLLECTION)
        .updateOne({ _id: ObjectID(_id) }, { $set: input });

      pokemon = await db.collection(COLLECTION).findOne({ _id: ObjectID(_id) });
    } catch (error) {
      errorHandler(error);
    }

    return pokemon;
  },
  deletePokemon: async (root, { _id }) => {
    let db;

    try {
      db = await connectDB();
      await db.collection(COLLECTION).deleteOne({ _id: ObjectID(_id) });
    } catch (error) {
      errorHandler(error);
    }

    return `Pokemon with id ${_id} deleted successfully`;
  },
  singleUpload: async (root, { file }) => {
    const { createReadStream, filename, mimetype, encoding } = await file;
    let urlImage;

    try {
      urlImage = await image.sendUploadToGCS(createReadStream, filename);
    } catch (err) {
      console.error(err);
    }

    console.log(urlImage);
    return { filename, mimetype, encoding };
  },
};
