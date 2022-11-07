const userRoute = require("./routers/userRoute");
const productRoute = require("./routers/productRoute");
const categoryRoute = require("./routers/categoryRoute");
const port = 7000;
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Final project 3 tim 3" });
});

app.use(userRoute);
app.use(categoryRoute);
app.use(productRoute);

app.listen(port, () => {
  console.log(`Server berjalan di PORT ${port}`);
});
