import React from "react";
import { IonList } from "@ionic/react";
import { Line } from "../models/Line";
import ListItem from "./ListItem";
import "./LinesList.scss";

interface LinesListProps {
  lines: Line[];
}

const LinesList = ({ lines }: LinesListProps) => {
  return (
    <IonList>
      {lines.map((line) => {
        return <ListItem key={line.id} line={line} />;
      })}
    </IonList>
  );
};

export default LinesList;
