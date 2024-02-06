const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;
connectDb();
app.use(cors());
// middleware
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'))

app.use('/api/search', require('./routes/searchRoutes') )

app.use(errorHandler)

app.listen(port, ()=>{
    console.log("Server started on the port : ", port);
})
