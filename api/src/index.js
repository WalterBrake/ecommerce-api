//Get the express service
import express from "express";
var fs = require("fs"); //for file system
var morgan = require("morgan"); //HTTP request logger middleware
var path = require("path"); //the path
var rfs = require("rotating-file-stream"); //logger
var bodyParser = require("body-parser");

const app = express();

//get the cors
var cors = require("cors");

//use cors
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//log file
var logDirectory = path.join(__dirname, "../../log");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream
const accessLogStream = rfs.createStream("access.log", {
  size: "5M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
  path: logDirectory,
});

// setup the logger
app.use(
  morgan("common", {
    stream: accessLogStream,
  })
);

import { strategy, authorization } from './controllers/utils.controlelr';



strategy()

//Importing Routes
import userRoutes from "./routes/user";
import shopRoutes from "./routes/shop";
import productRoutes from "./routes/product";
import shopcartRoutes from "./routes/shopcart";
import utilRoutes from './routes/utils'


//Parse application/json
app.use(
  bodyParser.json({
    limit: "15mb",
    extended: true,
  })
);

//Define the port
app.set("port", process.env.PORT || 4000);

//middlewares


//routes without authorization
app.use('/api/utils/', utilRoutes);


app.use(authorization());
//routes whit authorization
app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/products", productRoutes);
app.use("/api/shopcarts", shopcartRoutes);



//error handler
app.use((req, res, next) => {
  res.status(404);
  res.json({
    error: "Error. Endpoint not found",
    vervose: "d",
  });
});

app.use(function (err, req, res, next) {
  return res.status(500).send("Internal Server Occured");
});

app.listen(app.get("port"), () => {
  console.log("server is runnign", app.get("port"));
});
