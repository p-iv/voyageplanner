const fs = require("fs");

exports.createTrip = (req, res) => {
  const newTrip = req.body;

  fs.readFile(`${__dirname}/data/tripData.json`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read data" });
    }

    let existingTrips = [];

    try {
      existingTrips = JSON.parse(data);
      if (!Array.isArray(existingTrips)) existingTrips = [];
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to parse data" });
    }

    existingTrips.push(newTrip);

    fs.writeFile(
      `${__dirname}/data/tripData.json`,
      JSON.stringify(existingTrips, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to write data" });
        }

        res.status(201).json({
          status: "success",
          data: {
            tripData: existingTrips,
          },
        });
      }
    );
  });
};
