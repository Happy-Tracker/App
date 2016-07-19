exports.seed = function(knex, Promise) {
    return knex.raw("TRUNCATE happy_hour, favorite, location, contributor, neighborhood RESTART IDENTITY CASCADE")
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('contributor').insert({
                    email: 'foo@bar.com',
                    password: 'foobar',
                    isadmin: true
                }),
                knex('contributor').insert({
                    email: 'foo2@bar.com',
                    password: 'foo2bar',
                    isadmin: false
                }),
                knex('neighborhood').insert({
                    name: 'Highlands',
                    image_url: 'http://smartdenverrealestate.com/wp-content/uploads/2012/07/Highlands1.jpg'
                }),
                knex('neighborhood').insert({
                    name: 'Lodo',
                    image_url: 'http://static1.squarespace.com/static/52029169e4b0882b615617cf/t/5507555fe4b0b3d509a59926/1426544009455/DenverUnionStation_TOP_creditScottDresselMartin.jpg?format=1500w'
                }),
                knex('neighborhood').insert({
                    name: 'Capitol Hill',
                    image_url: 'http://denver.thedrinknation.com/images/bars/irishsnugdenver.jpg'
                }),
                knex('neighborhood').insert({
                    name: 'Cheesman Park',
                    image_url: 'http://images1.westword.com/imager/u/745xauto/6706257/denver.cheesman.park.neighborhood.youtube.800.jpg'
                }),
                knex('neighborhood').insert({
                    name: 'Wash Park',
                    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Washington_Park_Denver.JPG/2560px-Washington_Park_Denver.JPG'
                }),
                knex('neighborhood').insert({
                    name: 'Five Points',
                    image_url: 'http://images1.westword.com/imager/u/745xauto/6706268/five.points.denver.colorado.neighborhood.youtube.800.jpg'
                }),
                knex('neighborhood').insert({
                    name: 'RiNo',
                    image_url: 'http://boojblogbucket.s3-us-west-1.amazonaws.com/kentwood/2016/04/29204230/RINO-2.jpg'
                }),
                knex('neighborhood').insert({
                    name: 'South Broadway',
                    image_url: 'http://images1.westword.com/imager/historians-ale-house/u/original/5181716/9874717.0.jpg'
                }),
                knex('neighborhood').insert({
                    name: 'Slaon Lake',
                    image_url: 'http://temp.2centsmobile.com/wp-content/gallery/sloans-lake/denver-col129.jpg'
                }),
                knex('neighborhood').insert({
                    name: 'City Park',
                    image_url: 'http://svcdn.simpleviewinc.com/v3/cache/www_denver_org/41F3364F0BA21B5A9F9530D0DB768206.jpg'
                }),
                knex('neighborhood').insert({
                    name: 'Berkeley',
                    image_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Berkeley_Lake_Park.JPG'
                }),
                knex('neighborhood').insert({
                    name: 'Cherry Creek',
                    image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/CherryCreekAF.jpg'
                })
            ]);
        })
        .then(function() {
            return Promise.all([
                knex('contributor').select(),
                knex('neighborhood').select()
            ]);
        })
        .then(function(data) {
            return Promise.all([
                    knex('location').insert({
                        name: 'Brider',
                        address: '1644 Platte St, Denver, CO 80202',
                        url: 'http://denverbrider.com',
                        image_url: 'http://ecospace.com/wp-content/uploads/2015/12/IMG_0324.jpg',
                        contributor_id: findEmail('foo@bar.com', data[0]),
                        neighborhood_name: findNeighborhood('Highlands', data[1])
                    }),
                    knex('location').insert({
                        name: 'Ale House',
                        address: '2501 16th St, Denver, CO 80211',
                        url: 'http://www.alehousedenver.com/',
                        image_url: 'https://nightout.s3.amazonaws.com/media/covers/168/large-06f52e9102a8d3be.jpg?1360864874',
                        contributor_id: findEmail('foo@bar.com', data[0]),
                        neighborhood_name: findNeighborhood('Highlands', data[1])
                    }),
                    knex('location').insert({
                        name: 'Berkeley Inn',
                        address: '3834 Tennyson St, Denver, CO 80212',
                        url: 'http://www.theberkeleyinn.com/',
                        image_url: 'http://www.milehighhappyhour.com/wp-content/uploads/2013/10/Berkeley-Inn-1000x500.jpg',
                        contributor_id: findEmail('foo@bar.com', data[0]),
                        neighborhood_name: findNeighborhood('Highlands', data[1])
                    }),
                    knex('location').insert({
                        name: 'Central Bistro Bar',
                        address: '1691 Central St, Denver, CO 80211',
                        url: 'http://www.centralbistrobar.com/',
                        image_url: 'http://www.denveroffthewagon.com/wp-content/uploads/2013/09/IMG_8207.jpg',
                        contributor_id: findEmail('foo@bar.com', data[0]),
                        neighborhood_name: findNeighborhood('Highlands', data[1])
                    }),
                    knex('location').insert({
                        name: 'Denver Beer Co',
                        address: '1695 Platte St, Denver, CO 80202',
                        url: 'http://denverbeerco.com/',
                        image_url: 'http://drinks.seriouseats.com/images/193057-denver-beer-co-exterior.jpg',
                        contributor_id: findEmail('foo@bar.com', data[0]),
                        neighborhood_name: findNeighborhood('Highlands', data[1])
                    }),
                    knex('location').insert({
                        name: 'The Monkey Barrel',
                        address: '1611 Plate St, Denver, CO 80202',
                        url: 'http://www.monkeybarrelbar.com/',
                        image_url: 'https://cdn2.vox-cdn.com/thumbor/RXQfZe3Bo13gVeHKR7Vf0kFKw4g=/0x0:680x383/1310x737/cdn0.vox-cdn.com/uploads/chorus_image/image/48779713/635906446321724820-IMG-6459-1-.0.0.JPG',
                        contributor_id: findEmail('foo@bar.com', data[0]),
                        neighborhood_name: findNeighborhood('Highlands', data[1])
                    }),
                    knex('location').insert({
                        name: 'Highland Tap and Burger',
                        address: '2219 West 32nd Ave, Denver, CO 80211',
                        url: 'http://highlandtapdenver.com',
                        image_url: 'http://www.denveroffthewagon.com/wp-content/uploads/2011/06/highlandtapburger.jpg',
                        contributor_id: findEmail('foo@bar.com', data[0]),
                        neighborhood_name: findNeighborhood('Highlands', data[1])
                    }),
                    knex('location').insert({
                        name: 'Highland Tavern',
                        address: '3400 Navajo St, Denver, CO 80211',
                        url: 'http://www.highlandtavern.com',
                        image_url: 'http://images1.westword.com/imager/highland-tavern/u/original/5168100/5532194.0.jpg',
                        contributor_id: findEmail('foo@bar.com', data[0]),
                        neighborhood_name: findNeighborhood('Highlands', data[1])
                    }),
                    knex('location').insert({
                        name: 'Adrift Tiki Bar & Grill',
                        address: '218 S Broadway, Denver, CO 80209',
                        url: 'http://adriftbar.com',
                        image_url: 'http://adriftbar.com/images/img_1933.jpg',
                        contributor_id: findEmail('foo2@bar.com', data[0]),
                        neighborhood_name: findNeighborhood('Berkeley', data[1])
                    })
                ])
                .then(function() {
                    return data;
                });
        })
        .then(function() {
            return Promise.all([
                knex('contributor').select(),
                knex('location').select()
            ]);
        })
        .then(function(data) {
            return Promise.all([
                    knex('favorite').insert({
                        location_id: findLocation('Brider', data[1]),
                        contributor_id: findEmail('foo@bar.com', data[0])
                    }),
                    knex('favorite').insert({
                        location_id: findLocation('Adrift Tiki Bar & Grill', data[1]),
                        contributor_id: findEmail('foo2@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Sunday',
                        start: '15:00',
                        end: '18:00',
                        location_id: findLocation('Brider', data[1]),
                        contributor_id: findEmail('foo@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Sunday',
                        start: '15:00',
                        end: '18:00',
                        location_id: findLocation('Brider', data[1]),
                        contributor_id: findEmail('foo@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Monday',
                        start: '15:00',
                        end: '18:00',
                        location_id: findLocation('Brider', data[1]),
                        contributor_id: findEmail('foo@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Tuesday',
                        start: '15:00',
                        end: '18:00',
                        location_id: findLocation('Brider', data[1]),
                        contributor_id: findEmail('foo@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Wednesday',
                        start: '15:00',
                        end: '18:00',
                        location_id: findLocation('Brider', data[1]),
                        contributor_id: findEmail('foo@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Thursday',
                        start: '15:00',
                        end: '18:00',
                        location_id: findLocation('Brider', data[1]),
                        contributor_id: findEmail('foo@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Friday',
                        start: '15:00',
                        end: '18:00',
                        location_id: findLocation('Brider', data[1]),
                        contributor_id: findEmail('foo@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Saturday',
                        start: '15:00',
                        end: '18:00',
                        location_id: findLocation('Brider', data[1]),
                        contributor_id: findEmail('foo@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Sunday',
                        start: '17:00',
                        end: '19:00',
                        location_id: findLocation('Adrift Tiki Bar & Grill', data[1]),
                        contributor_id: findEmail('foo2@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Monday',
                        start: '17:00',
                        end: '19:00',
                        location_id: findLocation('Adrift Tiki Bar & Grill', data[1]),
                        contributor_id: findEmail('foo2@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Tuesday',
                        start: '17:00',
                        end: '19:00',
                        location_id: findLocation('Adrift Tiki Bar & Grill', data[1]),
                        contributor_id: findEmail('foo2@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Wednesday',
                        start: '17:00',
                        end: '19:00',
                        location_id: findLocation('Adrift Tiki Bar & Grill', data[1]),
                        contributor_id: findEmail('foo2@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Thursday',
                        start: '17:00',
                        end: '19:00',
                        location_id: findLocation('Adrift Tiki Bar & Grill', data[1]),
                        contributor_id: findEmail('foo2@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Friday',
                        start: '16:00',
                        end: '19:00',
                        location_id: findLocation('Adrift Tiki Bar & Grill', data[1]),
                        contributor_id: findEmail('foo2@bar.com', data[0])
                    }),
                    knex('happy_hour').insert({
                        day: 'Saturday',
                        start: '16:00',
                        end: '19:00',
                        location_id: findLocation('Adrift Tiki Bar & Grill', data[1]),
                        contributor_id: findEmail('foo2@bar.com', data[0])
                    })
                ])
                .then(function() {
                    return data;
                });
        });
};

// These three functions could be refactored into a single generic function.
function findEmail(email, list) {
    for (var i = 0; i < list.length; i++) {
        if (email === list[i].email) {
            return list[i].id;
        }
    }
}

function findNeighborhood(name, list) {
    for (var i = 0; i < list.length; i++) {
        if (name === list[i].name) {
            return list[i].name;
        }
    }
}

function findLocation(name, list) {
    for (var i = 0; i < list.length; i++) {
        if (name === list[i].name) {
            return list[i].id;
        }
    }
}
