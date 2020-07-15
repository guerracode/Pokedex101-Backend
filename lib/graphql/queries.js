const errorHandler = require('../../utils/errorHandler');
const connectDB = require('../db/mongo');

const COLLECTION = 'pokemon';

module.exports = {
  getCards: async (root, { page, numberOfPages = 20 }) => {
    let pageStart, pageFinish;
    let db;
    let cards;

    // set page start and finish
    pageStart = (page - 1) * numberOfPages;
    pageFinish = numberOfPages;

    try {
      db = await connectDB();
      cards = await db
        .collection(COLLECTION)
        .find()
        .skip(pageStart)
        .limit(pageFinish)
        .toArray();
    } catch (error) {
      errorHandler(error);
    }

    return cards;
  },
  searchCards: async (root, { type, experience, attack, name }) => {
    let db;
    let cards;
    let query = {
      $and: [],
    };

    if (type) query.$and.push({ type: type });
    if (experience) query.$and.push({ experience: experience });
    if (attack) query.$and.push({ attack: attack });
    if (name) query.$and.push({ english_name: name });

    try {
      db = await connectDB();
      cards = await db.collection(COLLECTION).find(query).toArray();
    } catch (error) {
      errorHandler(error);
    }

    return cards;
  },
};
