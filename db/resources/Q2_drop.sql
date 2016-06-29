-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2016-06-27 23:44:34.691

-- foreign keys
ALTER TABLE favorite
    DROP CONSTRAINT Favorites_location;

ALTER TABLE happy_hour
    DROP CONSTRAINT day_time_location;

ALTER TABLE favorite
    DROP CONSTRAINT favorite_contributor;

ALTER TABLE happy_hour
    DROP CONSTRAINT happy_hour_contributor;

ALTER TABLE location
    DROP CONSTRAINT location_contributor;

ALTER TABLE location
    DROP CONSTRAINT location_neighborhood;

-- tables
DROP TABLE contributor;

DROP TABLE favorite;

DROP TABLE happy_hour;

DROP TABLE location;

DROP TABLE neighborhood;

-- End of file.
