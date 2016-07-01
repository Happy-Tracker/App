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
        addLocation: (body, id) => knex('location').insert({
            name: body.name,
            url: body.url,
            image_url: body.image_url,
            address: body.address,
            contributor_id: id,
            neighborhood_name: body.neighborhood_name
        }, 'id').first(),
        getLocationsByNeighborhood: name => knex('location').where('neighborhood_name', name)
    },

    Neighborhood: {
        getNeighborhoods: () => knex('neighborhood'),
        findNeighborhoodsByName: name => knex('neighborhood').where('name', name)
    },
    HappyHour: {
        getInfoByHoodName: name => knex('neighborhood').where('name', name).first()
            .then(oneHood => knex('location').where('location.neighborhood_name', oneHood.name).orderBy('name', 'asc').then(locationsByHoodName => locationsByHoodName)),
        addHappyHour: (body, id) => knex('happy_hour').insert({
            day: body.day,
            start_time: body.start,
            end_time: body.end,
            location_id: id
        })
    }
};
