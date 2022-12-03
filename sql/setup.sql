-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS workouts_sets;

DROP TABLE IF EXISTS sets_parts;

DROP TABLE IF EXISTS workouts;

DROP TABLE IF EXISTS swim_sets;

DROP TABLE IF EXISTS parts;

CREATE TABLE workouts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  image VARCHAR
);

CREATE TABLE swim_sets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  description VARCHAR NOT NULL
);

CREATE TABLE parts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  qty INT NOT NULL,
  distance INT NOT NULL,
  INTERVAL VARCHAR,
  detail VARCHAR
);

CREATE TABLE workouts_sets(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  workout_id BIGINT,
  swim_set_id BIGINT,
  repeat INT,
  FOREIGN KEY (workout_id) REFERENCES workouts(id),
  FOREIGN KEY (swim_set_id) REFERENCES swim_sets(id)
);

CREATE TABLE swim_sets_parts(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  swim_set_id BIGINT,
  parts_id BIGINT,
  FOREIGN KEY(swim_set_id) REFERENCES swim_sets(id),
  FOREIGN KEY(parts_id) REFERENCES parts(id)
);

INSERT INTO
  workouts (name, description, image)
VALUES
  (
    'Ravioli Starfish',
    'Mostly free - short distances',
    'https://images.squarespace-cdn.com/content/v1/5aa560f95b409b3000db7c5d/1631809696742-89QVMOKAWLDHIHGLOGPV/ravioli-starfish.jpg?format=1500w'
  );

INSERT INTO
  swim_sets (description)
VALUES
  ('Warm Up'),
  ('Main Set'),
  ('Warm Down');

INSERT INTO
  parts (qty, distance, INTERVAL, detail)
VALUES
  (3, 50, NULL, 'Kick'),
  (1, 50, NULL, 'Drill'),
  (1, 100, NULL, 'Swim'),
  (6, 100, 'Kick Base', 'kick descend 1-3, 4-6'),
  (
    8,
    50,
    'Base + 20',
    '2x through: buildup, build down, easy, fast'
  );

INSERT INTO
  swim_sets_parts (swim_set_id, parts_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 4),
  (2, 5);

INSERT INTO
  workouts_sets (workout_id, swim_set_id, repeat)
VALUES
  (1, 1, 1),
  (1, 2, 2),
  (1, 3, 1);