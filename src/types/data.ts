export type SectionType = {
  type: "section" | "home" | "outer" | "loop" | "entry" | "exit";
  length: number;
  trainId: number | null;
  occupied: boolean;
  occupiedBy: number;
};
export type LoopType = {
  type: "section" | "home" | "outer" | "loop1" | "loop2";
  length1: number;
  trainId: number | null;
  occupied1: boolean;
  occupiedBy1: number;
  occupied2: boolean;
  occupiedBy2: number;
  length2: number;
};
export type loopTrack = { entry: SectionType; exit: SectionType };

export type StationYard = {
  type: "station";
  name: string;
  homeSection: SectionType;
  outerSection: SectionType;
  tracks: loopTrack[];
};
export type Train = {
  id: number;
  presentSection: "section" | "home" | "outer" | "loop" | "entry" | "exit";
  currentSectionId: number;
  nextSectionId: number;
  position: number;
  track: number | null;
  insideLoop?: number;
};

export type TrackLineState = {
  trackLine: (StationYard | SectionType)[];
  startTrain: () => void;
  trains: Train[];
  runningSections: number[];
  blockedSections: number[];
  cautionSections: number[];
  handleStationSignals: (index: number, type: string, track: number) => void;
};
