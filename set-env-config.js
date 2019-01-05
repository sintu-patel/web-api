require('dotenv');
var fs = require('fs');
const DB_URL = process.env.DB_URL || 'mongodb://localhost/CMS';

var fileContent = `
// Host Configuration
var dbConfig = {
    DB_URL: '${DB_URL}'
}
module.exports = dbConfig;
`;

var dbConfigFile = 'db-config.js';
fs.writeFileSync(dbConfigFile, fileContent, "utf8");