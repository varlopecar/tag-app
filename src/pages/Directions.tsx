import React, { useState, useEffect, useCallback } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Directions.scss";
import axios from "axios";
import AsyncSelect from "react-select/async";

const Directions = () => {
  const [from, setFrom] = React.useState("");
  const [stops, setStops] = React.useState<any>({});
  const [to, setTo] = React.useState("");

  const fetchStops = useCallback(async (from: string) => {
    const response = await axios.get(
      `https://data.mobilites-m.fr/api/points/json?types=pointArret&query=${from}`
    );
    setStops(response.data);
    console.log(response);
  }, []);

  const handleChanges = (event: any) => {
    console.log(event.target.value);
    setFrom(event.target.value);
    fetchStops(event.target.value);
  };

  const loadOptions = (inputValue: string, callback: any) => {
    setTimeout(() => {
      callback([
        { value: "one", label: "One" },
        { value: "two", label: "Two" },
      ]);
    }, 1000);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Directions</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardContent>
            {/* async ionselect with fethc api */}
            <IonItem fill="outline">
              <IonSelect
                placeholder="From"
                value={from}
                style={{ width: "100%" }}
              >
                <IonItem fill="outline">
                  <IonInput
                    placeholder="From"
                    type="text"
                    className="input-form"
                    value={from}
                    onIonChange={handleChanges}
                  />
                </IonItem>
              </IonSelect>
            </IonItem>
            <IonItem fill="outline" style={{ marginTop: "10px" }}>
              <IonInput
                placeholder="To"
                type="text"
                className="input-form"
                value={to}
                onIonChange={handleChanges}
              />
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonItem fill="outline">
              <IonInput placeholder="Date" type="date" />
            </IonItem>
            <IonItem fill="outline" style={{ marginTop: "10px" }}>
              <IonSelect placeholder="Preference">
                <IonSelectOption value="before">Arrive ahead</IonSelectOption>
                <IonSelectOption value="after">Leave after</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem fill="outline" style={{ marginTop: "10px" }}>
              <IonInput placeholder="Time" type="time" />
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonCardHeader>
              <IonCardTitle>Mode</IonCardTitle>
            </IonCardHeader>
            <IonGrid>
              <IonChip>Tram / Bus</IonChip>
              <IonChip>Car</IonChip>
              <IonChip>Bike</IonChip>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Directions;
