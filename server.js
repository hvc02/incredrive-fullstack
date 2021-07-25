// Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const authRouter = require("./routes/authentication");

// App config
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors({ credentials: true }));

// app.get("/api/customers", cors(), (req, res) => {
//   const customers = [
//     { id: 1, firstName: "John", lastName: "Doe" },
//     { id: 2, firstName: "Brad", lastName: "Brad" },
//     { id: 3, firstName: "Mary", lastName: "Swanson" },
//   ];

//   res.json(customers);
// });

// Database connection
mongoose
  .connect(keys.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", () => console.log("Connection error"));
db.once("open", () =>
  console.log("Database connection established successfully")
);

// Routes
app.use("/api/auth", authRouter);

// Listener
app.listen(port, () => console.log(`Listening on port: ${port}`));
