import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 40.712776, 
  lng: -74.005974,
};

function VehicleMap() {
  const [vehiclePosition, setVehiclePosition] = useState(center);
  const [route, setRoute] = useState([]);

  const fetchVehicleData = useCallback(async () => {
    try {
      const response = await axios.get('/api/vehicle-location');
      const { location, route } = response.data;
      setVehiclePosition(location);
      setRoute(route);
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchVehicleData, 5000); 
    return () => clearInterval(interval);
  }, [fetchVehicleData]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={vehiclePosition}
        zoom={15}
      >
        <Marker position={vehiclePosition} icon="https://res.cloudinary.com/dqyqjbuku/image/upload/v1723446485/sport-car_iik4u0.png" />
        <Polyline path={route} options={{ strokeColor: '#FF0000' }} />
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(VehicleMap);
