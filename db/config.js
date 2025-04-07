const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://postgres:postgresql@localhost:5432/rospand_accounts'
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Connection error', err.stack));

module.exports = client;
