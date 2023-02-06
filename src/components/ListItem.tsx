import React from "react";
import { Stop } from "../models/Stop";
import "./ListItem.scss";

interface ListItemProps {
  stop: Stop;
}

const ListItem = ({ stop }: ListItemProps) => {
  function toHoursAndMinutes(totalSeconds: any) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { h: hours, m: minutes, s: seconds };
  }

  const timesArray = stop.times.map((time) => {
    const arrivalTime = toHoursAndMinutes(time.realtimeArrival);
    return (
      <p key={time.realtimeArrival}>
        {arrivalTime.h}h{arrivalTime.m}
      </p>
    );
  });

  return (
    <div className="list-item">
      <h1 className="list-item__title">{stop.pattern.lastStopName}</h1>
      <div>{timesArray}</div>
      <p>{stop.pattern.lastStopName}</p>
    </div>
  );
};

export default ListItem;
