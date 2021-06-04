import { ITask } from 'src/types/task.type'

export const isTaskTimeSet = (task: ITask): boolean => {
  return task.startTime != null && task.startTime !== '0000' && task.endTime != null && task.endTime !== '0000'
}

export const incrementTimeStamp = (timeStamp: string) => {
  if (Number(timeStamp)) {
    return `0${(Number(timeStamp) + 100).toString()}`.slice(-4)
  }
  return '0000'
}
