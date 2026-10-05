import type { SectionType, Train, TrackLineState } from "../types/data";

type TrackLine = TrackLineState["trackLine"];

export const getTrainLocation = (train: Train, trackLine: TrackLine) => {
  const currentTrack = trackLine[train.currentSectionId];

  if (!currentTrack) return "Location unavailable";

  if (currentTrack.type === "station") {
    const platform =
      train.track === null ? "" : ` · Track ${train.track + 1}`;
    return `Station ${currentTrack.name}${platform}`;
  }

  const sectionNumber = trackLine
    .slice(0, train.currentSectionId + 1)
    .filter((track): track is SectionType => track.type === "section")
    .length;

  return `Section ${sectionNumber}`;
};
