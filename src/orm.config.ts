// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
const config: PostgresConnectionOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'Evlina@1990',
  port: 5432,
  host: 'localhost',
  database: 'nestjsm',
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  cli: { migrationsDir: 'src/db/migrations' },

  entities: ['dist/**/*.entity{.ts,.js}'],
};
export default config;
