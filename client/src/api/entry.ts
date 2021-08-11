import { stringify } from 'query-string'
import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { IEntry } from 'src/types/entry.type'

export const fetchEntries = (page?: number) => ({
  url: `/private/entry?${stringify({ page })}`,
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useEntries = (page?: number) => {
  const { data: entries, ...rest } = useCustomQuery<IEntry[]>(
    fetchEntries(page)
  )

  return {
    ...rest,
    entries,
  }
}

export const useUpdateTodaysEntry = () => {
  const { mutateAsync: updateEntry, ...rest } = useCustomMutation<IEntry>({
    url: `/private/entry/today`,
    method: 'put',
    updateLocal: {
      queryConfigs: [],
      isNotRefetchOnSettle: true,
    },
  })

  return {
    ...rest,
    updateEntry,
  }
}
