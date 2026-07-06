export type Track = {
  id: number;
  name: string;
};

export type Station = {
  id: number;
  name: string;
};

export type Signal = {
  id: number;
  trackId: number;
  position: "start" | "end";
  color: "red" | "yellow" | "green";
};

export type Train = {
  id: number;
  name: string;
  trackId: number;
  position: number;
};
export const stations: Station[] = [
  {
    id: 1,
    name: "Station A",
  },
  {
    id: 2,
    name: "Station B",
  },
];

export const tracks: Track[] = [
  {
    id: 1,
    name: "Track 1",
  },
  {
    id: 2,
    name: "Track 2",
  },
  {
    id: 3,
    name: "Track 3",
  },
];
export const signals: Signal[] = [
  {
    id: 1,
    trackId: 1,
    position: "start",
    color: "green",
  },
  {
    id: 2,
    trackId: 1,
    position: "end",
    color: "red",
  },
  {
    id: 3,
    trackId: 2,
    position: "start",
    color: "green",
  },
  {
    id: 4,
    trackId: 2,
    position: "end",
    color: "green",
  },
  {
    id: 5,
    trackId: 3,
    position: "start",
    color: "yellow",
  },
  {
    id: 6,
    trackId: 3,
    position: "end",
    color: "red",
  },
];
export const trains: Train[] = [
  {
    id: 1,
    name: "Express 101",
    trackId: 1,
    position: 30,
  },
  {
    id: 2,
    name: "Passenger 202",
    trackId: 2,
    position: 65,
  },
];
export const trackLength = 14;
export const signalPositions = {
  start: 0,
  end: trackLength,
};
export const railwayLine = [
  { type: "track", data: { id: 1, name: "Track 1" } },
  { type: "track", data: { id: 2, name: "Track 2" } },
  { type: "track", data: { id: 3, name: "Track 3" } },
  { type: "station", data: { id: 1, name: "Station A" } },
  { type: "track", data: { id: 1, name: "Track 4" } },
  { type: "track", data: { id: 2, name: "Track 5" } },
  { type: "track", data: { id: 3, name: "Track 6" } },
  { type: "station", data: { id: 1, name: "Station B" } },
  { type: "track", data: { id: 1, name: "Track 7" } },
  { type: "track", data: { id: 2, name: "Track 8" } },
  { type: "track", data: { id: 3, name: "Track 9" } },
  { type: "station", data: { id: 1, name: "Station C" } },
];
