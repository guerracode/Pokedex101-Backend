'use strict';

const connectDB = require('../db/mongo');
const errorHandler = require('../../utils/errorHandler');
const { ObjectID } = require('mongodb');
// const { GraphQLUpload } = require('graphql-upload');

const COLLECTION = 'pokemon';

module.exports = {
  createPokemon: async (root, { input}) => {
    const defaults = {
      icon_url: '',
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
      image_url: '',
      weight_kg: '',
      height_m: '',
      percentage_male: '',
      percentage_female: '',
      group_by_force: 0,
    };

    const newPokemon = Object.assign(defaults, input);
    let db;
    let pokemon;
    let maxPokemons;

    try {
      db = await connectDB();
      maxPokemons = await db.collection(COLLECTION).find().count();
      newPokemon.pokemon_number = maxPokemons + 1;
      // newPokemon.pokemon_number++;
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
};
