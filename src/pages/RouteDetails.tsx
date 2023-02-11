import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { download } from "ionicons/icons";
import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Route } from "../models/Route";
import "./RouteDetails.scss";

interface RouteDetailsProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const RouteDetails: React.FC<RouteDetailsProps> = ({ match }) => {
  const [route, setRoute] = useState<Route>({} as Route);

  const fetchRoute = useCallback(async () => {
    if (!match.params.id) {
      return;
    }
    try {
      const response = await axios.get(
        `https://data.mobilites-m.fr/api/routers/default/index/routes?codes=${match.params.id}`
      );
      const data = await response.data;
      const error = await data.error;
      if (error) {
        console.log(error);
      }
      setRoute(data[0]);
    } catch (error) {
      console.log(error);
    }
  }, [match.params.id]);

  const fetchPdf = useCallback(async () => {
    if (!route) {
      return;
    }
    try {
      const response = await fetch(
        `https://data.mobilites-m.fr/api/planligne/pdf?route=${route.id}`
      )
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.target = "_blank";
          a.download = `${route.longName}.pdf`;
          a.click();
        });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [route]);

  useEffect(() => {
    fetchRoute();
  }, [fetchRoute]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Route detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <div className="route-details-header">
                <p>Route</p>
                <span
                  className="line-icon"
                  style={{ backgroundColor: `#${route.color}` }}
                >
                  {route.shortName}
                </span>
              </div>
            </IonCardTitle>
            <IonCardSubtitle>
              <p>Type: {route.mode}</p>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonLabel>{route.longName}</IonLabel>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton onClick={fetchPdf} fill="outline">
                    <IonIcon icon={download} />
                    Line's plan
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default RouteDetails;
