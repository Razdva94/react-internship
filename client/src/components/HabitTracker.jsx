// import React from "react";
// import Button from "@mui/material/Button";
// import Select from "@mui/material/Select";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";

// const HabitTracker = () => {
//   const [form, setForm] = React.useState({ name: "", frequency: "daily", startDate: "", endDate: "", description: "" });
//   const [habits, setHabits] = React.useState([])

//   const save = () => {
//     setHabits(prev => [...prev, form])
//     localStorage.setItem("habits", JSON.stringify(habits))
//     console.log(localStorage.getItem("habits"))

//   };
//   const storageHabits = JSON.parse(localStorage.getItem("habits")) || []
//   return (
//     <div>
//       <h1>Habit Tracker</h1>
//       <div style={{ display: 'flex', }}>
//         <div>
//           <div id="main">
//             <Box
//               component="form"
//               sx={{
//                 "& > :not(style)": { m: 1, width: "25ch" },
//               }}
//               noValidate
//               autoComplete="off"
//             >
//               <TextField
//                 id="outlined-basic"
//                 label="Habit Name"
//                 variant="outlined"
//                 onChange={(e) => setForm((prevForm) => ({ ...prevForm, name: e.target.value }))}

//               />
//             </Box>
//             <Select
//               value={form.frequency}
//               label="Select Frequency"
//               onChange={(e) => setForm((prevForm) => ({ ...prevForm, frequency: e.target.value }))}
//             >
//               <MenuItem value="daily">Daily</MenuItem>
//               <MenuItem value="weekly">Weekly</MenuItem>
//               <MenuItem value="monthly">Monthly</MenuItem>
//             </Select>
//             <input
//               type="date"
//               value={form.startDate}
//               onChange={(e) => setForm((prevForm) => ({ ...prevForm, startDate: e.target.value }))}

//             />
//             <input
//               type="date"
//               value={form.endDate}
//               onChange={(e) => setForm((prevForm) => ({ ...prevForm, endDate: e.target.value }))}

//             />
//             <Box
//               component="form"
//               sx={{
//                 "& > :not(style)": { m: 1, width: "25ch" },
//               }}
//               noValidate
//               autoComplete="off"
//             >
//               <TextField
//                 id="standard-basic"
//                 label="Description"
//                 variant="standard"
//                 onChange={(e) => setForm((prevForm) => ({ ...prevForm, description: e.target.value }))}

//               />
//             </Box>
//           </div>
//           <Button variant="contained" onClick={save}>
//             Save
//           </Button>
//         </div>
//         <div>{storageHabits.map((habit) => (<div>{habit.name}</div>))}</div>
//       </div>

//     </div>

//   );
// };


// // localStorage.setItem("habits", localStorage.getItem("habits"))
// export default HabitTracker;

import React from "react";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const HabitTracker = () => {
  const [form, setForm] = React.useState({
    name: "",
    frequency: "daily",
    startDate: "",
    endDate: "",
    description: ""
  });
  const [habits, setHabits] = React.useState([]);

  const save = () => {
    setHabits(prev => [...prev, form]);
    localStorage.setItem("habits", JSON.stringify([...habits, form]));
    localStorage.setItem("form", JSON.stringify(form));
    console.log(localStorage.getItem("habits"));
  };

  const deleteHabit = index => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  const storageHabits = JSON.parse(localStorage.getItem("habits")) || [];

  React.useEffect(() => {
    const storedForm = JSON.parse(localStorage.getItem("form")) || {};
    setForm(storedForm);
  }, []);

  return (
    <div>
      <h1>Habit Tracker</h1>
      <div style={{ display: "flex" }}>
        <div>
          <div id="main">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" }
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Habit Name"
                variant="outlined"
                onChange={(e) =>
                  setForm(prevForm => ({ ...prevForm, name: e.target.value }))
                }
                value={form.name}
              />
            </Box>
            <Select
              value={form.frequency}
              label="Select Frequency"
              onChange={(e) =>
                setForm(prevForm => ({ ...prevForm, frequency: e.target.value }))
              }
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) =>
                setForm(prevForm => ({ ...prevForm, startDate: e.target.value }))
              }
            />
            <input
              type="date"
              value={form.endDate}
              onChange={(e) =>
                setForm(prevForm => ({ ...prevForm, endDate: e.target.value }))
              }
            />
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" }
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Description"
                variant="standard"
                onChange={(e) =>
                  setForm(prevForm => ({ ...prevForm, description: e.target.value }))
                }
                value={form.description}
              />
            </Box>
          </div>
          <Button variant="contained" onClick={save}>
            Save
          </Button>
        </div>
        <div>
          {storageHabits.map((habit, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <div style={{ fontWeight: "bold" }}>{habit.name}</div>
              <div>Frequency: {habit.frequency}</div>
              <div>Start Date: {habit.startDate}</div>
              <div>End Date: {habit.endDate}</div>
              <div>Description: {habit.description}</div>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteHabit(index)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
