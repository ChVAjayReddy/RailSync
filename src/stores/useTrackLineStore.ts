import { create } from "zustand";
import type { TrackLineState, Train, loopTrack } from "../types/data";

const useTrackLineStore = create<TrackLineState>((set) => ({
  trackLine: [
    {
      type: "section",
      length: 14,
      trainId: null,
      occupied: false,
      occupiedBy: -1,
    },

    {
      type: "station",
      name: "A",
      homeSection: {
        type: "home",
        length: 4,
        trainId: null,
        occupied: true,
        occupiedBy: -1,
      },
      outerSection: {
        type: "outer",
        length: 4,
        trainId: null,
        occupied: false,
        occupiedBy: -1,
      },
      tracks: [
        {
          entry: {
            type: "entry",
            length: 4,
            trainId: null,
            occupied: true,
            occupiedBy: -1,
          },
          exit: {
            type: "exit",
            length: 4,
            trainId: null,
            occupied: true,
            occupiedBy: -1,
          },
        },
        {
          entry: {
            type: "entry",
            length: 4,
            trainId: null,
            occupied: true,
            occupiedBy: -1,
          },
          exit: {
            type: "exit",
            length: 4,
            trainId: null,
            occupied: true,
            occupiedBy: -1,
          },
        },
        {
          entry: {
            type: "entry",
            length: 4,
            trainId: null,
            occupied: true,
            occupiedBy: -1,
          },
          exit: {
            type: "exit",
            length: 4,
            trainId: null,
            occupied: true,
            occupiedBy: -1,
          },
        },
      ],
    },
    {
      type: "section",
      length: 14,
      trainId: null,
      occupied: false,
      occupiedBy: -1,
    },
    {
      type: "section",
      length: 14,
      trainId: null,
      occupied: false,
      occupiedBy: -1,
    },
    {
      type: "section",
      length: 14,
      trainId: null,
      occupied: false,
      occupiedBy: -1,
    },
    {
      type: "section",
      length: 14,
      trainId: null,
      occupied: false,
      occupiedBy: -1,
    },
    {
      type: "section",
      length: 14,
      trainId: null,
      occupied: false,
      occupiedBy: -1,
    },
    {
      type: "station",
      name: "A",
      homeSection: {
        type: "home",
        length: 4,
        trainId: null,
        occupied: true,
        occupiedBy: -1,
      },
      outerSection: {
        type: "outer",
        length: 4,
        trainId: null,
        occupied: false,
        occupiedBy: -1,
      },
      tracks: [
        {
          entry: {
            type: "entry",
            length: 4,
            trainId: null,
            occupied: true,
            occupiedBy: -1,
          },
          exit: {
            type: "exit",
            length: 4,
            trainId: null,
            occupied: true,
            occupiedBy: -1,
          },
        },
        {
          entry: {
            type: "entry",
            length: 4,
            trainId: null,
            occupied: true,
            occupiedBy: -1,
          },
          exit: {
            type: "exit",
            length: 4,
            trainId: null,
            occupied: true,
            occupiedBy: -1,
          },
        },
        {
          entry: {
            type: "entry",
            length: 4,
            trainId: null,
            occupied: true,
            occupiedBy: -1,
          },
          exit: {
            type: "exit",
            length: 4,
            trainId: null,
            occupied: true,
            occupiedBy: -1,
          },
        },
      ],
    },
    {
      type: "section",
      length: 14,
      trainId: null,
      occupied: false,
      occupiedBy: -1,
    },
    {
      type: "section",
      length: 14,
      trainId: null,
      occupied: false,
      occupiedBy: -1,
    },
    {
      type: "section",
      length: 14,
      trainId: null,
      occupied: false,
      occupiedBy: -1,
    },
  ],
  trains: [],
  runningSections: [],
  blockedSections: [],
  cautionSections: [],
  alertMessage: "",
  setAlertMessage: (message: string) => set({ alertMessage: message }),
  startTrain: () => {
    const temp = useTrackLineStore.getState().trackLine[0];
    if (temp.type === "section" && temp.occupied) {
      set({
        alertMessage:
          "Train is already running in section can't allow another train to pass",
      });
    } else {
      const newTrain: Train = {
        id: Date.now(),
        currentSectionId: 0,
        presentSection: "section",
        nextSectionId: 1,
        position: -1,
        track: null,
      };
      set((state) => ({
        trains: [...state.trains, newTrain],
      }));
    }
  },
  handleStationSignals: (index: number, type: string, trackIndex: number) => {
    const line = useTrackLineStore.getState().trackLine[index];
    if (line.type === "station") {
      if (type === "home") {
        const checkLoopTracks = line.tracks.filter(
          (loop) => loop.entry.occupied === false,
        );
        if (checkLoopTracks.length === 1) {
          const updateTrackLine = useTrackLineStore
            .getState()
            .trackLine.map((track, ind) => {
              return track.type === "station"
                ? ind === index
                  ? {
                      ...track,
                      homeSection: {
                        ...track.homeSection,
                        occupied: track.homeSection.occupied ? false : true,
                      },
                    }
                  : { ...track }
                : { ...track };
            });
          set({ trackLine: updateTrackLine });
        } else {
          console.log("first select track then select home signal");
        }
      } else {
        if (type === "entry") {
          const temp = useTrackLineStore.getState().trackLine[index];
          if (temp.type === "station" && temp.homeSection.occupiedBy != -1) {
            set({
              alertMessage:
                "One train already running in the home section can't allow another train to pass",
            });

            return;
          }
          if (
            temp.type === "station" &&
            (temp.tracks[trackIndex].entry.occupiedBy != -1 ||
              temp.tracks[trackIndex].exit.occupiedBy != -1)
          ) {
            set({
              alertMessage:
                "train is already present in loop track you selected, choose another track to pass the train",
            });
            return;
          }

          if (temp.type === "station") {
            if (
              temp.homeSection.occupied ===
              temp.tracks[trackIndex].entry.occupied
            ) {
              const updateTrackLine = useTrackLineStore
                .getState()
                .trackLine.map((track, ind) => {
                  return track.type === "station"
                    ? ind === index
                      ? {
                          ...track,
                          homeSection: {
                            ...track.homeSection,
                            occupied: track.homeSection.occupied ? false : true,
                          },
                          tracks: track.tracks.map((loop, lIndex) => {
                            return lIndex === trackIndex
                              ? {
                                  ...loop,

                                  entry: {
                                    ...loop.entry,
                                    occupied: track.tracks[lIndex].entry
                                      .occupied
                                      ? false
                                      : true,
                                  },
                                }
                              : { ...loop };
                          }),
                        }
                      : { ...track }
                    : { ...track };
                });

              set({ trackLine: updateTrackLine });
            } else {
              set({
                alertMessage:
                  "Already one loop track is selected to pass the train,can't allow to select two loop tracks at a time",
              });
            }
          }
        }
        if (type === "exit") {
          const temp = useTrackLineStore.getState().trackLine[index];

          if (temp.type === "station") {
            const count: loopTrack[] = temp.tracks.filter(
              (loop) => !loop.exit.occupied,
            );
            const countIndex = temp.tracks.findIndex(
              (loop) => !loop.exit.occupied,
            );
            if (temp.outerSection.occupiedBy !== -1) {
              set({
                alertMessage:
                  "One train already running in the outer section of the station can't allow another train to pass",
              });
              return;
            } else {
              if (count.length === 1 && trackIndex !== countIndex) {
                set({
                  alertMessage:
                    "can't allow two trains to leave station at a time, which may lead to collision",
                });
              } else {
                const updateTrackLine = useTrackLineStore
                  .getState()
                  .trackLine.map((track, ind) => {
                    return track.type === "station"
                      ? ind === index
                        ? {
                            ...track,

                            tracks: track.tracks.map((loop, lIndex) => {
                              return lIndex === trackIndex
                                ? {
                                    ...loop,

                                    exit: {
                                      ...loop.exit,
                                      occupied: track.tracks[lIndex].exit
                                        .occupied
                                        ? false
                                        : true,
                                    },
                                  }
                                : { ...loop };
                            }),
                          }
                        : { ...track }
                      : { ...track };
                  });

                set({ trackLine: updateTrackLine });
              }
            }
          }
        }
      }
    }
  },
}));
export default useTrackLineStore;
