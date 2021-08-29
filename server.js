const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const User = db.user
const app = express();
const routes = require('./routes');

const PORT = process.env.PORT || 5000;

// Drop database
db.sequelize.sync({force: false}).then(() => {
    console.log('Drop and Resync with { force: true }');
});

app.use(cors());

//parsing requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//use routes
app.use('/api', routes);

// db.sequelize.sync().then(() => {
//     app.listen(5000, () => {
//         console.log(`Server listening on port ${PORT}`);
//     })
// });

var server = app.listen(8081, function () {
 
    var host = server.address().address
    var port = server.address().port
   
    console.log("App listening at http://%s:%s", host, port)
  })

