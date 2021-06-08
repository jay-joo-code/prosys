import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { ITask } from 'src/types/task.type'
import { sortTasks } from 'src/util/task'

export const fetchInboxTasks = () => ({
  url: '/private/task/inbox',
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useInboxTasks = () => {
  const { data: tasks, ...rest } = useCustomQuery<ITask[]>(fetchInboxTasks())

  return {
    ...rest,
    tasks: tasks && sortTasks(tasks),
  }
}

export const useCreateTask = () => {
  const { mutate: createTask, ...rest } = useCustomMutation<ITask>({
    url: '/private/task',
    method: 'post',
    updateLocal: {
      queryConfigs: [fetchInboxTasks()],
      type: 'appendStart',
    },
  })

  return {
    ...rest,
    createTask,
  }
}

export const useUpdateInboxTaskById = (_id: string) => {
  const { mutate: updateInboxTask, ...rest } = useCustomMutation<ITask>({
    url: `/private/task/${_id}`,
    method: 'put',
    updateLocal: {
      queryConfigs: [fetchInboxTasks()],
      type: 'update',
    },
  })

  return {
    ...rest,
    updateInboxTask,
  }
}
