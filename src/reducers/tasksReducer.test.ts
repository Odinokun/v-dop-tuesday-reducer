import { expect, test } from 'vitest';
import { addTaskAC, removeTaskAC, tasksReducer } from './tasksReducer';
const todolist_1 = crypto.randomUUID();
const todolist_2 = crypto.randomUUID();
const todolist_3 = crypto.randomUUID();

const initialState = {
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
};

test('target task must be delete', () => {
  const taskId = initialState[todolist_1][1].id;

  const action = removeTaskAC(todolist_1, taskId);
  const endState = tasksReducer(initialState, action);

  expect(endState[todolist_1][0].title).toEqual('HTML&CSS');
  expect(endState[todolist_1][1].title).toEqual('React');
});

test('task must be create', () => {
  const newTitle = 'New title!';
  const action = addTaskAC(todolist_3, newTitle);
  const endState = tasksReducer(initialState, action);

  expect(endState[todolist_3].length).toBe(4);
  expect(endState[todolist_3][0].title).toBe(newTitle);
});
