const express = require("express");
const path = require("path");
const { join, resolve } = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./app/config/dbCon");
const session = require("express-session");
const flash = require("connect-flash");
const ejsLayouts = require("express-ejs-layouts");
const cors = require("cors");
const utils = require("./app/helper/utils");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
connectDB();

const namedRouter = require("route-label")(app);
const appConfig = require(resolve(join(__dirname, "app/config", "index")));

/******************** Configuration Registration *******************/
const isProduction = appConfig.appRoot.isProd;
const getAdminFolderName = appConfig.appRoot.getAdminFolderName;
const getApiFolderName = appConfig.appRoot.getApiFolderName;

app.set("views", [
  path.join(__dirname, "./app/views"),
  path.join(__dirname, "./app/modules"),
]);
app.use(ejsLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/mainLayout");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use("", express.static(resolve(join(__dirname, "public"))));

global.generateUrl = generateUrl = (routeName, routeParams = {}) => {
  namedRouter.urlFor(routeName, routeParams);
};

app.use(
  session({
    cookie: {
      maxAge: 60000,
    },
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(cors());

// Middleware to make flash messages available globally in views
app.use((req, res, next) => {
  res.locals.successMessage = req.flash("success");
  res.locals.errorMessage = req.flash("error");
  next();
});

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  const port = getPort;
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(0);
      break;
    default:
      throw error;
  }
};

//for routes
(async () => {
  try {
    // -------admin folder route-------
    const adminApiFiles = await utils._readdir(
      `./app/router/${getAdminFolderName}`
    );
    const webApiFiles = await utils._readdir(
      `./app/router/${getApiFolderName}`
    );

    adminApiFiles.forEach((file) => {
      if (!file || file[0] == ".") return;
      namedRouter.use(require(join(__dirname, file)));
    });

    webApiFiles.forEach((file) => {
      if (!file || file[0] == ".") return;
      namedRouter.use("/api", require(join(__dirname, file)));
    });
  } catch (error) {
    console.log(error);
  }
})();

// Building the Route Tables for debugging
namedRouter.buildRouteTable();

if (!isProduction && process.env.SHOW_NAMED_ROUTES === "true") {
  console.log("xxx");

  const adminRouteList = namedRouter.getRouteTable("/admin");
  const apiRouteList = namedRouter.getRouteTable("/api");

  // Show both route tables simultaneously
  console.log("Admin Routes:", adminRouteList);
  console.log("Api Routes:", apiRouteList);
}

app.on("error", onError);

// console.log("first")
const port = process.env.PORT || 3300;

app.listen(port, () => {
  console.log(`Server is running start: http://localhost:${port}`);
});
