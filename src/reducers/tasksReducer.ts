import { AllTasksType } from '../App';

type ActionType = {
  type: string;
};

export const tasksReducer = (state: AllTasksType, action: ActionType) => {
  switch (action.type) {
    case 'SOME-TYPE':
      return state;
    default:
      throw new Error('I don`t understand this type');
  }
};
