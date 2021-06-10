import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { ITask } from 'src/types/task.type'
import { sortTasks } from 'src/util/task'
import useRouter from 'src/hooks/useRouter'

export const fetchInboxTasks = () => ({
  url: '/private/task/inbox',
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useInboxTasks = () => {
  const {
    data: tasks,
    error,
    ...rest
  } = useCustomQuery<ITask[]>(fetchInboxTasks())

  const router = useRouter()
  if ((error as any)?.response?.data === 'Google OAuth error') {
    // TODO: display toast
    router.push('/logout')
  }

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
