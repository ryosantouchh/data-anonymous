import { MigrationInterface, QueryRunner } from 'typeorm';

export class BootstrapSeed1732814494631 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY,
                "username" VARCHAR NOT NULL,
                "password" VARCHAR,
                "first_name" VARCHAR,
                "last_name" VARCHAR,
                "profile_image_url" VARCHAR,
                "deleted_at" TIMESTAMPTZ DEFAULT null,
                "created_at" TIMESTAMPTZ DEFAULT now(),
                "updated_at" TIMESTAMPTZ DEFAULT now()
            );
        `);

    await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR NOT NULL,
                "deleted_at" TIMESTAMPTZ DEFAULT null,
                "created_at" TIMESTAMPTZ DEFAULT now(),
                "updated_at" TIMESTAMPTZ DEFAULT now()
            );
        `);

    await queryRunner.query(`
            CREATE TABLE "posts" (
                "id" SERIAL PRIMARY KEY,
                "title" VARCHAR NOT NULL,
                "content" VARCHAR NOT NULL,
                "user_id" INT NOT NULL,
                "category_id" INT NOT NULL,
                "deleted_at" TIMESTAMPTZ DEFAULT null,
                "created_at" TIMESTAMPTZ DEFAULT now(),
                "updated_at" TIMESTAMPTZ DEFAULT now(),

                 CONSTRAINT "fk_user_post" 
                    FOREIGN KEY ("user_id") 
                    REFERENCES "users"("id"),

                 CONSTRAINT "fk_category_post" 
                    FOREIGN KEY ("category_id") 
                    REFERENCES "categories"("id")
            );
        `);

    await queryRunner.query(`
            CREATE TABLE "comments" (
                "id" SERIAL PRIMARY KEY,
                "content" VARCHAR NOT NULL,
                "user_id" INT NOT NULL,
                "post_id" INT NOT NULL,
                "deleted_at" TIMESTAMPTZ DEFAULT null,
                "created_at" TIMESTAMPTZ DEFAULT now(),
                "updated_at" TIMESTAMPTZ DEFAULT now(),

                 CONSTRAINT "fk_user_comment" 
                    FOREIGN KEY ("user_id") 
                    REFERENCES "users"("id"),

                 CONSTRAINT "fk_post_comment" 
                    FOREIGN KEY ("post_id") 
                    REFERENCES "posts"("id")
            );
        `);

    await queryRunner.query(`
            INSERT INTO users ("username", "password", "first_name", "last_name")
            VALUES
              ('user1', '$2a$10$T.jg2mMfzfsfwCu1XXP83.Anqu8NSF9GM8073LvE7fH8u4MfMkpXO', 'John', 'Doe'),
              ('user2', '$2a$10$T.jg2mMfzfsfwCu1XXP83.Anqu8NSF9GM8073LvE7fH8u4MfMkpXO', 'Jane', 'Doe'),
              ('user3', '$2a$10$T.jg2mMfzfsfwCu1XXP83.Anqu8NSF9GM8073LvE7fH8u4MfMkpXO', 'Alan', 'Smith'),
              ('user4', '$2a$10$T.jg2mMfzfsfwCu1XXP83.Anqu8NSF9GM8073LvE7fH8u4MfMkpXO', 'Aaron', 'Donald'),
              ('user5', '$2a$10$T.jg2mMfzfsfwCu1XXP83.Anqu8NSF9GM8073LvE7fH8u4MfMkpXO', 'Nathan', 'Smith'),
              ('user6', '$2a$10$T.jg2mMfzfsfwCu1XXP83.Anqu8NSF9GM8073LvE7fH8u4MfMkpXO', 'Kris', 'Doe'),
              ('user7', '$2a$10$T.jg2mMfzfsfwCu1XXP83.Anqu8NSF9GM8073LvE7fH8u4MfMkpXO', 'James', 'Allen'),
              ('user8', '$2a$10$T.jg2mMfzfsfwCu1XXP83.Anqu8NSF9GM8073LvE7fH8u4MfMkpXO', 'Steven', 'Huang'),
              ('user9', '$2a$10$T.jg2mMfzfsfwCu1XXP83.Anqu8NSF9GM8073LvE7fH8u4MfMkpXO', 'Christina', 'Huang'),
              ('user10', '$2a$10$T.jg2mMfzfsfwCu1XXP83.Anqu8NSF9GM8073LvE7fH8u4MfMkpXO', 'David', 'Armstrong');
        `);

    await queryRunner.query(`
            INSERT INTO categories ("name")
            VALUES
              ('History'),
              ('Food'),
              ('Pets'),
              ('Health'),
              ('Fashion'),
              ('Exercise'),
              ('Others');
        `);

    await queryRunner.query(`
            INSERT INTO posts ("user_id", "category_id", "title", "content")
            VALUES
              (1, 1, 'History Title 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula. Phasellus eget rhoncus ligula. Nunc luctus venenatis.'),
              (2, 1, 'History Title 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula. Phasellus eget rhoncus ligula. Nunc luctus venenatis.'),
              (3, 1, 'History Title 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula. Phasellus eget rhoncus ligula. Nunc luctus venenatis.'),
              (5, 2, 'Food Title 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula. Phasellus eget rhoncus ligula. Nunc luctus venenatis.'),
              (8, 2, 'Food Title 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula. Phasellus eget rhoncus ligula. Nunc luctus venenatis.'),
              (9, 2, 'Food Title 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula. Phasellus eget rhoncus ligula. Nunc luctus venenatis.'),
              (4, 3, 'Pet Title 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula. Phasellus eget rhoncus ligula. Nunc luctus venenatis.'),
              (2, 3, 'Pet Title 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula. Phasellus eget rhoncus ligula. Nunc luctus venenatis.'),
              (7, 4, 'Health Title 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula. Phasellus eget rhoncus ligula. Nunc luctus venenatis.'),
              (7, 5, 'Exercise Title 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula. Phasellus eget rhoncus ligula. Nunc luctus venenatis.'),
              (1, 5, 'Exercise Title 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula. Phasellus eget rhoncus ligula. Nunc luctus venenatis.'),
              (2, 5, 'Exercise Title 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula. Phasellus eget rhoncus ligula. Nunc luctus venenatis.'),
              (1, 6, 'Others 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula. Phasellus eget rhoncus ligula. Nunc luctus venenatis.');
        `);

    await queryRunner.query(`
            INSERT INTO comments ("user_id", "post_id", "content")
            VALUES
              (2, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (3, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (4, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (1, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (8, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (7, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (9, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (8, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (7, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (1, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (3, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (2, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (7, 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (5, 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (4, 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (5, 7, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (6, 7, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (4, 8, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (3, 8, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (1, 8, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (1, 9, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (2, 9, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (9, 9, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (1, 10, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (3, 10, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (9, 10, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (2, 11, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (4, 11, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (6, 12, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (7, 12, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (6, 13, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.'),
              (7, 13, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet lacus feugiat, interdum sapien at, bibendum ligula.');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS "comments";
        `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS "posts";
        `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS "categories";
        `);

    await queryRunner.query(`
            DROP TABLE IF EXISTS "users";
        `);
  }
}
