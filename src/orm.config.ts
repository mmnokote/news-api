// git rm --cached src/orm.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// const config: TypeOrmModuleOptions = {
//   type: 'postgres',
//   username: 'postgres',
//   password: 'ABCtscm1s@@2023', // Update with the correct password
//   port: 5432,
//   host: '172.16.18.193',
//   database: 'conferencelive', // Corrected database name
//   synchronize: true,
//   migrations: ['dist/db/migrations/*.js'],
//   cli: { migrationsDir: 'src/db/migrations' },
//   entities: ['dist/**/*.entity{.ts,.js}'],
// };

// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// const config: TypeOrmModuleOptions = {
//   type: 'postgres',
//   username: 'postgres',
//   password: 'p@ssw0rd',
//   port: 5432,
//   host: 'localhost',
//   database: 'confecence',
//   synchronize: true,
//   migrations: ['dist/db/migrations/*.js'],
//   cli: { migrationsDir: 'src/db/migrations' },

//   entities: ['dist/**/*.entity{.ts,.js}'],
// };

const config: TypeOrmModuleOptions = {
  type: 'mysql', // Change 'postgres' to 'mysql'
  host: 'localhost',
  port: 3306, // Default MySQL port
  username: 'root', // Your MySQL username
  password: 'root', // Your MySQL password
  database: 'conference', // Your MySQL database name
  synchronize: true,
  migrations: ['dist/db/migrations/*.js'],
  cli: { migrationsDir: 'src/db/migrations' },
  entities: ['dist/**/*.entity{.ts,.js}'],
};
// export default config;

// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// // import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// const config: TypeOrmModuleOptions = {
//   type: 'postgres',
//   username: 'postgres',
//   password: 'P@ssw0rd@098',
//   port: 5432,
//   host: 'localhost',
//   database: 'bonde',
//   synchronize: true,
//   migrations: ['dist/db/migrations/*.js'],
//   cli: { migrationsDir: 'src/db/migrations' },

//   entities: ['dist/**/*.entity{.ts,.js}'],
// };
export default config;
