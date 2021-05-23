import { useMutation, useQueryClient } from 'react-query'
import api from 'src/api'
import { IQueryConfig } from './useCustomQuery'

interface IUpdateLocal {
  queryConfigs: IQueryConfig[];
  type?: 'appendStart' | 'appendEnd' | 'update' | 'delete';
  mutationFn?: (oldData: any, newVariables: any) => any
  isNotRefetchOnSettle?: boolean
}

interface IMutationOptions {
  url: string;
  method: 'post' | 'put' | 'delete';
  updateLocal?: IUpdateLocal;
}

interface ISnapshot {
  queryKey: any;
  previousValues: any;
}

const useCustomMutation = <T>({
  url,
  method,
  updateLocal,
}: IMutationOptions) => {
  const queryClient = useQueryClient()
  const updateLocalConfig = updateLocal
    ? {
        // When mutate is called:
        onMutate: (newVariables: any) => {
          if (updateLocal) {
            const snapshots: ISnapshot[] = []

            updateLocal.queryConfigs.forEach((queryConfig) => {
              const { url: fetchUrl, variables: fetchVariables } = queryConfig
              const queryKey = [fetchUrl, fetchVariables]
              // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
              queryClient.cancelQueries(queryKey)

              // Snapshot the previous value
              const previousValues = queryClient.getQueryData(queryKey)

              // Optimistically update to the new value
              queryClient.setQueryData(queryKey, (oldData: any) => {
                // custom mutationFn
                if (updateLocal.mutationFn) {
                  return updateLocal.mutationFn(oldData, newVariables)
                }

                // appendStart
                if (updateLocal.type === 'appendStart') {
                  if (oldData) return [newVariables, ...oldData]
                  return [newVariables]
                }

                // appendEnd
                if (updateLocal.type === 'appendEnd') {
                  if (oldData) return [...oldData, newVariables]
                  return [newVariables]
                }

                // update
                if (updateLocal.type === 'update') {
                  // update by id
                  if (newVariables._id) {
                    const newValues = oldData?.map((value: any) => {
                      if (value._id === newVariables._id) {
                        return { ...value, ...newVariables }
                      }
                      return value
                    })
                    return newValues
                  } else {
                    // if newVariables._id not defined, dont update locally
                    if (oldData) return [...oldData]
                    return undefined
                  }
                }

                // delete
                if (updateLocal.type === 'delete') {
                  // delete by id
                  if (newVariables._id) {
                    const newValues = oldData?.filter(
                      (value: any) => value._id !== newVariables._id
                    )
                    return newValues
                  } else {
                    // if newVariables._id not defined, dont delete locally
                    if (oldData) return [...oldData]
                    return undefined
                  }
                }

                if (oldData) return [...oldData]
                return undefined
              })

              snapshots.push({ queryKey, previousValues })
            })

            // Return the snapshotted values
            return () => {
              snapshots.forEach(({ queryKey, previousValues }) => {
                queryClient.setQueryData(
                  queryKey,
                  previousValues
                )
              })
            }
          }
        },

        // If the mutation fails, use the value returned from onMutate to roll back
        onError: (err: any, newVariables: any, rollback: any) => {
          if (rollback) {
            const rollbackData = rollback()
            return rollbackData
          }
          if (err) return {}
          return {}
        },

        // Always refetch after error or success:
        onSettled: () => {
          if (updateLocal && !updateLocal.isNotRefetchOnSettle) {
            updateLocal.queryConfigs.forEach(({ url, variables }) => {
              const queryKey = [url, variables]
              queryClient.invalidateQueries(queryKey)
            })
          }
        },
      }
    : {}

  const { mutate, ...mutationInfo } = useMutation(
    (variables: any) =>
      new Promise((resolve, reject) => {
        (async () => {
          try {
            const data = (await api(method, url, variables)) as T
            resolve(data)
          } catch (error) {
            reject(error)
          }
        })()
      }),
    { ...updateLocalConfig }
  )
  return { mutate, ...mutationInfo }
}

export default useCustomMutation
