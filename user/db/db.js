const mongoose = require('mongoose');
 
function connect() {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Connected to database');
    }).catch((error) => {
        console.log('Error connecting to database', error);
    });
}


module.exports = connect;