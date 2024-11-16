import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1731776942723 implements MigrationInterface {
    name = 'Init1731776942723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`boards\` ADD \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE \`boards\` DROP COLUMN \`description\``);
    }

}