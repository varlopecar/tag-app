import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IonLabel } from "@ionic/react";
import { useFetch } from "../hooks/useFetch";
import { Route } from "../models/Route";
import { Stop } from "../models/Stop";
import { Line } from "../models/Line";
import "./ListItem.scss";

interface ListItemProps {
  line: string;
  zone: string;
  name: string;
}

const ListItem = ({ line, zone, name }: ListItemProps) => {
  const zoneFormatted = zone.replace("_", ":");
  const [routes, setRoutes] = useState<Route[]>([] as Route[]);
  const [stops, setStops] = useState<Stop[]>([] as Stop[]);
  const { data: dataRoutes, loading: loadingRoutes } = useFetch(
    `https://data.mobilites-m.fr/api/routers/default/index/routes?codes=${line}`
  );
  const { data: dataStops, loading: loadingStops } = useFetch(
    `https://data.mobilites-m.fr/api/routers/default/index/clusters/${zoneFormatted}/stoptimes?route=${line}`
  );

  useEffect(() => {
    if (dataRoutes) {
      setRoutes(dataRoutes);
    }
  }, [dataRoutes]);

  useEffect(() => {
    if (dataStops) {
      setStops(dataStops);
    }
    setTimeout(() => {
      if (dataStops) {
        console.log("dataStops", dataStops);
        setStops(dataStops);
      }
    }, 30000);
  }, [dataStops]);

  function toHoursAndMinutes(totalSeconds: any) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { h: hours, m: minutes, s: seconds };
  }

  const timesArray = stops.map((stop) => {
    return stop.times.map((time) => {
      const arrivalTime = toHoursAndMinutes(time.realtimeArrival);
      const now = new Date();
      const nowTime = toHoursAndMinutes(now.getTime() / 1000);
      const timeDifference = arrivalTime.m - nowTime.m;

      return (
        <p key={time.realtimeArrival}>
          {timeDifference > 0 ? timeDifference : "0"} minutes
        </p>
      );
    });
  });

  const filteredStops = stops.filter((stop) => {
    return stop.times.length > 0;
  });

  return (
    <IonLabel className="list-item">
      <div className="list-item__routes">
        {routes
          ? routes.map((route, index) => {
              return (
                <a
                  key={index}
                  className="line-icon"
                  style={{ backgroundColor: `#${route.color}` }}
                  href={`/route/${route.id}`}
                >
                  {route.shortName}
                </a>
              );
            })
          : null}
        <p className="list-item__subtitle">{name}</p>
      </div>
      <div className="list-item__direction">
        {stops
          ? filteredStops.map((stop) => {
              return (
                <h3 className="list-item__title" key={stop.pattern.id}>
                  {stop.pattern.lastStopName}
                </h3>
              );
            })
          : null}
          {stops.length === 0 ? <p className="list-item__title">No data</p> : null}
      </div>
      <div className="list-item__times">
        {timesArray
          ? timesArray.map((time, index) => {
              return (
                <div className="list-item__time" key={index}>
                  {time[0]}
                </div>
              );
            })
          : null}
          {stops.length === 0 ? <p className="list-item__time">No data</p> : null}
      </div>
    </IonLabel>
  );
};

export default ListItem;
