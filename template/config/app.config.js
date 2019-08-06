'use strict'

const  prodEnv = require('./app.config.prd')
const  devEnv = require('./app.config.dev')
const  qaEnv = require('./app.config.qa')
const  betaEnv = require('./app.config.beta')
const  bugfixEnv = require('./app.config.bugfix')

console.log('环境变量: ' + process.env.NODE_ENV);

let AppConfig;
switch (process.env.NODE_ENV) {
  case 'production':
    AppConfig = prodEnv.default
    break;
  case 'development':
    AppConfig = devEnv.default
    break;
  case 'testing':
    AppConfig = qaEnv.default
    break;
  case 'bugfix':
    AppConfig = bugfixEnv.default
    break;  
  case 'beta':
    AppConfig = betaEnv.default
    break;  
  default:
    AppConfig
}

export default AppConfig

