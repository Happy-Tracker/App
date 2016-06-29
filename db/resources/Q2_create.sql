-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2016-06-27 23:44:34.691

-- tables
-- Table: contributor
CREATE TABLE contributor (
    id serial  NOT NULL,
    email varchar(255)  NOT NULL,
    password varchar(255)  NOT NULL,
    isAdmin boolean  NOT NULL,
    CONSTRAINT contributor_pk PRIMARY KEY (id)
);

-- Table: favorite
CREATE TABLE favorite (
    id serial  NOT NULL,
    location_id int  NOT NULL,
    contributor_id int  NOT NULL,
    CONSTRAINT favorite_pk PRIMARY KEY (id)
);

-- Table: happy_hour
CREATE TABLE happy_hour (
    id serial  NOT NULL,
    day varchar(10)  NOT NULL,
    start time  NOT NULL,
    "end" time  NOT NULL,
    location_id int  NOT NULL,
    contributor_id int  NOT NULL,
    CONSTRAINT happy_hour_pk PRIMARY KEY (id)
);

-- Table: location
CREATE TABLE location (
    id serial  NOT NULL,
    name varchar(255)  NOT NULL,
    address varchar(255)  NOT NULL,
    url varchar(255)  NOT NULL,
    image_url text  NOT NULL,
    contributor_id int  NOT NULL,
    neighborhood_name varchar(255)  NOT NULL,
    CONSTRAINT location_pk PRIMARY KEY (id)
);

-- Table: neighborhood
CREATE TABLE neighborhood (
    name varchar(255)  NOT NULL,
    image_url text  NOT NULL,
    CONSTRAINT neighborhood_pk PRIMARY KEY (name)
);

-- foreign keys
-- Reference: Favorite_location (table: favorite)
ALTER TABLE favorite ADD CONSTRAINT favorite_location
    FOREIGN KEY (location_id)
    REFERENCES location (id)
    ON DELETE CASCADE
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: day_time_location (table: happy_hour)
ALTER TABLE happy_hour ADD CONSTRAINT day_time_location
    FOREIGN KEY (location_id)
    REFERENCES location (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: favorite_contributor (table: favorite)
ALTER TABLE favorite ADD CONSTRAINT favorite_contributor
    FOREIGN KEY (contributor_id)
    REFERENCES contributor (id)
    ON DELETE CASCADE
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: happy_hour_contributor (table: happy_hour)
ALTER TABLE happy_hour ADD CONSTRAINT happy_hour_contributor
    FOREIGN KEY (contributor_id)
    REFERENCES contributor (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: location_contributor (table: location)
ALTER TABLE location ADD CONSTRAINT location_contributor
    FOREIGN KEY (contributor_id)
    REFERENCES contributor (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: location_neighborhood (table: location)
ALTER TABLE location ADD CONSTRAINT location_neighborhood
    FOREIGN KEY (neighborhood_name)
    REFERENCES neighborhood (name)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- End of file.
