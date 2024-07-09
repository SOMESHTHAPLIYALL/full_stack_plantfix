const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute");
const blogRoutes = require("./routes/blogRoutes");
const imageRoutes = require("./routes/imageRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/image", imageRoutes);

app.listen(8080, () => {
  console.log("Server Running");
});
