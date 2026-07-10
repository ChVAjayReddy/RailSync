export type SectionType = {
  type: "section" | "home" | "outer" | "loop";
  length: number;
  trainId: number | null;
  occupied: boolean;
  occupiedBy: number;
};
export type LoopType = {
  type: "section" | "home" | "outer" | "loop";
  length: number;
  trainId: number | null;
  occupied: boolean;
  occupiedBy: number;
  entry: boolean;
  exit: boolean;
};

export type StationYard = {
  type: "station";
  name: string;
  homeSection: SectionType;
  outerSection: SectionType;
  tracks: LoopType[];
};
export type Train = {
  id: number;
  presentSection: "section" | "home" | "outer" | "loop";
  currentSectionId: number;
  nextSectionId: number;
  position: number;
  track?: number;
};

export type TrackLineState = {
  trackLine: (StationYard | SectionType)[];
  startTrain: () => void;
  trains: Train[];
  runningSections: number[];
  blockedSections: number[];
  cautionSections: number[];
};
