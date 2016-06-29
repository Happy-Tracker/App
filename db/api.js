var knex = require('./knex');

module.exports = {
    Contributor: {
        getContributorById: id => knex('contributor').where('id', id).first(),
        findContributorByEmail: email => knex('contributor').where('email', email).first(),
        addContributor: body =>
            knex('contributor').insert({
                email: body.email,
                password: body.password,
                isadmin: "false"
            }).returning('id').then(id => {
                return knex('contributor').where('id', id[0]).first()
            })
    },
    Favorite: {

    },
    Location: {

    },
    Neighborhood: {
        //knex('neighborhood').
    },
    HappyHour: {

    }
};
