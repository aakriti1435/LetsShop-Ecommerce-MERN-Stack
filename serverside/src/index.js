const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');


const app = express();
env.config();


//Middlewares
app.use(express.json());
// app.use(bodyParser());


//API Calls
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello Aakriti',
    })
});

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body,
    })
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
});