import React, { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import ListItem from "../components/ListItem";
import { Stop } from "../models/Stop";
import { Cluster } from "../models/Cluster";
import "./Map.css";

const Map = () => {
  const [stop, setStop] = useState<Stop>();
  const [cluster, setCluster] = useState<Cluster>();

  const url =
    "https://data.mobilites-m.fr/api/routers/default/index/stops/SEM:2227/stoptimes/";
  const urlCluster =
    "https://data.mobilites-m.fr/api/routers/default/index/clusters/SEM:GENVALMY/stoptimes/";

  const fetchStop = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const error = await data.error;
    if (error) {
      console.log(error);
    }
    setStop(data[0]);
  };

  const fetchCluster = async () => {
    const response = await fetch(urlCluster);
    const data = await response.json();
    const error = await data.error;
    if (error) {
      console.log(error);
    }
    setCluster(data);
  };

  useEffect(() => {
    fetchStop();
    fetchCluster();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        {stop && <ListItem stop={stop} />}
        {cluster?.stops?.map((stop) => {
          return <ListItem stop={stop} />;
        })}
      </IonContent>
    </IonPage>
  );
};

export default Map;
