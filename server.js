const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoutes");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleware/errorMiddlware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

//routes
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
  console.log(res);
});

//error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER LISTENING ON PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
