const mongoose          = require('mongoose');

const { port, dbUrl }   = require('./config/config');
const app               = require('./app');

mongoose.connect(dbUrl());

app.listen(port(), () => {
    console.log(`We're live on port ${port()}`);    
});

module.exports = app