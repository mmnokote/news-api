import {MigrationInterface, QueryRunner} from "typeorm";

export class init1648101293169 implements MigrationInterface {
    name = 'init1648101293169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "email" character varying(1000) NOT NULL, "phone" character varying NOT NULL, "readerId" integer NOT NULL, CONSTRAINT "REL_8864a3631809fed1aec8fa5ca8" UNIQUE ("readerId"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meetings" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "email" character varying(1000) NOT NULL, "zoomUrl" character varying NOT NULL, CONSTRAINT "PK_aa73be861afa77eb4ed31f3ed57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "readers" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "name" character varying(1000) NOT NULL, "description" character varying(1000) NOT NULL, "managerId" integer, CONSTRAINT "PK_4564309186c3e23496d65a80b4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "name" character varying(1000) NOT NULL, "author" character varying(1000) NOT NULL, "releaseYear" integer NOT NULL, "description" character varying(1000) NOT NULL, "readerId" integer, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "first_name" character varying(1000) NOT NULL, "middle_name" character varying(1000) NOT NULL, "last_name" character varying(1000) NOT NULL, "age" character varying(1000) NOT NULL, "sex" character varying(1000) NOT NULL, "email" character varying(1000) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "readers_meetings_meetings" ("readersId" integer NOT NULL, "meetingsId" integer NOT NULL, CONSTRAINT "PK_e9bee733e6f32dc613131af85c1" PRIMARY KEY ("readersId", "meetingsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_61ecbd00b6712a4194c2db6106" ON "readers_meetings_meetings" ("readersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_492a0147d9d5e4a255b808e3b4" ON "readers_meetings_meetings" ("meetingsId") `);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_8864a3631809fed1aec8fa5ca8a" FOREIGN KEY ("readerId") REFERENCES "readers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "readers" ADD CONSTRAINT "FK_c34e20cc67a973b92062697ba4b" FOREIGN KEY ("managerId") REFERENCES "readers"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_584dff0f6fb295c42a3e4b63a40" FOREIGN KEY ("readerId") REFERENCES "readers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "readers_meetings_meetings" ADD CONSTRAINT "FK_61ecbd00b6712a4194c2db61065" FOREIGN KEY ("readersId") REFERENCES "readers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "readers_meetings_meetings" ADD CONSTRAINT "FK_492a0147d9d5e4a255b808e3b4f" FOREIGN KEY ("meetingsId") REFERENCES "meetings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "readers_meetings_meetings" DROP CONSTRAINT "FK_492a0147d9d5e4a255b808e3b4f"`);
        await queryRunner.query(`ALTER TABLE "readers_meetings_meetings" DROP CONSTRAINT "FK_61ecbd00b6712a4194c2db61065"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_584dff0f6fb295c42a3e4b63a40"`);
        await queryRunner.query(`ALTER TABLE "readers" DROP CONSTRAINT "FK_c34e20cc67a973b92062697ba4b"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_8864a3631809fed1aec8fa5ca8a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_492a0147d9d5e4a255b808e3b4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_61ecbd00b6712a4194c2db6106"`);
        await queryRunner.query(`DROP TABLE "readers_meetings_meetings"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "readers"`);
        await queryRunner.query(`DROP TABLE "meetings"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
