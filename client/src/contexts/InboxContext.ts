import React, { createContext, useMemo } from 'react'
import { IInboxState } from 'src/types/task.type'

export interface IInboxContext {
  focusId?: string
  setFocusId?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  inboxState: IInboxState
  setInboxState?: React.Dispatch<
    React.SetStateAction<IInboxState>
  >
}

export const InboxContext = createContext<IInboxContext>({
  focusId: undefined,
  setFocusId: undefined,
  inboxState: 'NAVIGATE',
  setInboxState: undefined,
})

export const useInboxContext = (
  contents: IInboxContext
) => {
  return useMemo(
    () => ({
      ...contents,
    }),
    [Object.keys(contents)]
  )
}
