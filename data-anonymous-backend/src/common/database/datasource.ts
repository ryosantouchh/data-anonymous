import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'postgres',
  password: '1234',
  database: 'data_anonymous_db',
  migrations: ['dist/migrations/*.js'],
  entities: ['dist/domain/**/*.entity.js}'],
};

const connectionSource = new DataSource(dataSourceOptions);

export default connectionSource;
