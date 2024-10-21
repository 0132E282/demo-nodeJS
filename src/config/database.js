const mongoose = require('mongoose');

async function  connect(){
    try {
      await  mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
            {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            })
            .then(() => console.log('Mongodb connected success !'));
    } catch (error) {
        console.log('Mongodb connected error!')
    }
}
module.exports = {connect};