// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// // import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// const config: TypeOrmModuleOptions = {
//   type: 'postgres',
//   username: 'postgres',
//   password: 'p@ssw0rd',
//   port: 5432,
//   host: 'localhost',
//   database: 'nestjsm0',
//   synchronize: true,
//   migrations: ['dist/db/migrations/*.js'],
//   cli: { migrationsDir: 'src/db/migrations' },

//   entities: ['dist/**/*.entity{.ts,.js}'],
// };
// export default config;
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'P@ssw0rd@098',
  port: 5432,
  host: 'localhost',
  database: 'bonde',
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  cli: { migrationsDir: 'src/db/migrations' },

  entities: ['dist/**/*.entity{.ts,.js}'],
};
export default config;
