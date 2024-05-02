import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateTables1714677226849 implements MigrationInterface {
    name = 'GenerateTables1714677226849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "victory" ("id" SERIAL NOT NULL, "observation" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "winnerId" integer, "rapBattleId" integer, CONSTRAINT "PK_fabfe409ca36f9d29501f19e615" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "venue" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "insta" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip" character varying NOT NULL, "phone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" integer, CONSTRAINT "PK_c53deb6d1bcb088f9d459e7dbc0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_types_enum" AS ENUM('venue_admin', 'common_user', 'rapper', 'beatmaker')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "document" character varying NOT NULL, "birthdate" date NOT NULL, "types" "public"."user_types_enum" array NOT NULL DEFAULT '{common_user}', "isAdmin" boolean NOT NULL DEFAULT false, "avatar" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "filename" character varying NOT NULL, "mimetype" character varying NOT NULL, "size" integer NOT NULL, "imageUrl" character varying NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "uploadedById" integer, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "like" ("id" SERIAL NOT NULL, "likedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "trackId" integer, "venueId" uuid, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "plays" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rapBattles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "gpsLocation" character varying NOT NULL, "city" character varying NOT NULL, "likes" integer NOT NULL DEFAULT '0', "venueId" uuid, CONSTRAINT "PK_524cd00040fd327749d7b46c95b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_owned_venues_venue" ("userId" integer NOT NULL, "venueId" uuid NOT NULL, CONSTRAINT "PK_d04dccc0bde447f29c8d46d0ecc" PRIMARY KEY ("userId", "venueId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3ce91c19798a3979385eaac564" ON "user_owned_venues_venue" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_90dbc92364b2e33e5afe1f7f78" ON "user_owned_venues_venue" ("venueId") `);
        await queryRunner.query(`CREATE TABLE "user_tracks_track" ("userId" integer NOT NULL, "trackId" integer NOT NULL, CONSTRAINT "PK_2a371531e25086bc7ac3fe770bf" PRIMARY KEY ("userId", "trackId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a324e45161ac4a14dc78f071bb" ON "user_tracks_track" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_14f1105f4f42f38bc15128f37b" ON "user_tracks_track" ("trackId") `);
        await queryRunner.query(`ALTER TABLE "victory" ADD CONSTRAINT "FK_5042360cb30167f05bb879e2b90" FOREIGN KEY ("winnerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "victory" ADD CONSTRAINT "FK_7893f82073eda819e9298c6cac2" FOREIGN KEY ("rapBattleId") REFERENCES "rapBattles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venue" ADD CONSTRAINT "FK_ac21b68820c15d2fa90871c7eb2" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_5a32ea481d14333cc36c38ebfd4" FOREIGN KEY ("uploadedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_c557be81e32aa84b342e117e435" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_964161d04da2ad1073bcfebb416" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rapBattles" ADD CONSTRAINT "FK_b15b16e5510505b4c29bdfbcddf" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_owned_venues_venue" ADD CONSTRAINT "FK_3ce91c19798a3979385eaac5645" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_owned_venues_venue" ADD CONSTRAINT "FK_90dbc92364b2e33e5afe1f7f789" FOREIGN KEY ("venueId") REFERENCES "venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tracks_track" ADD CONSTRAINT "FK_a324e45161ac4a14dc78f071bb2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_tracks_track" ADD CONSTRAINT "FK_14f1105f4f42f38bc15128f37be" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tracks_track" DROP CONSTRAINT "FK_14f1105f4f42f38bc15128f37be"`);
        await queryRunner.query(`ALTER TABLE "user_tracks_track" DROP CONSTRAINT "FK_a324e45161ac4a14dc78f071bb2"`);
        await queryRunner.query(`ALTER TABLE "user_owned_venues_venue" DROP CONSTRAINT "FK_90dbc92364b2e33e5afe1f7f789"`);
        await queryRunner.query(`ALTER TABLE "user_owned_venues_venue" DROP CONSTRAINT "FK_3ce91c19798a3979385eaac5645"`);
        await queryRunner.query(`ALTER TABLE "rapBattles" DROP CONSTRAINT "FK_b15b16e5510505b4c29bdfbcddf"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_964161d04da2ad1073bcfebb416"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_c557be81e32aa84b342e117e435"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_5a32ea481d14333cc36c38ebfd4"`);
        await queryRunner.query(`ALTER TABLE "venue" DROP CONSTRAINT "FK_ac21b68820c15d2fa90871c7eb2"`);
        await queryRunner.query(`ALTER TABLE "victory" DROP CONSTRAINT "FK_7893f82073eda819e9298c6cac2"`);
        await queryRunner.query(`ALTER TABLE "victory" DROP CONSTRAINT "FK_5042360cb30167f05bb879e2b90"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_14f1105f4f42f38bc15128f37b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a324e45161ac4a14dc78f071bb"`);
        await queryRunner.query(`DROP TABLE "user_tracks_track"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_90dbc92364b2e33e5afe1f7f78"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3ce91c19798a3979385eaac564"`);
        await queryRunner.query(`DROP TABLE "user_owned_venues_venue"`);
        await queryRunner.query(`DROP TABLE "rapBattles"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_types_enum"`);
        await queryRunner.query(`DROP TABLE "venue"`);
        await queryRunner.query(`DROP TABLE "victory"`);
    }

}
