-- CREATE TABLE "user" (
--   "id" SERIAL PRIMARY KEY,
--   "username" VARCHAR (80) UNIQUE NOT NULL,
--   "password" VARCHAR (1000) NOT NULL,
--   "email" VARCHAR (100) UNIQUE NOT NULL,
--   "first_name" VARCHAR (100) NOT NULL,
--   "last_name" VARCHAR (100) NOT NULL,
--   "created_at" TIMESTAMP NOT NULL,
--   "updated_at" TIMESTAMP NOT NULL
-- );

CREATE TABLE "series" (
  "id" SERIAL PRIMARY KEY,
  "path" VARCHAR(1000) NOT NULL,
  "thumbnail" VARCHAR(1000) NOT NULL,
  "title" VARCHAR(100) NOT NULL,
  "author" VARCHAR(100) NOT NULL,
  "created_at" TIMESTAMP NOT NULL
);

CREATE TABLE "chapters" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "path" VARCHAR(1000) NOT NULL,
  "sequence" VARCHAR(40) NOT NULL,
  "title" VARCHAR(200) NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "series_id" INT REFERENCES "series" NOT NULL
);

CREATE TABLE "pages" (
  "id" SERIAL PRIMARY KEY,
  "sequence" INT NOT NULL,
  "alt" VARCHAR(60) NOT NULL,
  "origin_img" VARCHAR(1000) NOT NULL,
  "img_src" VARCHAR(1000) NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "chapter_id" INT REFERENCES "chapters" NOT NULL
);