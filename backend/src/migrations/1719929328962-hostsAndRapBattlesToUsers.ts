import { MigrationInterface, QueryRunner } from "typeorm";

export class HostsAndRapBattlesToUsers1719929328962 implements MigrationInterface {
    name = 'HostsAndRapBattlesToUsers1719929328962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rap_battles_participants_user" ("rapBattlesId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_1e594e77c9aeb532f0d0baff2d5" PRIMARY KEY ("rapBattlesId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_824ef4d9a98a3102f53d394e63" ON "rap_battles_participants_user" ("rapBattlesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_aeecd03524a8c0f8671b301193" ON "rap_battles_participants_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "rap_battles_hosts_user" ("rapBattlesId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_957bcb5ce16f91e0d98c6153de3" PRIMARY KEY ("rapBattlesId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8fac672255cf83928b7f513b42" ON "rap_battles_hosts_user" ("rapBattlesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_16b4d4ff6b3ce83fdf523f6a91" ON "rap_battles_hosts_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "rap_battles_participants_user" ADD CONSTRAINT "FK_824ef4d9a98a3102f53d394e632" FOREIGN KEY ("rapBattlesId") REFERENCES "rapBattles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rap_battles_participants_user" ADD CONSTRAINT "FK_aeecd03524a8c0f8671b301193c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rap_battles_hosts_user" ADD CONSTRAINT "FK_8fac672255cf83928b7f513b422" FOREIGN KEY ("rapBattlesId") REFERENCES "rapBattles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rap_battles_hosts_user" ADD CONSTRAINT "FK_16b4d4ff6b3ce83fdf523f6a91f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rap_battles_hosts_user" DROP CONSTRAINT "FK_16b4d4ff6b3ce83fdf523f6a91f"`);
        await queryRunner.query(`ALTER TABLE "rap_battles_hosts_user" DROP CONSTRAINT "FK_8fac672255cf83928b7f513b422"`);
        await queryRunner.query(`ALTER TABLE "rap_battles_participants_user" DROP CONSTRAINT "FK_aeecd03524a8c0f8671b301193c"`);
        await queryRunner.query(`ALTER TABLE "rap_battles_participants_user" DROP CONSTRAINT "FK_824ef4d9a98a3102f53d394e632"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_16b4d4ff6b3ce83fdf523f6a91"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8fac672255cf83928b7f513b42"`);
        await queryRunner.query(`DROP TABLE "rap_battles_hosts_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aeecd03524a8c0f8671b301193"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_824ef4d9a98a3102f53d394e63"`);
        await queryRunner.query(`DROP TABLE "rap_battles_participants_user"`);
    }

}
