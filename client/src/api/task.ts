import { useQueryClient } from 'react-query'
import { useDispatch } from 'react-redux'
import useCustomMutation, { queryConfigToKey } from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import useRouter from 'src/hooks/useRouter'
import { showSnackbar } from 'src/redux/snackbarSlice'
import { ITask, IUseProsysTasksParams, IUseUpdateInboxTaskByIdOptions } from 'src/types/task.type'
import { getFullDate } from 'src/util/date'
import { sortTasks, isOneTaskTimeSet } from 'src/util/task'

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

export const fetchGcalTasks = (due: Date) => ({
  url: `/private/task/inbox/gcal?due=${due.toISOString()}`,
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useGcalTasks = (due: Date) => {
  const { data: gcalTasks, ...rest } = useCustomQuery<ITask[]>(fetchGcalTasks(due))

  return {
    ...rest,
    gcalTasks,
  }
}

export const prosysTasksConfig = (params: IUseProsysTasksParams) => ({
  url: `/private/task/inbox/prosys?due=${getFullDate(params?.due)}&isTimed=${params?.isTimed}`,
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useProsysTasks = (params: IUseProsysTasksParams) => {
  const { data: tasks, ...rest } = useCustomQuery<ITask[]>(prosysTasksConfig(params))

  return {
    ...rest,
    tasks,
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
    updateLocal: [
      {
        queryConfigs: [fetchInboxTasks()],
        type: 'appendStart',
      },
    ],
  })

  return {
    ...rest,
    createInboxTask,
  }
}

export const useCreateInboxTaskAtDate = (params: IUseProsysTasksParams) => {
  const { mutate: createInboxTask, ...rest } = useCustomMutation<ITask>({
    url: '/private/task',
    method: 'post',
    updateLocal: [
      {
        queryConfigs: [prosysTasksConfig(params)],
        type: 'appendEnd',
      },
    ],
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
    updateLocal: [
      {
        queryConfigs: [fetchArchivedTasks()],
        type: 'appendStart',
      },
    ],
  })

  return {
    ...rest,
    createArchiveTask,
  }
}

export const useUpdateInboxTaskById = (_id: string, params: IUseProsysTasksParams) => {
  const { mutate: updateInboxTask, ...rest } = useCustomMutation<ITask>({
    url: `/private/task/${_id}`,
    method: 'put',
    updateLocal: [
      {
        queryConfigs: [prosysTasksConfig(params)],
        type: 'update',
        isNotRefetchOnSettle: true,
      },
    ],
  })

  return {
    ...rest,
    updateInboxTask,
  }
}

export const useUpdateTaskTime = (_id: string, params: IUseProsysTasksParams) => {
  const queryClient = useQueryClient()

  const { mutate: updateTaskTime, ...rest } = useCustomMutation<ITask>({
    url: `/private/task/${_id}`,
    method: 'put',
    updateLocal: [
      {
        queryConfigs: [prosysTasksConfig(params)],
        type: 'update',
        isNotRefetchOnSettle: true,
      },
      {
        queryConfigs: [prosysTasksConfig(params)],
        isNotRefetchOnSettle: true,
        mutationFn: (oldData, newVariables) => {
          if (!oldData) return

          const targetQueryKey = queryConfigToKey(
            prosysTasksConfig({
              ...params,
              isTimed: !params?.isTimed,
            })
          )

          if (params?.isTimed) {
            if (!isOneTaskTimeSet(newVariables)) {
              // moved from timed to untimed

              // add to untimed at the correct index
              queryClient.setQueryData(targetQueryKey, (oldData: any) => {
                // prevent duplicates
                const duplicateIdx = oldData?.findIndex(
                  (task: ITask) => task?._id === newVariables?._id
                )

                if (duplicateIdx >= 0) return oldData

                // find idx of elemnt that's created at before newVariables
                const targetIdx = oldData?.findIndex(
                  (task: ITask) => new Date(task?.createdAt) > new Date(newVariables?.createdAt)
                )

                const newData = [...oldData]

                if (targetIdx === -1) {
                  newData.push(newVariables)
                } else {
                  newData.splice(targetIdx, 0, newVariables)
                }
                return newData
              })

              // remove from current query cache (timed)
              return oldData?.filter((task: ITask) => task?._id !== newVariables?._id)
            } else {
              // move within timed to correct sort order

              // find idx of elemnt that has a later startTime than newVariables
              const targetIdx = oldData?.findIndex(
                (task: ITask) =>
                  Number(task?.startTime) > Number(newVariables?.startTime) ||
                  (Number(task?.startTime) === Number(newVariables?.startTime) &&
                    Number(task?.endTime) > Number(newVariables?.endTime))
              )

              const newData = oldData?.filter((task: ITask) => task?._id !== newVariables?._id)

              if (targetIdx === -1) {
                newData.push(newVariables)
              } else {
                newData.splice(targetIdx - 1, 0, newVariables)
              }
              return newData
            }
          } else {
            if (isOneTaskTimeSet(newVariables)) {
              // move from untimed to timed

              // add to timed at the correct index
              queryClient.setQueryData(targetQueryKey, (oldData: any) => {
                // prevent duplicates
                const duplicateIdx = oldData?.findIndex(
                  (task: ITask) => task?._id === newVariables?._id
                )

                if (duplicateIdx >= 0) return oldData

                // find idx of elemnt that has a later startTime than newVariables
                const targetIdx = oldData?.findIndex(
                  (task: ITask) =>
                    Number(task?.startTime) > Number(newVariables?.startTime) ||
                    (Number(task?.startTime) === Number(newVariables?.startTime) &&
                      Number(task?.endTime) > Number(newVariables?.endTime))
                )

                const newData = [...oldData]

                if (targetIdx === -1) {
                  newData.push(newVariables)
                } else {
                  newData.splice(targetIdx, 0, newVariables)
                }
                return newData
              })

              // remove from current query cache (untimed)
              return oldData?.filter((task: ITask) => task?._id !== newVariables?._id)
            }
          }
          return oldData
        },
      },
    ],
  })

  return {
    ...rest,
    updateTaskTime,
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
    updateLocal: [
      {
        queryConfigs: [fetchArchivedTasks()],
        type: 'update',
        isNotRefetchOnSettle: !options?.refetchOnSettle,
      },
    ],
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
    updateLocal: [
      {
        queryConfigs: [fetchInboxTasks(), fetchArchivedTasks()],
        type: 'delete',
      },
    ],
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
    updateLocal: [
      {
        queryConfigs: [fetchInboxTasks(), fetchArchivedTasks()],
      },
    ],
  })

  return {
    ...rest,
    undoIsComplete,
  }
}
