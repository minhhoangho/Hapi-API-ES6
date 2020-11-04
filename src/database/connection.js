import Knex from 'knex';
import Pg from 'pg';
import knexFile from '../../knexfile';

Pg.types.setTypeParser(20, 'text', parseInt);
Pg.types.setTypeParser(1700, 'text', parseInt);

const environment = process.env.NODE_ENV || 'development';
const knex = knexFile[environment];
const connection = Knex(knex);

export default connection;
