import { Dispatch, SetStateAction, useState } from 'react';
import ITask from './ITask';

export default interface taskProps {
  setShowTask: Dispatch<SetStateAction<boolean>>;
  setCurrentTask: Dispatch<SetStateAction<ITask>>;
  task: ITask;
}
