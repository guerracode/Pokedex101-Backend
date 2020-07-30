'use strict';

const errorHandler = require('../utils/errorHandler');
const connectDB = require('../lib/db/mongo');

const COLLECTION = 'pokemon';
const PAGE = 1;
const NUMBER_OF_PAGES = 20;
const LEGENDARY = 'psychic';

// To control the page and number of pages that the API is going to return.
function pageController(page, numberOfPages) {
  let pageStart, pageFinish;
  // set page start and finish
  pageStart = (page - 1) * numberOfPages;
  pageFinish = numberOfPages;
  return [pageStart, pageFinish];
}
// To check param values that are in correct format.
function checkVal(val, min, max, message) {
  if (val[0] < min || val[1] > max) {
    errorHandler(message, true);
  }
}

module.exports = {
  // Get cards sorted by page number and number of pages.
  getCards: async (root, { page = PAGE, numberOfPages = NUMBER_OF_PAGES }) => {
    let db;
    let cards;
    let pages = pageController(page, numberOfPages);

    try {
      db = await connectDB();
      // MongoDb query to skip to a certain page and limited to a number of documents.
      cards = await db
        .collection(COLLECTION)
        .find()
        .skip(pages[0])
        .limit(pages[1])
        .toArray();
    } catch (error) {
      errorHandler(error);
    }

    return cards;
  },
  searchCards: async (
    root,
    {
      type,
      experience,
      attack,
      name,
      page = PAGE,
      numberOfPages = NUMBER_OF_PAGES,
    }
  ) => {
    let db;
    let cards;
    let query = {
      $and: [],
    };
    let pages = pageController(page, numberOfPages);

    // Check if one of the different parameters are sended.
    // If so, create the query to get that data.
    if (type) query.$and.push({ type: type });
    if (experience) {
      checkVal(experience, 600000, 1640000, 'experience values are incorrect');
      // Query to get an interval of numbers between the min and max numbers received.
      query.$and.push(
        { experience: { $gte: experience[0] } },
        { experience: { $lte: experience[1] } }
      );
    }
    if (attack) {
      checkVal(attack, 5, 185, 'attack values are incorrect');
      // Query to get an interval of numbers between the min and max numbers received.
      query.$and.push(
        { attack: { $gte: attack[0] } },
        { attack: { $lte: attack[1] } }
      );
    }
    if (name) query.$and.push({ english_name: name });

    try {
      db = await connectDB();
      // MongoDB query to get only the numbers that are into min and max numbers.
      // The documents are sorted by attack, experience or both.
      if (attack || experience) {
        cards = await db
          .collection(COLLECTION)
          .find(query)
          .sort({ attack: -1, experience: -1 })
          .skip(pages[0])
          .limit(pages[1])
          .toArray();
      } else {
        cards = await db.collection(COLLECTION).find(query).toArray();
      }
    } catch (error) {
      errorHandler(error);
    }

    return cards;
  },
  getByForce: async (
    root,
    { force, page = PAGE, numberOfPages = NUMBER_OF_PAGES }
  ) => {
    let db;
    let cards, sort;
    let pages = pageController(page, numberOfPages);

    if (force < 0 || force > 2) {
      console.log('Force: ' + force);
      errorHandler('Only force (0, 1, 2) numbers are allowed', true);
    }

    if (force === 0) sort = { defense: 1 };
    if (force === 2) sort = { attack: -1 };

    try {
      db = await connectDB();
      // MongoDb query to skip to a certain page and limited to a number of documents.
      cards = await db
        .collection(COLLECTION)
        .find({ group_by_force: force })
        .sort(sort)
        .skip(pages[0])
        .limit(pages[1])
        .toArray();
    } catch (error) {
      errorHandler(error);
    }

    return cards;
  },
  getLegendary: async (
    root,
    { type = 'psychic', page = PAGE, numberOfPages = NUMBER_OF_PAGES }
  ) => {
    let db;
    let cards, sort;
    let pages = pageController(page, numberOfPages);

    sort = { attack: -1 };

    try {
      db = await connectDB();
      // MongoDb query to skip to a certain page and limited to a number of documents.
      cards = await db
        .collection(COLLECTION)
        .find({ type: type })
        .sort(sort)
        .skip(pages[0])
        .limit(pages[1])
        .toArray();
    } catch (error) {
      errorHandler(error);
    }

    return cards;
  },
  getLegendPercentage: async (root, { type }) => {
    let db;
    let cards;
    let query;

    if (type) query = { type_pokemon: type };

    try {
      db = await connectDB();
      // MongoDb query to skip to a certain page and limited to a number of documents.
      cards = await db.collection('legend').find(query).toArray();
    } catch (error) {
      errorHandler(error);
    }

    return cards;
  },
  uploads: (parent, args) => {},
};
