var knex = require('./knex');

module.exports = {
    Contributor: {
        getContributorById: id => knex('contributor').where('id', id).first(),
        findContributorByEmail: email => knex('contributor').where('email', email).first(),
        addContributor: body =>
            knex('contributor').insert({
                email: body.email,
                password: body.password,
                isadmin: 'false'
            }).returning('id').then(id => {
                return knex('contributor').where('id', id[0]).first();
            })
    },
    Favorite: {
        addUserFavorite: (location, user) => knex('favorite').insert({
            location_id: location,
            contributor_id: user
        }),
        getNeighborhoodByLocation: (location_name) => knex('location').select('neighborhood_name').where({
            name: location_name
        }).first()
    },
    Location: {
        getLocations: () => knex('location'),
        addLocation: (body, id) => {
            return knex('location').insert({
                name: body.name,
                address: body.address,
                url: body.url,
                image_url: body.image_url,
                contributor_id: id,
                neighborhood_name: body.neighborhood_name
            }, '*');
        },
        getLocationsByNeighborhood: name => knex('location').where('neighborhood_name', name)
    },

    Neighborhood: {
        getNeighborhoods: () => knex('neighborhood').orderBy('name', 'asc'),
        findNeighborhoodsByName: name => knex('neighborhood').where('name', name)
    },

    HappyHour: {
        getInfoByHoodName: name => knex('neighborhood').where('name', name).first()
            .then(oneHood => knex('location').where('location.neighborhood_name', oneHood.name).orderBy('name', 'asc').then(locationsByHoodName => locationsByHoodName)),

        addHappyHour: (body, id, contributor, day, callback) => {
            knex('happy_hour').insert({
                start: body.start || '0600',
                end: body.end || '0600',
                day: day || 'none',
                location_id: id,
                contributor_id: contributor
            }).then(function() {
              callback();
            });
        },

        getHappyHourInfo: id =>
            knex('location').join('happy_hour', 'location_id', 'location.id')
            .select().where({'location.id': id})
    }
};
