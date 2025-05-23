const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
 
const app = express();
app.use(cors());
app.use(express.json());
 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
 
app.get("/", (req, res) => {
  res.send("API is running");
});

// Utilisation des routes externes
app.use("/api/auth", require("./routes/auth.routes"));
// Tu ajouteras ensuite :
app.use("/api/products", require("./routes/products.routes"));
app.use("/api/orders", require("./routes/orders.routes"));

 
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);