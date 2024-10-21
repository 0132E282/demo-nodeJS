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
        case '==':
              return value1 == value2;
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
    if(typeof value === 'object'){
      return Object.keys(value).length > 0;
    }else if (typeof value === 'array'){
      return value.length > 0;
    }else {
      return value !== undefined && value !== null
    }
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
  },

}