const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
//const Data = require('Data');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan("tiny"));

//mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");
//app.set("views" , path.resolve(__dirname, "view/ejs"))

//load assets
app.use(`/css`, express.static(path.resolve(__dirname, `assets/css`)));
app.use(`/img`, express.static(path.resolve(__dirname, `assets/img`)));
app.use(`/js`, express.static(path.resolve(__dirname, `assets/js`)));

//load routers
app.use('/',require('./server/routes/router'))

//pagination
// app.get('/', (req, res) => {
//     const { page, limit } = req.body
//     const pageCount = Math.ceil(Data.length / limit);
//     if (!page) { page = 1;}
//     if (page > pageCount) {
//       page = pageCount
//     }
//     res.json({
//         "page": page,
//         "pageCount": Math.ceil(Data.length / limit),
//         "data": Data.slice(page*limit-limit, page*limit),
//     })
// })


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
