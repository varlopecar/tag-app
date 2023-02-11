import React, { useEffect, useState, useCallback } from "react";
import {
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Line } from "../models/Line";
import LinesList from "../components/LinesList";
import { useFetch } from "../hooks/useFetch";
import { useGetLocation } from "../hooks/useGetLocation";
import "./Map.css";

const Map = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [lines, setLines] = useState<Line[]>([] as Line[]);
  const { location } = useGetLocation();
  const {
    data: dataLines,
    error,
    loading: loadingLines,
  } = useFetch(
    `https://data.mobilites-m.fr/api/linesNear/json?x=${location?.coords.longitude}&y=${location?.coords.latitude}&dist=500&details=true`
  );

  useEffect(() => {
    if (dataLines) {
      setLines(dataLines);
      setLoading(false);
    }
  }, [dataLines]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
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
