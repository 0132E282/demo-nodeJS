// config/handlebars-helpers.js
const moment = require('moment');
module.exports = {
   compare(value1, condition, value2 ){
    switch (condition) {
        case '>':
            return value1 > value2;
        case '<':
            return value1 < value2;
        case '===':
            return value1 === value2;
        case '!==':
            return value1 !== value2;
        case '>=':
            return value1 >= value2;
        case '<=':
            return value1 <= value2;
        default:
            throw new Error('Condition không hợp lệ'); 
    }
  },
  isdefined (value) {
    return value !== undefined;
  },
  forNumber(start, end, block) {
    var accum = '';
    for(var i = start; i < end; ++i){
        accum += block.fn(i);
    }
    return accum;
  },
  additionAllowed(a, b) {
    return a + b;
  },
  formatDate(date) {
    return moment(date).format('DD-MM-YYYY');
  }
}