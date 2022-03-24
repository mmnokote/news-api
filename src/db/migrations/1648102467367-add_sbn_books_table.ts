import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSbnBooksTable1648102467367 implements MigrationInterface {
  name = 'addSbnBooksTable1648102467367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" ADD "sbn" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "sbn"`);
  }
}
