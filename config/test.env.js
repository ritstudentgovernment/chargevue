var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  AUTH_METHOD: '"LDAP"' // Switch to LDAP | SHIB
})
