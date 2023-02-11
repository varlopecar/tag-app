import React from "react";
import { IonList } from "@ionic/react";
import { Line } from "../models/Line";
import ListItem from "./ListItem";
import "./LinesList.scss";

interface LinesListProps {
  lines: Line[];
}

const LinesList = ({ lines }: LinesListProps) => {
  const linesList = lines.map((line) => {
    return {
      id: line.latitude,
      zone: line.zone,
      lines: line.lines,
      name: line.name,
    };
  });

  // eliminate duplicates
  const uniqueLinesList = linesList.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.lines[0] === thing.lines[0] &&
          t.zone === thing.zone &&
          t.name === thing.name
      )
  );

  console.log("uniqueLinesList", uniqueLinesList);

  return (
    <IonList>
      {uniqueLinesList.map((element) => {
        return element.lines.map((line) => {
          return (
            <ListItem
              key={element.id}
              line={line}
              zone={element.zone}
              name={element.name}
            />
          );
        });
      })}
    </IonList>
  );
};

export default LinesList;
