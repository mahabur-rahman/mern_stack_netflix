const express = require("express");
const app = express();
const colors = require("colors");

// ROUTE
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

const dotenv = require("dotenv");

// dotenv config
dotenv.config();
const PORT = process.env.PORT || 5000;

// connected to db
const connectedDB = require("./db/connect");
connectedDB();

// middleware
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

// listen app
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
