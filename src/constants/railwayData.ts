export type Section = {
  id: number;
  length: number;
  occupied: boolean;
  occupiedBy?: number;
  signalId?: number;
  signalColor: "red" | "yellow" | "green";
  signalType: "section" | "home" | "outer" | "up" | "down" | "main";
  stationId: number;
};
export type StationYard = {
  id: number;
  name: string;
  numberOfTrainsOccupied: number;
  homeSignalSection: Section;
  outerSignalSection: Section;
  upLineSections: Section;
  downLineSections: Section;
  mainLineSections: Section;
};

export type Station = {
  id: number;
  name: string;
  stationYard: StationYard;
  noofSectionsBeforeYard: number;
  noofSectionsAfterYard: number;
  SectionsBeforeYard: Section[];
  SectionsAfterYard: Section[];
};

export const trackLine: Station[] = [
  {
    id: 0,
    name: "A",
    SectionsBeforeYard: [
      {
        id: 1,
        length: 14,
        occupied: false,
        occupiedBy: -1,
        signalId: 1,
        signalType: "section",
        signalColor: "green",
        stationId: 1,
      },
      {
        id: 2,
        length: 14,
        occupied: false,
        occupiedBy: -1,
        signalId: 1,
        signalType: "section",
        signalColor: "green",
        stationId: 1,
      },
    ],
    SectionsAfterYard: [
      {
        id: 3,
        length: 14,
        occupied: false,
        occupiedBy: -1,
        signalId: 1,
        signalType: "section",
        signalColor: "green",
        stationId: 1,
      },
      {
        id: 4,
        length: 14,
        occupied: false,
        occupiedBy: -1,
        signalId: 1,
        signalType: "section",
        signalColor: "green",
        stationId: 1,
      },
    ],
    noofSectionsAfterYard: 2,
    noofSectionsBeforeYard: 2,
    stationYard: {
      id: 1,
      name: "A",
      numberOfTrainsOccupied: 0,
      homeSignalSection: {
        id: 3,
        length: 2,
        occupied: false,
        occupiedBy: -1,
        signalId: 2,
        signalType: "home",
        signalColor: "green",
        stationId: 1,
      },
      outerSignalSection: {
        id: 3,
        length: 2,
        occupied: false,
        occupiedBy: -1,
        signalId: 2,
        signalType: "outer",
        signalColor: "red",
        stationId: 1,
      },
      mainLineSections: {
        id: 3,
        length: 10,
        occupied: false,
        occupiedBy: -1,
        signalId: 2,
        signalType: "main",
        signalColor: "red",
        stationId: 1,
      },
      upLineSections: {
        id: 3,
        length: 10,
        occupied: false,
        occupiedBy: -1,
        signalId: 2,
        signalType: "up",
        signalColor: "red",
        stationId: 1,
      },
      downLineSections: {
        id: 3,
        length: 10,
        occupied: false,
        occupiedBy: -1,
        signalId: 2,
        signalType: "down",
        signalColor: "red",
        stationId: 1,
      },
    },
  },
  {
    id: 1,
    name: "A",
    SectionsBeforeYard: [
      {
        id: 1,
        length: 14,
        occupied: false,
        occupiedBy: -1,
        signalId: 1,
        signalType: "section",
        signalColor: "green",
        stationId: 1,
      },
      {
        id: 2,
        length: 14,
        occupied: false,
        occupiedBy: -1,
        signalId: 1,
        signalType: "section",
        signalColor: "green",
        stationId: 1,
      },
    ],
    SectionsAfterYard: [
      {
        id: 5,
        length: 14,
        occupied: false,
        occupiedBy: -1,
        signalId: 1,
        signalType: "section",
        signalColor: "green",
        stationId: 1,
      },
      {
        id: 6,
        length: 14,
        occupied: false,
        occupiedBy: -1,
        signalId: 1,
        signalType: "section",
        signalColor: "green",
        stationId: 1,
      },
    ],
    noofSectionsAfterYard: 2,
    noofSectionsBeforeYard: 2,
    stationYard: {
      id: 1,
      name: "A",
      numberOfTrainsOccupied: 0,
      homeSignalSection: {
        id: 3,
        length: 2,
        occupied: false,
        occupiedBy: -1,
        signalId: 2,
        signalType: "home",
        signalColor: "green",
        stationId: 1,
      },
      outerSignalSection: {
        id: 3,
        length: 2,
        occupied: false,
        occupiedBy: -1,
        signalId: 2,
        signalType: "outer",
        signalColor: "red",
        stationId: 1,
      },
      mainLineSections: {
        id: 3,
        length: 10,
        occupied: false,
        occupiedBy: -1,
        signalId: 2,
        signalType: "main",
        signalColor: "red",
        stationId: 1,
      },
      upLineSections: {
        id: 3,
        length: 10,
        occupied: false,
        occupiedBy: -1,
        signalId: 2,
        signalType: "up",
        signalColor: "red",
        stationId: 1,
      },
      downLineSections: {
        id: 3,
        length: 10,
        occupied: false,
        occupiedBy: -1,
        signalId: 2,
        signalType: "down",
        signalColor: "red",
        stationId: 1,
      },
    },
  },
];
