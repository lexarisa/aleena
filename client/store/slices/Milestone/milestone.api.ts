// const milestoneEvent = () => {
//     const source = new EventSource('http://localhost:3001/milestone/sse');
//     source.addEventListener('message', (message) => {
//       const event = JSON.parse(message.data).event;
//       const newMilestone = JSON.parse(message.data).data;

//       if (event === 'create') {
//         setMilestones((prevMilestones: any) => {
//           return [...prevMilestones, newMilestone];
//         });
//       }
//       if (event === 'delete') {
//         setMilestones((prevMilestones: any) => {
//           return prevMilestones.filter(
//             (milestone: IMilestone) => milestone.id !== newMilestone.id
//           );
//         });
//       }
//       if (event === 'update') {
//         setMilestones((prevMilestones: any) => {
//           return prevMilestones.map((milestone: IMilestone) => {
//             if (milestone.id === newMilestone.id) {
//               return (milestone = newMilestone);
//             } else {
//               return milestone;
//             }
//           });
//         });
//       }
//     });
//   };