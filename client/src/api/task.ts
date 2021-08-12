import { useDispatch } from 'react-redux'
import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import useRouter from 'src/hooks/useRouter'
import { showSnackbar } from 'src/redux/snackbarSlice'
import { ITask, IUseUpdateInboxTaskByIdOptions } from 'src/types/task.type'
import { getFullDate } from 'src/util/date'
import { sortTasks } from 'src/util/task'

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

export const fetchGcalTasks = (due: Date) => ({
  url: `/private/task/inbox/gcal?due=${due.toISOString()}`,
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useGcalTasks = (due: Date) => {
  const { data: gcalTasks, ...rest } = useCustomQuery<ITask[]>(
    fetchGcalTasks(due)
  )

  return {
    ...rest,
    gcalTasks,
  }
}

export const untimedTasksConfig = (due: Date) => ({
  url: `/private/task/inbox/untimed?due=${getFullDate(due)}`,
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useUntimedTasks = (due: Date) => {
  const { data: untimedTasks, ...rest } = useCustomQuery<ITask[]>(
    untimedTasksConfig(due)
  )

  return {
    ...rest,
    untimedTasks,
  }
}

export const fetchArchivedTasks = () => ({
  url: '/private/task/archive',
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useArchivedTasks = () => {
  const { data: tasks, ...rest } = useCustomQuery<ITask[]>(fetchArchivedTasks())

  return {
    ...rest,
    tasks,
  }
}

export const useCreateInboxTask = () => {
  const { mutate: createInboxTask, ...rest } = useCustomMutation<ITask>({
    url: '/private/task',
    method: 'post',
    updateLocal: {
      queryConfigs: [fetchInboxTasks()],
      type: 'appendStart',
    },
  })

  return {
    ...rest,
    createInboxTask,
  }
}

export const useCreateArchiveTask = () => {
  const { mutate: createArchiveTask, ...rest } = useCustomMutation<ITask>({
    url: '/private/task',
    method: 'post',
    updateLocal: {
      queryConfigs: [fetchArchivedTasks()],
      type: 'appendStart',
    },
  })

  return {
    ...rest,
    createArchiveTask,
  }
}

export const useUpdateInboxTaskById = (
  _id: string,
  options: IUseUpdateInboxTaskByIdOptions = {
    due: new Date(),
  }
) => {
  const { mutate: updateInboxTask, ...rest } = useCustomMutation<ITask>({
    url: `/private/task/${_id}`,
    method: 'put',
    updateLocal: {
      queryConfigs: [untimedTasksConfig(options?.due || new Date())],
      type: 'update',
      isNotRefetchOnSettle: true,
    },
  })

  return {
    ...rest,
    updateInboxTask,
  }
}

export const useUpdateArchiveTaskById = (
  _id: string,
  options: IUseUpdateInboxTaskByIdOptions = {
    due: new Date(),
    refetchOnSettle: false,
  }
) => {
  const { mutate: updateArchiveTask, ...rest } = useCustomMutation<ITask>({
    url: `/private/task/${_id}`,
    method: 'put',
    updateLocal: {
      queryConfigs: [fetchArchivedTasks()],
      type: 'update',
      isNotRefetchOnSettle: !options?.refetchOnSettle,
    },
  })

  return {
    ...rest,
    updateArchiveTask,
  }
}

export const useToggleArchive = (_id: string) => {
  const { mutate: toggleArchive, ...rest } = useCustomMutation<ITask>({
    url: `/private/task/${_id}`,
    method: 'put',
    updateLocal: {
      queryConfigs: [fetchInboxTasks(), fetchArchivedTasks()],
      type: 'delete',
    },
  })

  return {
    ...rest,
    toggleArchive,
  }
}

export const useUndoIsComplete = () => {
  const { mutateAsync: undoIsComplete, ...rest } = useCustomMutation<ITask>({
    url: `/private/task/undo`,
    method: 'put',
    updateLocal: {
      queryConfigs: [fetchInboxTasks(), fetchArchivedTasks()],
    },
  })

  return {
    ...rest,
    undoIsComplete,
  }
}
