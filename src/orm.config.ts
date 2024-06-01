// git rm --cached src/orm.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'p@ssw0rd',
  port: 5432,
  host: 'localhost',
  database: 'confecence',
  synchronize: true,
  migrations: ['dist/db/migrations/*.js'],
  cli: { migrationsDir: 'src/db/migrations' },

  entities: ['dist/**/*.entity{.ts,.js}'],
};

// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// const config: TypeOrmModuleOptions = {
//   type: 'postgres',
//   username: 'postgres',
//   password: 'Evlina@1990',
//   port: 5432,
//   host: 'localhost',
//   database: 'news',
//   synchronize: true,
//   migrations: ['dist/db/migrations/*.js'],
//   cli: { migrationsDir: 'src/db/migrations' },

//   entities: ['dist/**/*.entity{.ts,.js}'],
// };

export default config;
