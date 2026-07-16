// const UpdateTrackLIne: (StationYard | SectionType)[] = state.trackLine.map(
//   (track, index) => {
//     const updatedValues: Train[] = afterRemovedTrain.filter(
//       (train) => train.currentSectionId === index,
//     );
//     if (updatedValues.length > 0) {
//       if (track.type === "section") {
//         const activeTrain = updatedValues[0];
//         if (activeTrain) {
//           return {
//             ...track,
//             trainId: activeTrain.id,
//             occupiedBy: activeTrain.position,
//             occupied: true,
//           };
//         } else {
//           return {
//             ...track,
//             trainId: null,
//             occupiedBy: -1,
//             occupied: false,
//           };
//         }
//       }
//       if (track.type === "station") {
//         const homeTrain = updatedValues.find(
//           (train) => train.presentSection === "home",
//         );
//         const outerTrain = updatedValues.find(
//           (train) => train.presentSection === "outer",
//         );
//         const loopTrainsEntry = updatedValues.filter(
//           (train) => train.presentSection === "entry",
//         );
//         const loopTrainsExit = updatedValues.filter(
//           (train) => train.presentSection === "exit",
//         );

//         return {
//           ...track,
//           homeSection: homeTrain
//             ? {
//                 ...track.homeSection,
//                 occupiedBy: homeTrain.position,
//                 occupied: homeTrain.position > 0 ? true : false,
//               }
//             : {
//                 ...track.homeSection,
//                 occupiedBy: -1,
//                 occupied: false,
//               },
//           outerSection: outerTrain
//             ? {
//                 ...track.outerSection,
//                 occupiedBy: outerTrain.position,
//                 occupied: false,
//               }
//             : {
//                 ...track.outerSection,
//                 occupiedBy: -1,
//                 occupied: false,
//               },
//           tracks: track.tracks.map((loop, index) => {
//             const tempEntry = loopTrainsEntry.filter(
//               (looptrain) => looptrain.track === index,
//             );
//             const tempExit = loopTrainsExit.filter(
//               (looptrain) => looptrain.track === index,
//             );

//             return {
//               entry: {
//                 ...loop.entry,
//                 occupied: tempEntry.length > 0,
//                 occupiedBy: tempEntry[0]?.position ?? -1,
//               },
//               exit: {
//                 ...loop.exit,
//                 occupied: tempExit.length > 0,
//                 occupiedBy: tempExit[0]?.position ?? -1,
//               },
//             };
//           }),
//         };
//       }
//     } else {
//       if (track.type === "section") {
//         return {
//           ...track,
//           trainId: null,
//           occupiedBy: -1,
//           occupied: false,
//         };
//       }
//       if (track.type === "station") {
//         return {
//           ...track,
//         };
//       }
//     }

//     return track;
//   },
// );
