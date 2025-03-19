/* eslint-disable react/no-unescaped-entities */

import Challenge, { Instructions } from '@/components/Challenge';
import SuccessMessage from '@/components/SuccessMessage';
import { generateTodoList, TodoType } from '@/utils/TodoGenerator';
import { Stack, Button, FormControlLabel, Checkbox, Grid2, LinearProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';


export default function RepetitionPage() {

    return <>
        <Typography my={1}>
            On this page, your task is to complete repetitive tasks efficiently using your automation tool.
        </Typography>

        <Stack gap={2} mt={2}>
            <ManyBoxesChallenge />
            <CounterChallenge />
        </Stack >
    </>;
}


function ManyBoxesChallenge() {
    const MIN_COUNT = 45;
    const MAX_COUNT = 55;

    const [todos, setBoxes] = useState<TodoType[]>([]);

    const checkedBoxes = todos.filter(todo => todo.completed).length;
    const allBoxesChecked = todos.length > 0 && checkedBoxes === todos.length;

    useEffect(() => {
        const count = MIN_COUNT + Math.ceil(Math.random() * (MAX_COUNT - MIN_COUNT));
        setBoxes(generateTodoList(count));
    }, []);

    function toggleBox(target: TodoType): void {
        setBoxes(todos => todos.map((todo) => todo.id === target.id ? { ...target, completed: !target.completed } : todo));
    }

    return (
        <Challenge title="Check all the boxes">
            <Instructions>
                All of the following {todos.length} tasks need to be marked as completed to pass this challenge.
                The number of tasks and checkboxes and their initial states vary, so make sure to check all of them
                and not uncheck any 🙃. The todo texts are not guaranteed to beunique, so make sure to check all
                of them regardless of their text.
            </Instructions>
            <Instructions>
                Use your automation tool to check all of them at once or one by one. After checking all of them, assert
                that a success message appears.
            </Instructions>
            <Instructions>
                Currently completed {checkedBoxes} out of {todos.length} tasks.
            </Instructions>

            <LinearProgress variant="determinate" value={(checkedBoxes / todos.length) * 100} />

            <Grid2 container spacing={2}>
                {
                    todos.map(todo => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={todo.id}>
                            <FormControlLabel label={todo.text} control={
                                <Checkbox checked={todo.completed} onClick={_ => toggleBox(todo)} />
                            } />
                        </Grid2>
                    ))
                }
            </Grid2>
            <SuccessMessage condition={allBoxesChecked} text="Nice job! You literally checked all the boxes! 📦" />
        </Challenge>
    );
}


function CounterChallenge() {
    const [goal, setGoal] = useState(999);
    const [clicks, setClicks] = useState(0);
    const done = clicks === goal;

    useEffect(() => {
        setGoal(900 + Math.ceil(Math.random() * 100));
    }, []);

    return (
        <Challenge title="Counter">
            <Typography>
                The following counter is a typical example of a frontend component. Use the buttons to increase
                the counter to <strong>{goal}</strong>. After reaching the goal, assert that a success message appears.
            </Typography>
            <Stack gap={2} direction="row" alignSelf="center" alignItems="center">
                <Button variant="contained" color="primary" onClick={e => setClicks(c => c - 1)}>-</Button>
                <Typography>Clicks: {clicks} / {goal}</Typography>
                <Button variant="contained" color="primary" onClick={e => setClicks(c => c + 1)}>+</Button>
            </Stack>
            <SuccessMessage condition={done} text="If you keep clicking, I might start charging per press." />
        </Challenge>
    );
}