import 'reflect-metadata';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const baseDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASS ?? '',
  database: process.env.DB_NAME ?? 'my_sales',
  entities: [`./src/modules/**/infra/database/entities/*.{ts,js}`],
  migrations: [`./src/shared/infra/typeorm/migrations/*.{ts,js}`],
};

const appTestDataSourceOptions: DataSourceOptions = {
  ...baseDataSourceOptions,
  database: process.env.DB_NAME_TEST ?? 'my_sales_test',
};

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === 'test'
    ? appTestDataSourceOptions
    : baseDataSourceOptions
);
