const chalk = require('chalk');
module.exports = ( value, color = 'white') => {
    console.log(chalk[color](value))
}