const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dns = require("node:dns/promises")

dotenv.config();
const googleMapsApiRouter = require("./routes/googleMapsApiRoutes");
const tripRouter = require("./routes/tripRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
const corsOptions = {
  origin: "https://voyageplanner.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/api/googleMapsApi", googleMapsApiRouter);
app.use("/api/trips", tripRouter);
app.use("/api/users", userRouter);

dns.setServers(["1.1.1.1", "8.8.8.8"])

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connection successful"))
    .catch((err) => console.log(`Dtabase error ${err}`));

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
