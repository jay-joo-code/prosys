import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { ITag } from 'src/types/tag.type'

export const fetchTags = () => ({
  url: '/private/tag',
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useTags = () => {
  const { data: tags, ...rest } = useCustomQuery<ITag[]>(fetchTags())

  return {
    ...rest,
    tags,
  }
}

export const useCreateTag = () => {
  const { mutateAsync: createTag, ...rest } = useCustomMutation<ITag>({
    url: '/private/tag',
    method: 'post',
    updateLocal: {
      queryConfigs: [fetchTags()],
      type: 'appendEnd',
    },
  })

  return {
    ...rest,
    createTag,
  }
}

// TODO:
export const useDeleteTagById = () => {
  const { mutateAsync: deleteTagById, ...rest } = useCustomMutation<ITag>({
    url: '/private/tag',
    method: 'delete',
    updateLocal: {
      queryConfigs: [fetchTags()],
      type: 'delete',
    },
  })

  return {
    ...rest,
    deleteTagById,
  }
}
