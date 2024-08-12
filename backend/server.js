const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let vehicleLocation = { lat: 40.712776, lng: -74.005974 };
let route = [
  { lat: 40.712776, lng: -74.005974 },
  { lat: 40.713776, lng: -74.004974 },
  { lat: 40.714776, lng: -74.003974 },
];

app.get('/api/vehicle-location', (req, res) => {
  
  vehicleLocation = {
    lat: vehicleLocation.lat + 0.0001,
    lng: vehicleLocation.lng + 0.0001,
  };
  route.push(vehicleLocation);

  res.json({ location: vehicleLocation, route });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
