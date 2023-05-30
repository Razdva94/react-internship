import React from 'react';
import Button from '@mui/material/Button';

function HabitList({ habits, removeHabit }) {
    return (
        <ul>
            {habits.map((habit) => (
                <li key={habit.id}>
                    {habit.name}
                    <Button variant="contained" onClick={() => removeHabit(habit.id)}>Remove</Button>
                </li>
            ))}
        </ul>
    );
}

export default HabitList;