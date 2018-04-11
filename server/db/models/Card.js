const bookshelf = require(`./bookshelf`);

class Card extends bookshelf.Model {
get tableName() {return `cards`}

}

module.exports = bookshelf.model(`Card`, Card);