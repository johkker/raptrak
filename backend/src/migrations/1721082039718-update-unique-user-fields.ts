import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUniqueUserFields1721082039718 implements MigrationInterface {
    name = 'UpdateUniqueUserFields1721082039718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_71fdad8489d3d818ec393e6eb14" UNIQUE ("document")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_71fdad8489d3d818ec393e6eb14"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    }

}
