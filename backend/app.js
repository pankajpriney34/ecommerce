const express = require('express');
const cors = require('cors');  //Allow Angular (localhost:4200) to talk to Node (localhost:5000)
const bodyParser = require('body-parser');  // Read JSON form data from req.body in Express
const connectDB = require('./config/db'); // import db connect file
const orderRoutes = require('./routes/orderRoutes'); // import routes file

//connect to express js
const app = express();
//Allow incoming requests from other origins (like your Angular frontend at http://localhost:4200) — don't block them just because they’re not from the same domain.->  Access-Control-Allow-Origin: *
app.use(cors());
// data we get from api we need to parse it
app.use(bodyParser.json());

//now conencting to db that we import
connectDB();

app.use('/api', orderRoutes);  //use first api of orders //API :http://localhost:5000/api/orders

app.get('/',(req, res)=>{
    res.send('Backend is Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Backend running on port: ${PORT}`);
});