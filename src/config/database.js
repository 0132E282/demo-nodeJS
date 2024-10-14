const mongoose = require('mongoose');

async function  connect(){
    try {
      await  mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
            {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            })
            .then(() => console.log('Connected success !'));
    } catch (error) {
        console.log('Connected error!')
    }
}
module.exports = {connect};