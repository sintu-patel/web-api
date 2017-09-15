var userDomain = process.env.USERDOMAIN;
var env = 'PROD';
if (userDomain === 'SAPIENT') {
	env = 'DEV';
}
var apiConfig = {
  dbPath: 'mongodb://localhost/CMS'
}
if (env === 'PROD') {
	apiConfig.dbPath = 'mongodb://admin:JHLHGBETTDJGQHNS@sl-us-south-1-portal.8.dblayer.com:22286,sl-us-south-1-portal.6.dblayer.com:22286/admin?ssl=true';
}

module.exports = apiConfig;