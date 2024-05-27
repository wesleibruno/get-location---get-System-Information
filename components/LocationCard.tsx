import { useEffect, useState } from "react";
import axios from "axios";

const LocationCard = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const handleSuccess = async (position: GeolocationPosition) => {
      setLocation(position.coords);
      const { latitude, longitude } = position.coords;

      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
          params: {
            lat: latitude,
            lon: longitude,
            format: "json",
          },
        });

        const { road, suburb, city, town, state, country } = response.data.address;
        const formattedAddress = `${road || ''}, ${suburb || ''}, ${city || town || ''}, ${state || ''}, ${country || ''}`;
        setAddress(formattedAddress);
      } catch (error) {
        setError("Failed to retrieve address");
      }
    };

    const handleError = () => {
      setError("Unable to retrieve your location");
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">Your Location</h2>
        {error && <p className="text-red-500">{error}</p>}
        {location ? (
          <div>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
            {address && <p>Address: {address}</p>}
          </div>
        ) : (
          !error && <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
