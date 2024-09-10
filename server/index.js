const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const googleMapsApiRouter = require("./routes/googleMapsApiRoutes");
const tripRouter = require("./routes/tripRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/api/googleMapsApi", googleMapsApiRouter);
app.use("/api/trips", tripRouter);

mongoose
  .connect(
    "mongodb+srv://pavloiv00:aEaQTfxS76xN7eum@voyageplannercluster.ioau7.mongodb.net/voyageplanner?retryWrites=true&w=majority&appName=voyageplannerCluster"
  )
  .then(() => console.log("DB connection successful"));

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
