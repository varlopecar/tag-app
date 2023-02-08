import React, { useEffect, useState, useCallback } from "react";
import { IonContent, IonLoading, IonPage } from "@ionic/react";
import { Line } from "../models/Line";
import LinesList from "../components/LinesList";
import "./Map.css";
import { Geolocation, Position } from "@capacitor/geolocation";

const Map = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [lines, setLines] = useState<Line[]>([] as Line[]);
  const [position, setPosition] = useState<Position | null>();

  const getLocation = async () => {
    setLoading(true);
    try {
      const position = await Geolocation.getCurrentPosition();
      setPosition(position);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchNearLines = useCallback(
    async (position: Position | null | undefined) => {
      if (position) {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://data.mobilites-m.fr/api/linesNear/json?x=5.74488583065511&y=45.187568079076065&dist=400&details=true`
          );
          const data = await response.json();          
          const error = await data.error;
          if (error) {
            console.log(error);
          }
          setLines(data);
        } catch (error) {
          console.log(error);
        }
      }
    },
    []
  );

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    fetchNearLines(position);
  }, [position, fetchNearLines]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonLoading
          isOpen={loading}
          message={"Getting location..."}
          onDidDismiss={() => setLoading(false)}
        />
        <LinesList lines={lines} />
      </IonContent>
    </IonPage>
  );
};

export default Map;
