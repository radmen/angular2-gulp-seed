const argv = require('yargs').argv;
const process = require('process');

module.exports = {
  isDevel: () => argv.env === 'devel' || process.argv[2] === 'watch',

  distDir: 'dist',
  
  srcDir: 'src',
}
