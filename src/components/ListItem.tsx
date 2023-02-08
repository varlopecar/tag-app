import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IonLabel, IonList } from "@ionic/react";
import { Route } from "../models/Route";
import { Stop } from "../models/Stop";
import { Line } from "../models/Line";
import "./ListItem.scss";

interface ListItemProps {
  line: Line;
}

const ListItem = ({ line }: ListItemProps) => {
  const [routes, setRoutes] = useState<Route[]>([] as Route[]);
  const [stops, setStops] = useState<Stop[]>([] as Stop[]);

  const fetchRoutes = useCallback(async () => {
    if (line) {
      try {
        const response = await fetch(
          `https://data.mobilites-m.fr/api/routers/default/index/stops/${line.id}/routes`
        );
        const data = await response.json();
        // separate the data into two arrays if
        setRoutes(data as Route[]);
      } catch (error) {
        console.log(error);
      }
    }
  }, [line]);

  const fetchStops = useCallback(async () => {
    if (line) {
      try {
        const response = await axios.get(
          `https://data.mobilites-m.fr/api/routers/default/index/stops/${line.id}/stoptimes`,
          {
            params: {
              startTime: "2021-03-01T00:00:00Z",
              timeRange: 86400,
            },
          }
        );
        const data = await response.data;
        setStops(data as Stop[]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [line]);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  useEffect(() => {
    fetchStops();
    setInterval(() => {
      fetchStops();
    }, 10000);
  }, [fetchStops]);

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
        <p key={time.stopId}>
          {timeDifference > 0 ? timeDifference : "0"} minutes
        </p>
      );
    });
  });

  return (
    <IonLabel className="list-item">
      {/* <div className="list-item__routes">
        {routes.map((route) => {
          return (
            <a
              key={route.id}
              className="line-icon"
              style={{ backgroundColor: `#${route.color}` }}
              // href={`/line/${r.id}`}
              href={"/"}
            >
              {route.shortName}
            </a>
          );
        })}
      </div>*/}
      <div className="list-item__direction">
        {stops.map((stop) => {
          return (
            <h3 className="list-item__title" key={stop.pattern.id}>
              {stop.pattern.lastStopName}
            </h3>
          );
        })}
        <p className="list-item__subtitle">{line.name}</p>
      </div>
      <div className="list-item__times">
        {timesArray.map((time, index) => {
          return (
            <div className="list-item__time" key={index}>
              {time}
            </div>
          );
        })}
      </div>
    </IonLabel>
  );
};

export default ListItem;
