-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS swim_sets_parts;

DROP TABLE IF EXISTS parts;

DROP TABLE IF EXISTS swim_sets;

DROP TABLE IF EXISTS workouts;

CREATE TABLE workouts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  image VARCHAR
);

CREATE TABLE swim_sets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  description VARCHAR NOT NULL,
  workout_id BIGINT,
  repeat INT,
  FOREIGN KEY (workout_id) REFERENCES workouts(id)
);

CREATE TABLE parts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  swim_set_id BIGINT NOT NULL,
  qty INT NOT NULL,
  distance INT NOT NULL,
  base VARCHAR,
  stroke VARCHAR,
  detail VARCHAR,
  FOREIGN KEY(swim_set_id) REFERENCES swim_sets(id)
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
  swim_sets (workout_id, description, repeat)
VALUES
  (1, 'Warm Up', 1),
  (1, 'Main Set', 2),
  (1, 'Warm Down', 1);

INSERT INTO
  parts (qty, distance, base, stroke, detail, swim_set_id)
VALUES
  (3, 50, 'Easy', 'Kick', NULL, 1),
  (3, 50, 'Easy', 'Drill', NULL, 1),
  (3, 100, 'Easy', 'Swim', NULL, 1),
  (
    6,
    100,
    'Kick Base',
    'Kick',
    'kick descend 1-3, 4-6',
    2
  ),
  (
    8,
    50,
    'Base + 20',
    'Free',
    '2x through: buildup, build down, easy, fast',
    2
  );