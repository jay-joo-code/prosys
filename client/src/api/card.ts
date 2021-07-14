import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { ICard } from 'src/types/card.type'

export const fetchCards = () => ({
  url: '/private/card',
  options: {
    refetchOnWindowFocus: 'always',
  },
})

export const useCards = () => {
  const { data: cards, ...rest } = useCustomQuery<ICard[]>(fetchCards())

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
