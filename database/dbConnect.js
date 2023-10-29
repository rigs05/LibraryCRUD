const mongoose = require('mongoose');

const dbConnect = async () => {
    await mongoose.connect(
        'mongodb://127.0.0.1:27017/libraryDB',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
}

module.exports = dbConnect;