require('dotenv').config();
var dbConfig = require('./db-config');
var apiConfig = {
  dbPath: dbConfig.DB_URL
}

module.exports = apiConfig;