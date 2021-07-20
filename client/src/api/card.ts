import { stringify } from 'query-string'
import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { ICard, IUseUpdateCardByIdOptions } from 'src/types/card.type'

export const fetchCards = (selectedTagIds?: string[]) => ({
  url: `/private/card?${stringify({ selectedTagIds })}`,
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useCards = (selectedTagIds: string[]) => {
  const { data: cards, ...rest } = useCustomQuery<ICard[]>(
    fetchCards(selectedTagIds)
  )

  return {
    ...rest,
    cards,
  }
}

export const fetchRepCards = () => ({
  url: `/private/card/reps`,
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useRepCards = () => {
  const { data: cards, ...rest } = useCustomQuery<ICard[]>(fetchRepCards())

  return {
    ...rest,
    cards,
  }
}

export const useCreateCard = () => {
  const { mutateAsync: createCard, ...rest } = useCustomMutation<ICard>({
    url: '/private/card',
    method: 'post',
    updateLocal: {
      queryConfigs: [fetchCards()],
      type: 'appendStart',
      isNotRefetchOnSettle: true,
    },
  })

  return {
    ...rest,
    createCard,
  }
}

export const useUpdateCardById = (
  cid: string,
  options?: IUseUpdateCardByIdOptions
) => {
  const { mutateAsync: updateCard, ...rest } = useCustomMutation<ICard>({
    url: `/private/card/${cid}`,
    method: 'put',
    updateLocal: options?.isNotUpdateLocal
      ? undefined
      : {
          queryConfigs: [fetchCards()],
          type: 'update',
          isNotRefetchOnSettle: options?.isNotRefetchOnSettle,
        },
  })

  return {
    ...rest,
    updateCard,
  }
}

export const useUpdateAndDequeCardById = (cid: string) => {
  const { mutateAsync: updateAndDequeCard, ...rest } = useCustomMutation<ICard>(
    {
      url: `/private/card/${cid}`,
      method: 'put',
      updateLocal: {
        queryConfigs: [fetchRepCards()],
        type: 'delete',
      },
    }
  )

  return {
    ...rest,
    updateAndDequeCard,
  }
}

export const useDeleteCardById = (cid: string) => {
  const { mutateAsync: deleteCard, ...rest } = useCustomMutation<ICard>({
    url: `/private/card/${cid}`,
    method: 'put',
    updateLocal: {
      queryConfigs: [fetchCards()],
      type: 'delete',
    },
  })

  return {
    ...rest,
    deleteCard,
  }
}
