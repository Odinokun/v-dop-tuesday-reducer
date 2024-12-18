import { useReducer, useState } from 'react';
import { TaskType, Todolist } from './Todolist';
import { AddItemForm } from './components/AddItemForm';
import { ButtonAppBar } from './components/ButtonAppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './App.css';
import {
  addTaskAC,
  addTasksAC,
  onChangeTaskStatusAC,
  onEditTaskNameAC,
  removeTaskAC,
  tasksReducer,
} from './reducers/tasksReducer';

export type FilterType = 'all' | 'active' | 'completed';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type AllTasksType = {
  [key: string]: TaskType[];
};

function App() {
  const todolist_1 = crypto.randomUUID();
  const todolist_2 = crypto.randomUUID();
  const todolist_3 = crypto.randomUUID();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolist_1, title: 'Learning', filter: 'all' },
    { id: todolist_2, title: 'Reading', filter: 'active' },
    { id: todolist_3, title: 'Watching', filter: 'completed' },
  ]);

  const [allTasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolist_1]: [
      { id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true },
      { id: crypto.randomUUID(), title: 'JS', isDone: true },
      { id: crypto.randomUUID(), title: 'React', isDone: false },
      { id: crypto.randomUUID(), title: 'GraphQL', isDone: false },
      { id: crypto.randomUUID(), title: 'Rest API', isDone: false },
      { id: crypto.randomUUID(), title: 'Graph API', isDone: false },
    ],
    [todolist_2]: [
      { id: crypto.randomUUID(), title: 'Harry Potter', isDone: false },
      { id: crypto.randomUUID(), title: 'Sherlock Holmes', isDone: false },
      { id: crypto.randomUUID(), title: 'The Lord of the Rings', isDone: true },
    ],
    [todolist_3]: [
      { id: crypto.randomUUID(), title: 'The Godfather', isDone: true },
      { id: crypto.randomUUID(), title: 'Mr. Robot', isDone: true },
      { id: crypto.randomUUID(), title: 'The Dark Knight', isDone: true },
    ],
  });

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    delete allTasks[todolistId];
  };

  const addTask = (todolistId: string, title: string) => dispatchTasks(addTaskAC(todolistId, title));

  const removeTask = (todolistId: string, id: string) => dispatchTasks(removeTaskAC(todolistId, id));

  const onEditTaskName = (todolistId: string, id: string, title: string) =>
    dispatchTasks(onEditTaskNameAC(todolistId, id, title));

  const onChangeStatus = (todolistId: string, id: string, taskStatus: boolean) =>
    dispatchTasks(onChangeTaskStatusAC(todolistId, id, taskStatus));

  const changeFilter = (todolistId: string, value: FilterType) => {
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter: value } : tl)));
  };

  const addTodolist = (title: string) => {
    // const newId = crypto.randomUUID();
    // const newTodo: TodolistType = {
    //   id: newId,
    //   title,
    //   filter: 'all',
    // };
    // setTodolists([newTodo, ...todolists]);
    // setAllTasks({ [newId]: [], ...allTasks });
  };

  const onEditTodolistTitle = (todolistId: string, title: string) => {
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, title } : tl)));
  };

  return (
    <Box>
      <ButtonAppBar />

      <Container maxWidth='lg'>
        <Box mt={2} mb={3}>
          <Typography variant='h5' component='h2'>
            Add new todolist
          </Typography>
          {/* <AddItemForm onClick={addTodolist} /> */}
        </Box>
      </Container>

      <Container maxWidth='lg'>
        <Box display='flex' flexWrap='wrap' gap={2}>
          {todolists.map(tl => {
            return (
              <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                tasks={allTasks[tl.id]}
                addTask={addTask}
                removeTask={removeTask}
                onEditTaskName={onEditTaskName}
                filter={tl.filter}
                changeFilter={changeFilter}
                onChangeStatus={onChangeStatus}
                removeTodolist={removeTodolist}
                onEditTodolistTitle={onEditTodolistTitle}
              />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

export default App;
