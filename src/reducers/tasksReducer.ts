import { AllTasksType } from '../App';
import { TaskType } from '../Todolist';

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
type AddTaskACType = ReturnType<typeof addTaskAC>;
type OnEditTaskNameACType = ReturnType<typeof onEditTaskNameAC>;
type OnChangeTaskStatusACType = ReturnType<typeof onChangeTaskStatusAC>;

type ActionsType = RemoveTaskACType | AddTaskACType | OnEditTaskNameACType | OnChangeTaskStatusACType;

export const tasksReducer = (state: AllTasksType, action: ActionsType): AllTasksType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payload.todoId]: state[action.payload.todoId].filter(t => t.id !== action.payload.id),
      };
    case 'ADD-TASK': {
      const newTask: TaskType = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        isDone: false,
      };
      return { ...state, [action.payload.todoId]: [newTask, ...state[action.payload.todoId]] };
    }
    case 'ON-EDIT-TASK-NAME':
      return {
        ...state,
        [action.payload.todoId]: state[action.payload.todoId].map(t =>
          t.id === action.payload.id ? { ...t, title: action.payload.title } : t
        ),
      };
    case 'ON-CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.payload.todoId]: state[action.payload.todoId].map(t =>
          t.id === action.payload.id ? { ...t, isDone: action.payload.taskStatus } : t
        ),
      };
    default:
      console.log('I don`t understand this type');
      return state;
  }
};

export const removeTaskAC = (todoId: string, id: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      todoId,
      id,
    },
  } as const;
};
export const addTaskAC = (todoId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      todoId,
      title,
    },
  } as const;
};
export const onEditTaskNameAC = (todoId: string, id: string, title: string) => {
  return {
    type: 'ON-EDIT-TASK-NAME',
    payload: {
      todoId,
      id,
      title,
    },
  } as const;
};
export const onChangeTaskStatusAC = (todoId: string, id: string, taskStatus: boolean) => {
  return {
    type: 'ON-CHANGE-TASK-STATUS',
    payload: {
      todoId,
      id,
      taskStatus,
    },
  } as const;
};
