import { stringify } from 'query-string'
import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { ICard } from 'src/types/card.type'

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

export const fetchRepCards = (selectedTagIds?: string[]) => ({
  url: `/private/card/reps?${stringify({ selectedTagIds })}`,
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useCreateCard = () => {
  const { mutateAsync: createCard, ...rest } = useCustomMutation<ICard>({
    url: '/private/card',
    method: 'post',
    updateLocal: {
      queryConfigs: [fetchCards()],
      type: 'appendStart',
    },
  })

  return {
    ...rest,
    createCard,
  }
}

export const useUpdateCardById = (cid: string) => {
  const { mutateAsync: updateCard, ...rest } = useCustomMutation<ICard>({
    url: `/private/card/${cid}`,
    method: 'put',
    updateLocal: {
      queryConfigs: [fetchCards()],
      type: 'update',
    },
  })

  return {
    ...rest,
    updateCard,
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
