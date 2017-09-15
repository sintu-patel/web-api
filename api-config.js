var userDomain = process.env.USERDOMAIN;
var env = 'PROD';
if (userDomain === 'SAPIENT') {
	env = 'DEV';
}
var apiConfig = {
  dbPath: 'mongodb://localhost/CMS'
}
if (env === 'PROD') {
	apiConfig.dbPath = 'mongodb://10.203.101.151/CMS';
}

module.exports = apiConfig;