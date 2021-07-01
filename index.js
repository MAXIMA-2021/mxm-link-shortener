require('dotenv').config();
const express = require('express')
const app = express()

const connection = require('./config/db.config')
connection.once('open', () => console.log('Connected to MongoDB Atlas'));
connection.on('error', () => console.log('Error connecting to MongoDB'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/redirect')(app);
require('./routes/add_link.routes')(app);
app.use('/', async(req,res) => {
  res.redirect('https://maxima.umn.ac.id');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`));