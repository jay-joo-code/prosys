import { useEffect, useRef } from 'react'

const usePreviousValue = (variable: any) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = variable
  })

  return ref.current
}

export default usePreviousValue
