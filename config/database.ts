import { ConnectionOptions } from 'typeorm';

const resolveFilePath = (folderName: string): string => {
  return process.env.NODE_ENV === 'production' ? `out/${folderName}/*.js` : `src/${folderName}/*.ts`;
};

const dbconfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "32865417",
  database: "keepAccounts",
  
  migrationsRun: false,
  synchronize: false,
  logging: ['error'],
  maxQueryExecutionTime: 5000,
  entities: [
    resolveFilePath('entity'),
  ],

};

export default dbconfig;