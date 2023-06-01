import React from "react";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const HabitTracker = () => {
  const [habits, setHabits] = React.useState([]);

  const addHabit = () => {
    setHabits([
      ...habits,
      { name: "", frequency: "daily", startDate: "", endDate: "" },
    ]);
  };

  const updateHabit = (index, field, value) => {
    const updatedHabits = [...habits];
    updatedHabits[index][field] = value;
    setHabits(updatedHabits);
  };

  const removeHabit = (index) => {
    const updatedHabits = [...habits];
    updatedHabits.splice(index, 1);
    setHabits(updatedHabits);
  };

  const renderHabits = () => {
    return habits.map((habit, index) => (
      <div id="main" key={index}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Habit Name"
            variant="outlined"
          />
        </Box>
        <Select
          value={habit.frequency}
          onChange={(e) => updateHabit(index, "frequency", e.target.value)}
          label="Select Frequency"
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
        <input
          type="date"
          value={habit.startDate}
          onChange={(e) => updateHabit(index, "startDate", e.target.value)}
        />
        <input
          type="date"
          value={habit.endDate}
          onChange={(e) => updateHabit(index, "endDate", e.target.value)}
        />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
          />
        </Box>
        <Button variant="outlined" onClick={() => removeHabit(habit.id)}>
          Remove
        </Button>
      </div>
    ));
  };

  return (
    <div>
      <h1>Habit Tracker</h1>
      {renderHabits()}
      <Button variant="contained" onClick={addHabit}>
        Add Habit
      </Button>
    </div>
  );
};

export default HabitTracker;
