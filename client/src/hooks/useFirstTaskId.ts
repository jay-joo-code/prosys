import { useInboxTasks } from 'src/api/task'

const useFirstTaskId = () => {
  const { tasks } = useInboxTasks()

  if (tasks && tasks.length > 0) {
    return tasks[0]?._id
  }

  return undefined
}

export default useFirstTaskId
