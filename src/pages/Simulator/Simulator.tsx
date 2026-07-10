import Section from "../../components/Section";
import useTrackLineStore from "../../stores/useTrackLineStore";
import type { SectionType, StationYard, Train } from "../../types/data";

import { useEffect } from "react";
const Simulator = () => {
  const trackLine: (StationYard | SectionType)[] = useTrackLineStore(
    (state) => state.trackLine,
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const removed: number[] = [];
      const state = useTrackLineStore.getState();
      const updateTrainsState: Train[] = state.trains.map((train) => {
        if (train.presentSection === "section") {
          if (train.position === 13) {
            const nextTrack = state.trackLine[train.nextSectionId];
            if (nextTrack.type === "section") {
              return nextTrack.occupied
                ? { ...train }
                : (removed.push(train.currentSectionId),
                  {
                    ...train,
                    currentSectionId: train.currentSectionId + 1,
                    nextSectionId: train.nextSectionId + 1,
                    position: 0,
                  });
            }
            if (nextTrack.type === "station") {
              return nextTrack.homeSection.occupied
                ? { ...train }
                : (removed.push(train.currentSectionId),
                  {
                    ...train,
                    position: 0,
                    currentSectionId: train.currentSectionId + 1,
                    nextSectionId: train.nextSectionId + 1,
                    presentSection: "home",
                  });
            }
            return { ...train };
          } else {
            return { ...train, position: train.position + 1 };
          }
        } else {
          if (train.presentSection === "home") {
            if (train.position != 3) {
              return { ...train, position: train.position + 1 };
            } else {
              const nextloop = state.trackLine[train.currentSectionId];
              if (nextloop.type === "station") {
                const nextloopsection = nextloop.tracks.findIndex(
                  (user) => user.entry === true,
                );
                return {
                  ...train,
                  position: 0,
                  presentSection: "loop",
                  track: nextloopsection,
                };
              }
              return { ...train };
            }
          }
          if (train.presentSection === "loop") {
            if (train.position !== 7) {
              return { ...train, position: train.position + 1 };
            } else {
              const nextloop = state.trackLine[train.currentSectionId];
              if (nextloop.type === "station" && train.track !== undefined) {
                return nextloop.tracks[train.track].exit
                  ? { ...train, presentSection: "outer", position: 0 }
                  : { ...train };
              } else {
                return { ...train };
              }
            }
          }
          if (train.presentSection === "outer") {
            if (train.position === 1) {
              const nextloop = state.trackLine[train.currentSectionId];
              if (nextloop.type === "station") {
                return nextloop.outerSection.occupied
                  ? { ...train }
                  : { ...train, position: train.position + 1 };
              }
              return { ...train };
            } else if (train.position === 3) {
              const nextTrack = state.trackLine[train.nextSectionId];
              if (nextTrack.type === "section") {
                return nextTrack.occupied
                  ? { ...train }
                  : (removed.push(train.currentSectionId),
                    {
                      ...train,
                      currentSectionId: train.currentSectionId + 1,
                      nextSectionId: train.nextSectionId + 1,
                      position: 0,
                      presentSection: "section",
                    });
              }
            } else {
              return { ...train, position: train.position + 1 };
            }
          }

          return train;
        }
      });

      const UpdateTrackLIne: (StationYard | SectionType)[] =
        state.trackLine.map((track, index) => {
          const updatedTrackState = updateTrainsState.filter(
            (train) => train !== undefined && train.currentSectionId === index,
          );

          if (updatedTrackState.length > 0 && updatedTrackState[0]) {
            if (track.type === "section") {
              return {
                ...track,
                trainId: updatedTrackState[0].id,
                occupiedBy: updatedTrackState[0].position,
                occupied: true,
              };
            } else if (track.type === "station") {
              if (updatedTrackState[0].presentSection === "home") {
                return {
                  ...track,
                  homeSection: {
                    ...track.homeSection,
                    trainId: updatedTrackState[0].id,
                    occupiedBy: updatedTrackState[0].position,
                    occupied: true,
                  },
                };
              } else if (
                updatedTrackState[0].presentSection === "loop" &&
                updatedTrackState[0].track !== undefined
              ) {
                return {
                  ...track,
                  tracks: track.tracks.map((t, i) =>
                    i === updatedTrackState[0].track
                      ? {
                          ...t,
                          trainId: updatedTrackState[0].id,
                          occupiedBy: updatedTrackState[0].position,
                          occupied: true,
                        }
                      : t,
                  ),
                };
              } else if (updatedTrackState[0].presentSection === "outer") {
                return {
                  ...track,
                  outerSection: {
                    ...track.outerSection,
                    trainId: updatedTrackState[0].id,
                    occupiedBy: updatedTrackState[0].position,
                    occupied: true,
                  },
                };
              }
            }
          } else {
            if (removed.includes(index)) {
              if (track.type === "section") {
                return {
                  ...track,
                  trainId: null,
                  occupied: false,
                  occupiedBy: -1,
                };
              } else if (track.type === "station") {
                return {
                  ...track,
                  homeSection: {
                    ...track.homeSection,
                    trainId: null,
                    occupied: false,
                    occupiedBy: -1,
                  },
                  outerSection: {
                    ...track.outerSection,
                    trainId: null,
                    occupied: false,
                    occupiedBy: -1,
                  },
                  tracks: track.tracks.map((t) => ({
                    ...t,
                    trainId: null,
                    occupied: false,
                    occupiedBy: -1,
                  })),
                };
              }
            } else {
              return { ...track };
            }
          }
          return track;
        });

      useTrackLineStore.setState({
        trackLine: UpdateTrackLIne,
        trains: updateTrainsState,
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-row gap-4 p-4 flex-wrap">
      {trackLine.map((track, index) => {
        if (track.type === "section")
          return (
            <div className="flex flex-row items-center gap-2" key={index}>
              <div className="flex flex-col items-center gap-2">
                <Section
                  length={track.length}
                  signalColor={track.occupied ? "red" : "green"}
                  occupiedBy={track.occupiedBy}
                />
              </div>
            </div>
          );
        if (track.type === "station")
          return (
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <Section
                  length={track.homeSection.length}
                  signalColor={track.homeSection.occupied ? "red" : "green"}
                  occupiedBy={track.homeSection.occupiedBy}
                />
              </div>
              <div className="flex flex-col items-center gap-2" key={index}>
                <div className="flex flex-col items-center gap-2">
                  <Section
                    length={track.tracks[0].length}
                    signalColor={track.tracks[0].occupied ? "red" : "green"}
                    occupiedBy={track.tracks[0].occupiedBy}
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Section
                    length={track.tracks[1].length}
                    signalColor={track.tracks[1].occupied ? "red" : "green"}
                    occupiedBy={track.tracks[1].occupiedBy}
                  />
                </div>{" "}
                <div className="flex flex-col items-center gap-2">
                  <Section
                    length={track.tracks[2].length}
                    signalColor={track.tracks[2].occupied ? "red" : "green"}
                    occupiedBy={track.tracks[2].occupiedBy}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Section
                  length={track.outerSection.length}
                  signalColor={track.outerSection.occupied ? "red" : "green"}
                  occupiedBy={track.outerSection.occupiedBy}
                />
              </div>
            </div>
          );
      })}
    </div>
  );
};

export default Simulator;
