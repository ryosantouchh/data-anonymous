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
                "deletedAt" TIMESTAMPTZ DEFAULT null,
                "createdAt" TIMESTAMPTZ DEFAULT now(),
                "updatedAt" TIMESTAMPTZ DEFAULT now()
            );
        `);

    await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR NOT NULL,
                "deletedAt" TIMESTAMPTZ DEFAULT null,
                "createdAt" TIMESTAMPTZ DEFAULT now(),
                "updatedAt" TIMESTAMPTZ DEFAULT now()
            );
        `);

    await queryRunner.query(`
            CREATE TABLE "posts" (
                "id" SERIAL PRIMARY KEY,
                "user_id" INT NOT NULL,
                "category_id" INT NOT NULL,
                "deletedAt" TIMESTAMPTZ DEFAULT null,
                "createdAt" TIMESTAMPTZ DEFAULT now(),
                "updatedAt" TIMESTAMPTZ DEFAULT now(),

                 CONSTRAINT "fk_user_post" 
                    FOREIGN KEY ("user_id") 
                    REFERENCES "users"("id")

                 CONSTRAINT "fk_category_post" 
                    FOREIGN KEY ("category_id") 
                    REFERENCES "categories"("id")
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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