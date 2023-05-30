import React, { useState } from 'react';

function HabitForm({ addHabit }) {
    const [habitName, setHabitName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (habitName.trim() !== '') {
            const habit = {
                id: new Date().getTime(),
                name: habitName,
            };
            addHabit(habit);
            setHabitName('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter habit name"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
            />
            <button type="submit">Add Habit</button>
        </form>
    );
}

export default HabitForm;
