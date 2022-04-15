import 'dotenv/config';
import mysql from 'mysql2/promise';
const env = process.env.NODE_ENV || 'production';
const multipleStatements = process.env.NODE_ENV === 'test';
const { MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_DATABASE_TEST } = process.env;

const mysqlConfig = {
    production: {
        // for EC2 machine
        host: MYSQL_HOST,
        user: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
    },
    development: {
        // for localhost development
        host: MYSQL_HOST,
        user: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
    },
    test: {
        // for automation testing (command: npm run test)
        host: MYSQL_HOST,
        user: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE_TEST,
    },
};

let mysqlEnv = mysqlConfig[env];
mysqlEnv.waitForConnections = true;
mysqlEnv.connectionLimit = 20;

const pool = mysql.createPool(mysqlEnv, { multipleStatements });

export { mysql, pool };