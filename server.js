const express = require('express');
const dotenv = require('dotenv');
var cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());

// Database
const db = require('./config/database');


db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))


app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// Routes
app.use('/user', require('./routes/user_routes'));
app.use('/employee', require('./routes/employee_routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

