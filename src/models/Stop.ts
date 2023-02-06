export interface Stop {
    pattern: {
        id: string;
        desc: string;
        dir: number;
        shortDesc: string;
        lastStop: string;
        lastStopName: string;
    },
    times: [
        {
            stopId: string;
            stopName: string;
            schedueledArrival: string;
            schedueledDeparture: string;
            realtimeArrival: string;
            realtimeDeparture: string;
            arriveDelay: number;
            timepoint: boolean;
            realtime: boolean;
            realtimeState: string;
            serviceDay: number;
            tripId: string;
            headsign: string;
            occupancy: string;
            occupancyId: number;
        },
    ]
}
