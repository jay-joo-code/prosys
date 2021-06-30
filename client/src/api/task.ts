import { useDispatch } from 'react-redux'
import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import useRouter from 'src/hooks/useRouter'
import { showSnackbar } from 'src/redux/snackbar'
import { ITask, IUseUpdateInboxTaskByIdOptions } from 'src/types/task.type'
import { sortTasks } from 'src/util/task'

export const fetchInboxTasks = () => ({
  url: '/private/task/inbox',
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useInboxTasks = () => {
  const { data: tasks, error, ...rest } = useCustomQuery<ITask[]>(fetchInboxTasks())

  const router = useRouter()
  const dispatch = useDispatch()

  if ((error as any)?.response?.data === 'Google OAuth error') {
    dispatch(
      showSnackbar({
        variant: 'error',
        message: 'Google calendar session expired',
      })
    )
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

export const useUpdateInboxTaskById = (
  _id: string,
  options: IUseUpdateInboxTaskByIdOptions = {
    refetchOnSettle: false,
  }
) => {
  const { mutate: updateInboxTask, ...rest } = useCustomMutation<ITask>({
    url: `/private/task/${_id}`,
    method: 'put',
    updateLocal: {
      queryConfigs: [fetchInboxTasks()],
      type: 'update',
      isNotRefetchOnSettle: !options?.refetchOnSettle,
    },
  })

  return {
    ...rest,
    updateInboxTask,
  }
}

export const useUndoIsComplete = () => {
  const { mutateAsync: undoIsComplete, ...rest } = useCustomMutation<ITask>({
    url: `/private/task/undo`,
    method: 'put',
    updateLocal: {
      queryConfigs: [fetchInboxTasks()],
    },
  })

  return {
    ...rest,
    undoIsComplete,
  }
}
