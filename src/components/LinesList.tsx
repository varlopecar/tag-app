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
      {lines.map((line, index) => {
        return <ListItem key={index} line={line} />;
      })}
    </IonList>
  );
};

export default LinesList;
