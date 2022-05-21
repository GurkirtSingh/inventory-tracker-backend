require("dotenv").config();

const http = require("http");
const express = require("express");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/error");
const { json, urlencoded } = express;
const cors = require("cors");
const path = require("path");

const connectDB = require("./db");
connectDB();

// Routes
const itemRouter = require("./routes/item");
const warehouseRouter = require("./routes/warehouse");

const app = express();
const whitelist = ["http://localhost:3000", "https://inventory-tracker-app.gurkirtsingh.repl.co"];
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
const server = http.createServer(app);
if (process.env.NODE_ENV === "development") {
  server.listen(process.env.PORT, (err, res) => {
    if (err) return console.log(err);
    console.log("server is listening...");
  });
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use("/item", itemRouter);
app.use("/warehouse", warehouseRouter);

if (process.env.NODE_ENV === "production") {
  server.listen(process.env.PORT);

  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
}

app.use(notFound);
app.use(errorHandler);
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
module.exports = app;
