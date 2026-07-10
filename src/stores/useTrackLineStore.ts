import { create } from "zustand";
import type { TrackLineState, Train } from "../types/data";

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
        occupied: false,
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
}));
export default useTrackLineStore;
