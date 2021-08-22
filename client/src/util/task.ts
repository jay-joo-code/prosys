import { ITask } from 'src/types/task.type'

export const isTaskTimeSet = (task: ITask): boolean => {
  return (
    task.startTime != null &&
    task.startTime !== '0000' &&
    task.endTime != null &&
    task.endTime !== '0000'
  )
}

export const isOneTaskTimeSet = (task: ITask): boolean => {
  return (
    (task.startTime != null && task.startTime !== '0000') ||
    (task.endTime != null && task.endTime !== '0000')
  )
}

export const incrementTimeStamp = (timeStamp: string) => {
  if (Number(timeStamp)) {
    return `0${(Number(timeStamp) + 100).toString()}`.slice(-4)
  }
  return '0000'
}

export const sortTasks = (tasks: ITask[]) => {
  tasks?.sort((a, b) => {
    const aStartDate = a.due
      ? new Date(a.due).setHours(
          Number(a.startTime?.slice(0, 2)),
          Number(a.startTime?.slice(2, 4)),
          0,
          0
        )
      : 0

    const bStartDate = b.due
      ? new Date(b.due).setHours(
          Number(b.startTime?.slice(0, 2)),
          Number(b.startTime?.slice(2, 4)),
          0,
          0
        )
      : 0

    const aEndDate = a.due
      ? new Date(a.due).setHours(
          Number(a.endTime?.slice(0, 2)),
          Number(a.endTime?.slice(2, 4)),
          0,
          0
        )
      : 0

    const bEndDate = b.due
      ? new Date(b.due).setHours(
          Number(b.endTime?.slice(0, 2)),
          Number(b.endTime?.slice(2, 4)),
          0,
          0
        )
      : 0

    const untimedSortValue =
      a?.provider === 'google'
        ? -1
        : new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()

    return aStartDate - bStartDate || aEndDate - bEndDate || untimedSortValue
  })
  return tasks
}
