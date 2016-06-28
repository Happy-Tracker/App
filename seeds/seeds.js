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
					name: 'LoHi',
					image_url: 'http://lizrichardsrealestate.com/wp-content/uploads/2014/02/lohi_lrg.jpg'
				}),
				knex('neighborhood').insert({
					name: 'Baker',
					image_url: 'http://smartdenverrealestate.com/wp-content/uploads/2012/02/Broadway1.jpg'
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
						neighborhood_name: findNeighborhood('LoHi', data[1])
					}),
					knex('location').insert({
						name: 'Adrift Tiki Bar & Grill',
						address: '218 S Broadway, Denver, CO 80209',
						url: 'http://adriftbar.com',
						image_url: 'http://adriftbar.com/images/img_1933.jpg',
						contributor_id: findEmail('foo2@bar.com', data[0]),
						neighborhood_name: findNeighborhood('Baker', data[1])
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
					  start: '17:00',
					  end: '19:00',
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
