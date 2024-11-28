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
