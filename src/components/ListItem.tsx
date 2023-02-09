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
        const lineRoutes = line.lines;
        if (lineRoutes) {
          lineRoutes.map(async (route) => {
            const response = await axios.get(
              `https://data.mobilites-m.fr/api/routers/default/index/routes?codes=${route}`
            );
            const data = await response.data;
            console.log(data);
            const error = await data.error;
            if (error) {
              console.log(error);
            }
            setRoutes((routes) => [...routes, data[0]]);
          });
        } else {
          setRoutes([]);
          console.log("No routes");
        }
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
    }, 30000);
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
        <p key={time.realtimeArrival}>
          {timeDifference > 0 ? timeDifference : "0"} minutes
        </p>
      );
    });
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
                  // href={`/line/${r.id}`}
                  href={"/"}
                >
                  {route.shortName}
                </a>
              );
            })
          : null}
      </div>
      <div className="list-item__direction">
        {stops
          ? stops.map((stop, index) => {
              return (
                <h3 className="list-item__title" key={stop.pattern.id}>
                  {stop.pattern.lastStopName}
                </h3>
              );
            })
          : null}
        <p className="list-item__subtitle">{line.name}</p>
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
      </div>
    </IonLabel>
  );
};

export default ListItem;
