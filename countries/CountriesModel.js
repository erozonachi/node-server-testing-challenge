const db = require('../data/dbConfig');

module.exports = {
  insert: function(country) {
    return db('countries')
      .insert(country)
      .then(([ id ]) => this.get(id));
  },
  get: function(id = null) {
    if(id) {
      return db('countries')
        .where({ id })
        .first();
    }
    return db('countries');
  },
  delete: function(id) {

  }
};
