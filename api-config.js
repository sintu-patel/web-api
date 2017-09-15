var userDomain = process.env.USERDOMAIN;
var MONGODB_URL_TEST= 'mongodb://admin:JHLHGBETTDJGQHNS@sl-us-south-1-portal.8.dblayer.com:22286,sl-us-south-1-portal.6.dblayer.com:22286/admin?ssl=true';
var MONGODB_URL = 'mongodb://admin:JHLHGBETTDJGQHNS@sl-us-south-1-portal.8.dblayer.com:22286/CMS';
var env = 'PROD';
if (userDomain === 'SAPIENT') {
	env = 'DEV';
}
var apiConfig = {
  dbPath: 'mongodb://localhost/CMS'
}
if (env === 'PROD') {
	apiConfig.dbPath = MONGODB_URL;
}

module.exports = apiConfig;