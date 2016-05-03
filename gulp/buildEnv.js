const argv = require('yargs').argv;
const path = require('path');

module.exports = {
  isDevel: () => argv.env === 'devel',

  distDir: 'dist',
  
  srcDir: 'src',
}
