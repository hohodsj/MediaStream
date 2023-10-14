const express = require('express')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const path = require('path')

const dbUrl = process.env.DB_URL || `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/`;
mongoose.connect(dbUrl, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, `Connection error:`));
db.once("open", () => {
    console.log("Database connected");
})

const app = express()
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res) => {
    res.render('index')
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})