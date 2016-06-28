var knex = require('./knex');

module.exports = {
    Contributor: {
        getContributorById: id => knex('contributor').where('id', id).first(),
        addContributor: body => knex('contributor').insert(body, 'id')
    },
    Favorite: {

    },
    Location: {

    },
    Neighborhood: {

    },
    HappyHour: {

    }
};
