import { create } from "zustand";
import type { StationYard, TrackLineState, Train } from "../types/data";

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
          type: "loop",
          length: 8,
          trainId: null,
          occupied: true,
          occupiedBy: -1,
          entry: false,
          exit: false,
        },
        {
          type: "loop",
          length: 8,
          trainId: null,
          occupied: true,
          occupiedBy: -1,
          entry: false,
          exit: false,
        },
        {
          type: "loop",
          length: 8,
          trainId: null,
          occupied: true,
          occupiedBy: -1,
          entry: false,
          exit: false,
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
          type: "loop",
          length: 8,
          trainId: null,
          occupied: true,
          occupiedBy: -1,
          entry: false,
          exit: false,
        },
        {
          type: "loop",
          length: 8,
          trainId: null,
          occupied: true,
          occupiedBy: -1,
          entry: false,
          exit: false,
        },
        {
          type: "loop",
          length: 8,
          trainId: null,
          occupied: true,
          occupiedBy: -1,
          entry: false,
          exit: false,
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
      };
      set((state) => ({
        trains: [...state.trains, newTrain],
      }));
    }
  },
  handleStationSignals: (
    _track: StationYard,
    position: number,
    type: string | number,
    signal?: string,
  ) => {
    const line = useTrackLineStore.getState().trackLine[position];
    if (line.type === "station") {
      if (type === "home") {
        const checkLoopTracks = line.tracks.filter(
          (track) => track.entry === true || track.exit === true,
        );
        if (checkLoopTracks.length === 1) {
          const updateTrackLine = useTrackLineStore
            .getState()
            .trackLine.map((track, index) => {
              return track.type === "station"
                ? index === position
                  ? {
                      ...track,
                      homeSection: { ...track.homeSection, occupied: false },
                    }
                  : { ...track }
                : { ...track };
            });
          set({ trackLine: updateTrackLine });
        } else {
          console.log("first select track then select home signal");
        }
      } else {
        if (line.homeSection.occupiedBy === -1) {
          const updateTrackLine = useTrackLineStore
            .getState()
            .trackLine.map((track, index) => {
              return track.type === "station"
                ? index === position
                  ? {
                      ...track,
                      tracks: track.tracks.map((loopTrack, index) => {
                        return index === type
                          ? {
                              ...loopTrack,
                              exit: signal === "exit" ? true : false,
                              entry:
                                signal === "entry" || signal === "exit"
                                  ? true
                                  : false,
                            }
                          : { ...loopTrack };
                      }),
                    }
                  : { ...track }
                : { ...track };
            });
          set({ trackLine: updateTrackLine });
        } else {
          console.log("already train running in home secion can't give signal");
        }
      }
    }
  },
}));
export default useTrackLineStore;
