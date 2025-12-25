import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1766688703188 implements MigrationInterface {
    name = 'InitSchema1766688703188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banks" ALTER COLUMN "mclr_rate" SET DEFAULT '8.5'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banks" ALTER COLUMN "mclr_rate" SET DEFAULT 8.5`);
    }

}
