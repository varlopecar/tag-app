import { useState, useEffect } from "react";
import { Geolocation, Position } from "@capacitor/geolocation";

export const useGetLocation = () => {
  const [location, setLocation] = useState<Position>();

  useEffect(() => {
    const load = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      setLocation(coordinates);
    };
    load();
  }, []);

  return { location };
};
