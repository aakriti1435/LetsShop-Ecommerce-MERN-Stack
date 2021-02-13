const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
env.config();


//Mongodb Connectivity
mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.3uivu.mongodb.net/${process.env.MONGODB_DATABASENAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log('Mongodb Database Connected');
}).catch((error) => console.log(error.message));


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