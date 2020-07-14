const dbMockup = require('../../utils/mockup');
const errorHandler = require('../../utils/errorHandler');

module.exports = {
  getCards: async (root, { page, numberOfPages = 20 }) => {
    let pageStart, pageFinish;
    let cards = [];

    // set page start and finish
    pageStart = (page - 1) * numberOfPages;
    pageFinish = pageStart + numberOfPages;

    try {
      cards = await dbMockup.slice(pageStart, pageFinish);
    } catch (error) {
      errorHandler(error);
    }

    return cards;
  },
};
