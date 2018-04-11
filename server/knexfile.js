// Update with your config settings.
const path = require(`path`);


module.exports = {
  development: {
  client: 'pg',
  connection: {
  host : '127.0.0.1',
  user : 'kanbanboard_user',
  password : 'password',
  database : 'kanbanboard',
  charset: 'utf8'
     }, 
  debug: true,
  migrations: {
  directory: __dirname + '/db/migrations',
     }
   }
 };