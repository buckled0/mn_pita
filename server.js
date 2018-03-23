const mongoose          = require('mongoose');
mongoose.Promise = Promise;

const { port, dbUrl }   = require('./config/config');
const app               = require('./app');

mongoose.connect(dbUrl()).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

app.listen(port(), () => {
    console.log(`We're live on port ${port()}`);
});

module.exports = app
