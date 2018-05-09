
// const http = require('http');
// const app = require('./app');

// const port = process.env.PORT || 3000;

// const server = http.createServer(app);

// server.listen(port);

// console.log(`Server listening at port ${port}`);


const express = require("express");
const http = require('http');
const path = require("path")
const bodyParser = require('body-parser')
const apiRouter = require('./api/routes/contacts')

const app = express();

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

const assetsPath = path.resolve(__dirname, 'views/assets')
app.use(express.static(assetsPath))

// ! important: to parse request JSON as req.body
app.use(bodyParser.json({ type: 'application/json' }))

app.get('/', (req, res) => {
    res.render('home')
})

app.use('/api/routes/contacts', apiRouter)

http.createServer().listen(3000)

console.log('App started on 3000...')