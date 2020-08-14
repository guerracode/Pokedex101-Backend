'use strict';

const connectDB = require('../lib/db/mongo');
const errorHandler = require('../utils/errorHandler');
const { ObjectID } = require('mongodb');
const imageHandler = require('../utils/imageHandler');

// MongoDB collection.
const COLLECTION = 'pokemon';

// Return a random number getting min, max and multiple values.
function rand(min, max, multiple) {
  return Math.round((Math.random() * (max - min) + min) / multiple) * multiple;
}
// Calculate pokemon force with some of the pokemon values.
function force(base_egg_steps, base_total) {
  // Centroids exact values
  const c1_base_eggs_steps = 4806.05491329;
  const c1_base_total = 401.38583815;
  const c2_base_eggs_steps = 9361.10294118;
  const c2_base_total = 479.74264706;
  const c3_base_eggs_steps = 28199.3846153;
  const c3_base_total = 615.26153846;

  // Calculate distance
  const centroid = (c_base_eggs_steps, c_base_total) => {
    const one = Math.pow(base_egg_steps - c_base_eggs_steps, 2);
    const two = Math.pow(base_total - c_base_total, 2);
    const three = one + two;
    const res = Math.sqrt(three);

    return res;
  };
  // Calculate each centroid
  const c1 = centroid(c1_base_eggs_steps, c1_base_total);
  const c2 = centroid(c2_base_eggs_steps, c2_base_total);
  const c3 = centroid(c3_base_eggs_steps, c3_base_total);

  // Classify force: 0 (Weakest) / 1 (standard) / 2 (Strongest)
  let final = Math.min(c1, c2, c3);
  if (final === c1) final = 0;
  if (final === c2) final = 1;
  if (final === c3) final = 2;

  return final;
}

module.exports = {
  createPokemon: async (root, { input }) => {
    // Default pokeon values and some values randomized every time a pokemon is created.
    const defaults = {
      icon_url: '',
      image_url: '',
      type: [''],
      abilities: [''],
      experience: rand(600000, 1640000, 1000),
      generation: '',
      attack: rand(5, 185, 1),
      special_attack: rand(10, 194, 1),
      defense: rand(5, 230, 1),
      special_defense: rand(20, 230, 1),
      speed: rand(5, 180, 1),
      hp: rand(1, 255, 1),
      weight_kg: '',
      height_m: '',
      percentage_male: '',
      percentage_female: '',
      group_by_force: 0,
    };
    // Copy default values to another variable.
    const newPokemon = Object.assign(defaults, input);

    let db;
    let pokemon;
    let maxPokemons;
    // Random value for base_egg_steps.
    const base_egg_steps = rand(280, 30720, 10);
    // Add attack, special_attack and defense to calculate the pokemon base_total value.
    const base_total =
      newPokemon.attack + newPokemon.special_attack + newPokemon.defense;
    // Store the calculated force.
    newPokemon.group_by_force = force(base_egg_steps, base_total);

    try {
      //  If an image is sended, store it into Google Cloud storage and return the image url:
      if (input.icon_url) {
        newPokemon.icon_url = await imageHandler(input.icon_url);
      }
      if (input.image_url) {
        newPokemon.image_url = await imageHandler(input.image_url);
      }

      db = await connectDB();
      // Get pokemons total count, to set pokemon_number value:
      maxPokemons = await db.collection(COLLECTION).find().count();
      newPokemon.pokemon_number = maxPokemons + 1;

      // Calculate if the pokemon is strongest or weakest:
      if (base_egg_steps >= newPokemon.experience) {
        newPokemon.group_by_force = 2;
      }
      // Save created pokemon data into te DB:
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
    // copy the pokemon values to another variable to manage the values.
    const updatePokemon = Object.assign({}, input);

    try {
      // If an image is sended, store it into Google Cloud storage and return the image url.
      if (input.icon_url) {
        updatePokemon.icon_url = await imageHandler(input.icon_url);
      }
      if (input.image_url) {
        updatePokemon.image_url = await imageHandler(input.image_url);
      }

      db = await connectDB();
      // Update pokemon on the DataBase.
      await db
        .collection(COLLECTION)
        .updateOne({ _id: ObjectID(_id) }, { $set: updatePokemon });
      // Get the Id of the pokemon that is being updated.
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
      // Delete Pokemon on the DataBase.
      await db.collection(COLLECTION).deleteOne({ _id: ObjectID(_id) });
    } catch (error) {
      errorHandler(error);
    }

    return `Pokemon with id ${_id} deleted successfully`;
  },
};
