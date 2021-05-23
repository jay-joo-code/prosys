import { ITask } from 'src/types/task.type'

export const isTaskTimeSet = (task: ITask): boolean => {
  return task.startTime != null && task.startTime !== '0000' && task.endTime != null && task.endTime !== '0000'
}
