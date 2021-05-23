import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { IScheduleTasks, ITask } from 'src/types/task.type'

export const fetchInboxTasks = () => ({
  url: '/private/task/inbox',
})

export const fetchScheduleTasks = () => ({
  url: '/private/task/schedule',
})

export const useInboxTasks = () => {
  const { data: tasks, ...rest } = useCustomQuery<ITask[]>(fetchInboxTasks())

  tasks?.sort((a, b) => {
    const aDate = new Date(a.due)
      .setHours(Number(a.startTime?.slice(0, 2)), Number(a.startTime?.slice(2, 4)), 0, 0)

    const bDate = new Date(b.due)
      .setHours(Number(b.startTime?.slice(0, 2)), Number(b.startTime?.slice(2, 4)), 0, 0)

    return aDate - bDate || new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
  })

  return {
    ...rest,
    tasks,
  }
}

export const useScheduleTasks = () => {
  const { data: scheduleTasks, ...rest } = useCustomQuery<IScheduleTasks>(fetchScheduleTasks())

  return {
    ...rest,
    scheduleTasks,
  }
}

// export const useListingById = (lid: string) => {
//   const { data: listing, ...rest } = useCustomQuery<ListingDoc>(fetchListingByIdConfig(lid))
//   return {
//     ...rest,
//     listing,
//   }
// }

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

export const useUpdateScheduleTaskById = (_id: string) => {
  const { mutate: updateScheduleTask, ...rest } = useCustomMutation<ITask>({
    url: `/private/task/${_id}`,
    method: 'put',
    updateLocal: {
      queryConfigs: [fetchScheduleTasks()],
      type: 'update',
    },
  })

  return {
    ...rest,
    updateScheduleTask,
  }
}

// export const useDeleteListingById = (_id: string) => {
//   const { mutate: deleteListing, ...rest } = useCustomMutation<ListingDoc>({
//     url: `/private/task/${_id}`,
//     method: 'delete',
//     updateLocal: {
//       queryConfigs: [fetchMyListingsConfig()],
//       type: 'delete',
//     },
//   })
//   return {
//     ...rest,
//     deleteListing,
//   }
// }
