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
  startTrain: () => {
    const temp = useTrackLineStore.getState().trackLine[0];
    if (temp.type === "section" && temp.occupied) {
      console.log("train already running can't allow");
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
              console.log("Already one track given to enter");
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
              console.log("train running in outer can't allow train ");
              return;
            } else {
              if (count.length === 1 && trackIndex !== countIndex) {
                console.log("already one train give clerance can.t allow ");
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
