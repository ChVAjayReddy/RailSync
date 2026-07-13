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
              return nextTrack.homeSection.occupied
                ? { ...train }
                : {
                    ...train,
                    position: 0,
                    currentSectionId: train.currentSectionId + 1,
                    nextSectionId: train.nextSectionId + 1,
                    presentSection: "home",
                  };
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
            if (train.position !== 3) {
              return { ...train, position: train.position + 1 };
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
          if (updatedValues.length > 0) {
            if (track.type === "section") {
              const activeTrain = updatedValues[0];
              if (activeTrain) {
                return {
                  ...track,
                  trainId: activeTrain.id,
                  occupiedBy: activeTrain.position,
                  occupied: true,
                };
              } else {
                return {
                  ...track,
                  trainId: null,
                  occupiedBy: -1,
                  occupied: false,
                };
              }
            }
            if (track.type === "station") {
              const homeTrain = updatedValues.find(
                (train) => train.presentSection === "home",
              );
              const outerTrain = updatedValues.find(
                (train) => train.presentSection === "outer",
              );
              const loopTrains = updatedValues.filter(
                (train) => train.presentSection === "loop",
              );

              return {
                ...track,
                homeSection: homeTrain
                  ? {
                      ...track.homeSection,
                      occupiedBy: homeTrain.position,
                      occupied: true,
                    }
                  : {
                      ...track.homeSection,
                      occupiedBy: -1,
                      occupied: false,
                    },
                outerSection: outerTrain
                  ? {
                      ...track.outerSection,
                      occupiedBy: outerTrain.position,
                      occupied: true,
                    }
                  : {
                      ...track.outerSection,
                      occupiedBy: -1,
                      occupied: false,
                    },
                tracks: track.tracks.map((loopTrack, index) => {
                  const matchingTrain = loopTrains.find(
                    (train) => train.track === index,
                  );
                  return matchingTrain
                    ? {
                        ...loopTrack,
                        occupiedBy: matchingTrain.position,
                        occupied: true,
                      }
                    : {
                        ...loopTrack,
                        occupiedBy: -1,
                        occupied: false,
                      };
                }),
              };
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
              };
            }
          }

          return track;
        });

      useTrackLineStore.setState({
        trackLine: UpdateTrackLIne,
        trains: afterRemovedTrain,
      });
    }, 100);

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
                    signalColor={track.tracks[0].exit ? "green" : "red"}
                    occupiedBy={track.tracks[0].occupiedBy}
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Section
                    length={track.tracks[1].length}
                    signalColor={track.tracks[1].exit ? "green" : "red"}
                    occupiedBy={track.tracks[1].occupiedBy}
                  />
                </div>{" "}
                <div className="flex flex-col items-center gap-2">
                  <Section
                    length={track.tracks[2].length}
                    signalColor={track.tracks[2].exit ? "green" : "red"}
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
