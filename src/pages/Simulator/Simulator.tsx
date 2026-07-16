import Section from "../../components/Section";
import useTrackLineStore from "../../stores/useTrackLineStore";
import type { SectionType, StationYard, Train } from "../../types/data";
import Station from "../../components/Station";

import { useEffect } from "react";
const Simulator = () => {
  const trackLine: (StationYard | SectionType)[] = useTrackLineStore(
    (state) => state.trackLine,
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const removedTrains: number[] = [];
      const state = useTrackLineStore.getState();
      const updateTrainsState: Train[] = state.trains.map((train) => {
        if (train.presentSection === "section") {
          if (train.position === 13) {
            const nextTrack = state.trackLine[train.nextSectionId];

            if (!nextTrack) {
              removedTrains.push(train.id);

              return train;
            }

            if (nextTrack.type === "section") {
              return nextTrack.occupied
                ? { ...train }
                : {
                    ...train,
                    currentSectionId: train.currentSectionId + 1,
                    nextSectionId: train.nextSectionId + 1,
                    position: 0,
                  };
            }
            if (nextTrack.type === "station") {
              const nextSection = state.trackLine[train.nextSectionId];
              if (nextSection.type === "station") {
                const nextloopsection = nextSection.tracks.findIndex(
                  (user) => user.entry.occupied === false,
                );
                return nextloopsection != -1
                  ? {
                      ...train,
                      position: 0,
                      currentSectionId: train.currentSectionId + 1,
                      nextSectionId: train.nextSectionId + 1,
                      presentSection: "home",
                      track: nextloopsection,
                    }
                  : { ...train };
              }
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
                  (user) => user.entry.occupied === false,
                );

                return {
                  ...train,
                  position: 0,
                  presentSection: "entry",
                  track: nextloopsection,
                };
              }
              return { ...train };
            }
          }
          if (train.presentSection === "entry") {
            if (train.position !== 3) {
              return { ...train, position: train.position + 1 };
            } else {
              return { ...train, position: 0, presentSection: "exit" };
            }
          }
          if (train.presentSection === "exit") {
            if (train.position !== 3) {
              return { ...train, position: train.position + 1 };
            } else {
              const presentLoop = state.trackLine[train.currentSectionId];

              if (presentLoop.type === "station") {
                if (
                  train.track === 0 ||
                  train.track === 1 ||
                  train.track === 2
                ) {
                  return presentLoop.tracks[train.track].exit.occupied
                    ? { ...train }
                    : { ...train, presentSection: "outer", position: 0 };
                }
              }
              return { ...train };
            }
          }
          if (train.presentSection === "outer") {
            if (train.position === 0) {
              return { ...train, position: train.position + 1 };
            } else if (train.position === 1 || train.position === 2) {
              return { ...train, position: train.position + 1, track: null };
            } else {
              const nextloop = state.trackLine[train.nextSectionId];
              if (nextloop.type === "section") {
                if (nextloop.occupied === true) {
                  return { ...train };
                } else {
                  return {
                    ...train,
                    position: 0,
                    currentSectionId: train.currentSectionId + 1,
                    nextSectionId: train.nextSectionId + 1,
                    presentSection: "section",
                  };
                }
              }
            }
          }

          return train;
        }
      });

      const afterRemovedTrain: Train[] = updateTrainsState.filter(
        (train) => !removedTrains.includes(train.id),
      );

      const UpdateTrackLIne: (StationYard | SectionType)[] =
        state.trackLine.map((track, index) => {
          const updatedValues: Train[] = afterRemovedTrain.filter(
            (train) => train.currentSectionId === index,
          );
          const activeTrain = updatedValues[0];
          if (updatedValues.length > 0 && activeTrain) {
            if (track.type === "section") {
              return {
                ...track,
                trainId: activeTrain.id,
                occupied: true,
                occupiedBy: activeTrain.position,
              };
            } else {
              if (track.type === "station") {
                const homeTrain = updatedValues.find(
                  (train) => train.presentSection === "home",
                );
                const outerTrain = updatedValues.find(
                  (train) => train.presentSection === "outer",
                );
                const loopTrainsEntry = updatedValues.filter(
                  (train) => train.presentSection === "entry",
                );
                const loopTrainsExit = updatedValues.filter(
                  (train) => train.presentSection === "exit",
                );
                return {
                  ...track,
                  homeSection: homeTrain
                    ? {
                        ...track.homeSection,
                        trainId: homeTrain.id,
                        occupiedBy: homeTrain.position,
                        occupied: homeTrain.position > 0,
                      }
                    : {
                        ...track.homeSection,
                        occupiedBy: -1,
                        trainId: null,
                      },
                  outerSection: outerTrain
                    ? {
                        ...track.outerSection,
                        trainId: outerTrain.id,
                        occupiedBy: outerTrain.position,
                      }
                    : {
                        ...track.outerSection,
                        trainId: null,
                        occupiedBy: -1,
                      },
                  tracks: track.tracks.map((loop, index) => {
                    const entryTrain = loopTrainsEntry.find(
                      (looptrack) => looptrack.track === index,
                    );
                    const exitTrain = loopTrainsExit.find(
                      (looptrack) => looptrack.track === index,
                    );
                    return {
                      ...loop,
                      entry: entryTrain
                        ? {
                            ...loop.entry,
                            trainId: entryTrain.id,
                            occupiedBy: entryTrain.position,
                            occupied: entryTrain.position !== 0,
                          }
                        : {
                            ...loop.entry,
                            occupiedBy: -1,
                            trainId: null,
                          },
                      exit: exitTrain
                        ? {
                            ...loop.exit,
                            trainId: exitTrain.id,
                            occupiedBy: exitTrain.position,
                          }
                        : {
                            ...loop.exit,
                            occupiedBy: -1,
                            trainId: null,
                            occupied:
                              outerTrain?.track === index
                                ? true
                                : loop.exit.occupied,
                          },
                    };
                  }),
                };
              }
            }
          } else {
            if (track.type === "section") {
              return {
                ...track,
                trainId: null,
                occupiedBy: -1,
                occupied: false,
              };
            }
            if (track.type === "station") {
              return {
                ...track,
                outerSection: { ...track.outerSection, occupiedBy: -1 },
              };
            }
          }
          return { ...track };
        });

      useTrackLineStore.setState({
        trackLine: UpdateTrackLIne,
        trains: afterRemovedTrain,
      });
    }, 1000);

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
          return <Station key={index} station={track} />;
      })}
    </div>
  );
};

export default Simulator;
