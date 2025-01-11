const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

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

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connection successful"));

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
